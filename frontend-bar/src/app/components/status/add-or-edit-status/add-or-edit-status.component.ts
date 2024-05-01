import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from '../../../services/rol.service';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { Status } from '../../../interfaces/status';
import { StatusService } from '../../../services/status.service';

@Component({
  selector: 'app-add-or-edit-status',
  templateUrl: './add-or-edit-status.component.html',
  styleUrl: './add-or-edit-status.component.css'
})
export class AddOrEditStatusComponent implements OnInit{
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  statusSave: string = '';
  aggregate: string = '';
  statusUpdate: string = '';
  edited: string = '';

  operation: string = '';
  id: number | undefined;

  // status: Status[] = [
  //   { id: 1, name: 'Activo' }
  // ];

  // rol: Rol[] = [
  //   { id: 1, name: 'Administrador' }
  // ]

  constructor(
    public dialogRef: MatDialogRef<AddOrEditStatusComponent>,
    private fb: FormBuilder,
    private _StatusServices: StatusService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,

    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.id = data.id;

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('add').subscribe((res: string) => {
      this.operation = res;
    });

    this.translate.get('saveStatus').subscribe((res: string) => {
      this.statusSave = res;
    });

    this.translate.get('aggregate').subscribe((res: string) => {
      this.aggregate = res;
    });

    this.translate.get('editRol').subscribe((res: string) => {
      this.statusUpdate = res;
    });

    this.translate.get('edited').subscribe((res: string) => {
      this.edited = res;
    });
  };

  ngOnInit(): void {
    this.isEdit(this.id)
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
      this.getStatusId(id);
    }
  }

  getStatusId(id: number) {
    this._StatusServices.getStatusId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        // console.log(resultArray);

        // Verificar si hay al menos un elemento en el array
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const userObject = firstArray[0];
            // console.log('Información del usuario:', userObject.name);
            this.form.patchValue({
              name: userObject.name
            });
          }
        }
      }
    });
  }

  addStatus() {
    // console.log(this.form);
    if (this.form.invalid) {
      return;
    }
    // console.log(user);

    this.loading = true;

    if (this.id === undefined) {
      const status: Status = {
        name: this.form.value.name
      }

      setTimeout(() => {
        this._StatusServices.addStatus(status).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.statusSave, this.aggregate);
        });
      }, 200);
    } else {
      const status: Status = {
        id: this.id,
        name: this.form.value.name
      }
      setTimeout(() => {
        this._StatusServices.updateStatus(status).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.statusUpdate, this.edited);
        });
      }, 200);
    }
  }

  es() {
    this.translate.use('es');
    this._StatusServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._StatusServices.updateServerLanguage('en').subscribe(() => { });
  }
}
