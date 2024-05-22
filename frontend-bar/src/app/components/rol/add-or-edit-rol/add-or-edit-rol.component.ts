import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../interfaces/rol';

@Component({
  selector: 'app-add-or-edit-rol',
  templateUrl: './add-or-edit-rol.component.html',
  styleUrl: './add-or-edit-rol.component.css'
})

export class AddOrEditRolComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  rolSave: string = '';
  aggregate: string = '';
  rolUpdate: string = '';
  edited: string = '';
  operation: string = '';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditRolComponent>,
    private fb: FormBuilder,
    private _rolServices: RolService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });

    this.id = data.id;

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._rolServices.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['add','saveRol','aggregate','editRol','edited']).subscribe((res: any) => {
      this.operation = res.add;
      this.rolSave = res.saveRol;
      this.aggregate = res.aggregate;
      this.rolUpdate = res.editRol;
      this.edited = res.edited;
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
      this.getRolId(id);
    }
  }

  getRolId(id: number) {
    this._rolServices.getRolId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const userObject = firstArray[0];
            this.form.patchValue({
              name: userObject.name
            });
          }
        }
      }
    });
  }

  addRol() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.id === undefined) {
      const rol: Rol = {
        name: this.form.value.name
      }

      setTimeout(() => {
        this._rolServices.addRol(rol).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.rolSave, this.aggregate);
        });
      }, 200);
    } else {
      const rol: Rol = {
        id: this.id,
        name: this.form.value.name
      }
      
      setTimeout(() => {
        this._rolServices.updateRol(rol).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.rolUpdate, this.edited);
        });
      }, 200);
    }
  }

  es() {
    this.translate.use('es');
    this._rolServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._rolServices.updateServerLanguage('en').subscribe(() => { });
  }
}
