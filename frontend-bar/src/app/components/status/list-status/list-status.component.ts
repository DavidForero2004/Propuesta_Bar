import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../../interfaces/status';
import { StatusService } from '../../../services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { AddOrEditStatusComponent } from '../add-or-edit-status/add-or-edit-status.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrl: './list-status.component.css'
})
export class ListStatusComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<Status>;
  statusDeleteM: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // listUser: User[] = [];

  constructor(
    private _statusService: StatusService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('deleteStatus').subscribe((res: string) => {
      this.statusDeleteM = res;
    });

    this.translate.get('removed').subscribe((res: string) => {
      this.removed = res;
    });
  }

  ngOnInit(): void {
    this.getStatus();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eventFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatus() {
    this._statusService.getStatus().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        // Check if the first element of result is an array of users
        if (Array.isArray(result)) {
          result.forEach((status: Status) => {
            status.colorStatus = this.getColorBasedOnStatus(status.name!);
          });
          this.dataSource.data = result;
        }
      }
    });
  }

  addStatus(id?: number) {
    // console.log(id);
    const dialogRef = this.dialog.open(AddOrEditStatusComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.getStatus();
      }
    });
  }

  deleteStatus(id: number) {
    this._statusService.deleteStatus(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getStatus();
      this.toastr.success(this.statusDeleteM, this.removed);
    });;
  }

  getColorBasedOnStatus(status: string): string {
    switch (status) {
      case 'Active':
        return 'green';     // Verde para activo
      case 'Inactive':
        return 'red';       // Rojo para inactivo
      case 'Paid':
        return 'brown';     // cafe para pagado
      case 'Canceled':
        return 'orange';    // Otro color para cancelado
      default:
        return 'black';     // Negro para otros casos
    }
  }
  es() {
    this.translate.use('es');
    this._statusService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._statusService.updateServerLanguage('en').subscribe(() => { });
  }
}
