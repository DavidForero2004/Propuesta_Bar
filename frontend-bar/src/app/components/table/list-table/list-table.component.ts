import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from '../../../interfaces/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableService } from '../../../services/table.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from '../../../services/status.service';
import { Status } from '../../../interfaces/status';
import { AddOrEditTableComponent } from '../add-or-edit-table/add-or-edit-table.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})

export class ListTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name_table', 'name_status', 'action'];
  dataSource = new MatTableDataSource<Table>;
  dataSourceStatus = new MatTableDataSource<Status>;
  tableDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _tableService: TableService,
    private _statusService: StatusService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._tableService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['deleteTable','removed']).subscribe((res: any) => {
      this.tableDelete = res.deleteTable;
      this.removed = res.removed;
    });
  }

  ngOnInit(): void {
    this.getTable();
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

  getTable() {
    this._tableService.getTable().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          result.forEach((table: Table) => {
            table.colorStatus = this.getColorBasedOnStatus(table.name!);
          });
          this.dataSource.data = result;
        }
      }
    });
  }

  addTable(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditTableComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTable();
      }
    });
  }

  deleteUser(id: number) {
    this._tableService.deleteTable(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getTable();
      this.toastr.success(this.tableDelete, this.removed);
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
    this._tableService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._tableService.updateServerLanguage('en').subscribe(() => { });
  }
}
