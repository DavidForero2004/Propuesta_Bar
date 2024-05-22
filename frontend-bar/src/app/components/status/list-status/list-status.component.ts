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
export class ListStatusComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<Status>;
  statusDeleteM: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _statusService: StatusService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._statusService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['deleteStatus', 'removed']).subscribe((res: any) => {
      this.statusDeleteM = res.deleteStatus;
      this.removed = res.removed;
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

  refresh() {
    this.getStatus();
  }

  getStatus() {
    this._statusService.getStatus().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
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
    const dialogRef = this.dialog.open(AddOrEditStatusComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
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
        return 'green';
      case 'Inactive':
        return 'red';
      case 'Paid':
        return 'brown';
      case 'Canceled':
        return 'orange';
      default:
        return 'black';
    }
  }

  translateStateName(stateName: string | undefined): string {
    if (typeof stateName === 'string') {
      const translatedName = this.translate.instant(`statuses.${stateName}`);
      return translatedName !== `statuses.${stateName}` ? translatedName : '';
    } else {
      return '';
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
