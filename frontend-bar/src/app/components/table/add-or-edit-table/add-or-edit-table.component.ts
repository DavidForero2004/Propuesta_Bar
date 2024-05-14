import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../interfaces/status';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableService } from '../../../services/table.service';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Table } from '../../../interfaces/table';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { StatusService } from '../../../services/status.service';

@Component({
  selector: 'app-add-or-edit-table',
  templateUrl: './add-or-edit-table.component.html',
  styleUrl: './add-or-edit-table.component.css'
})
export class AddOrEditTableComponent implements OnInit {
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  tableSave: string = '';
  aggregate: string = '';
  tableUpdate: string = '';
  edited: string = '';

  operation: string = '';
  id: number | undefined;

  status: Status[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOrEditTableComponent>,
    private fb: FormBuilder,
    private _tableServices: TableService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _statusService: StatusService
    ) {
    this.form = this.fb.group({
      name_table: ['', Validators.required],
      id_status: ['', Validators.required]
    });

    this.id = data.id;

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('add').subscribe((res: string) => {
      this.operation = res;
    });

    this.translate.get('saveTable').subscribe((res: string) => {
      this.tableSave = res;
    });

    this.translate.get('aggregate').subscribe((res: string) => {
      this.aggregate = res;
    });

    this.translate.get('editTable').subscribe((res: string) => {
      this.tableUpdate = res;
    });

    this.translate.get('edited').subscribe((res: string) => {
      this.edited = res;
    });
  };

  ngOnInit(): void {
    this.getStatus();
    this.isEdit(this.id);
  }
  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.translate.get('edit').subscribe((res: string) => {
        this.operation = res;
      });
      // this.operation = 'Editar ';
      this.getTableId(id);
    }
  }

  getTableId(id: number) {
    this._tableServices.getTableId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        // Verificar si hay al menos un elemento en el array
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const tableObject = firstArray[0];
            this.form.patchValue({
              name_table: tableObject.name_table,
              id_status: tableObject.id_status
            });
          }
        }
      }
    });
  }

  addTable() {
    // console.log(this.form);
    if (this.form.invalid) {
      return;
    }
    // console.log(user);

    this.loading = true;

    if (this.id === undefined) {
      const table: Table = {
        name_table: this.form.value.name_table,
        id_status: this.form.value.id_status
      }
      setTimeout(() => {
        this._tableServices.addTable(table).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.tableSave, this.aggregate);
        });
      }, 200);
    } else {
      const table: Table = {
        id: this.id,
        name_table: this.form.value.name_table,
        id_status: this.form.value.id_status
      }
      setTimeout(() => {
        this._tableServices.updateTable(table).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.tableUpdate, this.edited);
        });
      }, 200);
    }
  }

  getStatus() {
    this._statusService.getStatus().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        // Check if the first element of result is an array of users
        if (Array.isArray(result)) {
          this.status = result;
        }
      }
    });
  }

  es() {
    this.translate.use('es');
    this._tableServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._tableServices.updateServerLanguage('en').subscribe(() => { });
  }

}