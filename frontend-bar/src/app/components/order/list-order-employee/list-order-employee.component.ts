import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StatusService } from '../../../services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AddOrEditOrderEmployeeComponent } from '../add-or-edit-order-employee/add-or-edit-order-employee.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Status } from '../../../interfaces/status';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-list-order-employee',
  templateUrl: './list-order-employee.component.html',
  styleUrl: './list-order-employee.component.css'
})

export class ListOrderEmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['type_document','num_document','table','status','action'];
  dataSource = new MatTableDataSource<Order>;
  dataSourceStatus = new MatTableDataSource<Status>;
  orderDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _orderService: OrderService,
    private _statusService: StatusService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._orderService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get('deleteOrder','removed').subscribe((res: any) => {
      this.orderDelete = res.deleteOrder;
      this.removed = res.removed;
    });
  }

  ngOnInit(): void {
    this.getOrder();
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

  getOrder() {
    this._orderService.getOrder().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          result.forEach((order: Order) => {
            order.colorStatus = this.getColorBasedOnStatus(order.status!);
          });
          this.dataSource.data = result;
        }
      }
    });
  }

  addOrder(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditOrderEmployeeComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOrder();
      }
    });
  }

  deleteOrder(id: number) {
    this._orderService.deleteOrder(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getOrder();
      this.toastr.success(this.orderDelete, this.removed);
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
    this._orderService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._orderService.updateServerLanguage('en').subscribe(() => { });
  }
}
