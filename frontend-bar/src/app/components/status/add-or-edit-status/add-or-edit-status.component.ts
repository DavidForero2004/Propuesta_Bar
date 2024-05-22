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
export class AddOrEditStatusComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  statusSave: string = '';
  aggregate: string = '';
  statusUpdate: string = '';
  edited: string = '';
  operation: string = '';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditStatusComponent>,
    private fb: FormBuilder,
    private _StatusServices: StatusService,
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

    this._StatusServices.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['add','saveStatus','aggregate','editStatus','edited']).subscribe((res: any) => {
      this.operation = res.add;
      this.statusSave = res.saveStatus;
      this.aggregate = res.aggregate;
      this.statusUpdate = res.editStatus;
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
      this.getStatusId(id);
    }
  }

  getStatusId(id: number) {
    this._StatusServices.getStatusId(id).subscribe((data: any) => {
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

  addStatus() {
    if (this.form.invalid) {
      return;
    }

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
