import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../interfaces/status';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StatusService } from '../../../services/status.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeDocument } from '../../../interfaces/type-document';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order';
import { Table } from '../../../interfaces/table';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'app-add-or-edit-order-employee',
  templateUrl: './add-or-edit-order-employee.component.html',
  styleUrl: './add-or-edit-order-employee.component.css'
})
export class AddOrEditOrderEmployeeComponent implements OnInit {
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  orderSave: string = '';
  aggregate: string = '';
  orderUpdate: string = '';
  edited: string = '';

  operation: string = '';
  id: number | undefined;
  type_doc: any = null;
  num_doc: any = null;
  id_tab: any = null;

  status: Status[] = [];
  table: Table[] = [];
  typeDocument: TypeDocument[] = [
    { id: 'CC', name: 'Cédula de ciudadanía' },
    { id: 'CE', name: 'Cédula de extranjería' },
    { id: 'NI', name: 'NIT' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddOrEditOrderEmployeeComponent>,
    private fb: FormBuilder,
    private _orderServices: OrderService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _statusService: StatusService,
    private _tableServices: TableService
  ) {
    this.id = data.id;

    if (this.id === undefined) {
      this.form = this.fb.group({
        type_document: ['', Validators.required],
        num_document: ['', Validators.required],
        id_table: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        id_status: ['', Validators.required],
      });
    }

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('add').subscribe((res: string) => {
      this.operation = res;
    });

    this.translate.get('saveOrder').subscribe((res: string) => {
      this.orderSave = res;
    });

    this.translate.get('aggregate').subscribe((res: string) => {
      this.aggregate = res;
    });

    this.translate.get('editOrder').subscribe((res: string) => {
      this.orderUpdate = res;
    });

    this.translate.get('edited').subscribe((res: string) => {
      this.edited = res;
    });
  };

  ngOnInit(): void {
    this.getStatus();
    this.getTable();
    this.isEdit(this.id);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.translate.get(['edit', 'statusOrder']).subscribe((res: any) => {
        this.operation = `${res.edit} ${res.statusOrder}`;
      });
      this.getOrderId(id);
    }
  }

  getOrderId(id: number) {
    this._orderServices.getOrderId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const Object = firstArray[0];
            this.form.patchValue({
              id_status: Object.id_status
            });

            this.type_doc = Object.type_document,
            this.num_doc = Object.num_document,

            this.translate.get('gridTable').subscribe((res: string) => {
              this.id_tab = `${res} ${Object.id_table}`;
            });
          }
        }
      }
    });
  }

  addOrder() {
    this.loading = true;

    if (this.id === undefined) {
      if (this.form.invalid) {
        return;
      }

      const order: Order = {
        type_document: this.form.value.type_document,
        num_document: this.form.value.num_document,
        id_table: this.form.value.id_table,
        id_status: 1
      }

      setTimeout(() => {
        this._orderServices.addOrder(order).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.orderSave, this.aggregate);
        });
      }, 200);
    } else {
      const order: Order = {
        id: this.id,
        id_status: this.form.value.id_status
      }

      setTimeout(() => {
        this._orderServices.updateOrder(order).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.orderUpdate, this.edited);
        });
      }, 200);
    }
  }

  getStatus() {
    this._statusService.getStatus().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.status = result;
        }
      }
    });
  }

  getTable() {
    this._tableServices.getTable().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.table = result;
        }
      }
    });
  }

  es() {
    this.translate.use('es');
    this._orderServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._orderServices.updateServerLanguage('en').subscribe(() => { });
  }
}
