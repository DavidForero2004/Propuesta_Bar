import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';
import { UserService } from '../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../../interfaces/status';
import { Rol } from '../../../interfaces/rol';
import { StatusService } from '../../../services/status.service';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrl: './add-or-edit-user.component.css'
})

export class AddOrEditUserComponent implements OnInit {
  hide = true;
  form: FormGroup;
  loading: boolean = false;
  userSave: string = '';
  aggregate: string = '';
  userUpdate: string = '';
  edited: string = '';
  operation: string = '';
  id: number | undefined;
  status: Status[] = [];
  rol: Rol[] = []

  constructor(
    public dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private fb: FormBuilder,
    private _userServices: UserService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private _statusService: StatusService,
    private _rolService: RolService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;

    if (this.id === undefined) {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        rol: ['', Validators.required]
      });
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        status: ['', Validators.required],
        rol: ['', Validators.required]
      });
    }

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._userServices.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['add','saveUser','aggregate','editUser','edited']).subscribe((res: any) => {
      this.operation = res.add;
      this.userSave = res.saveUser;
      this.aggregate = res.aggregate;
      this.userUpdate = res.editUser;
      this.edited = res.edited;
    });
  };

  ngOnInit(): void {
    this.isEdit(this.id);
    this.getStatus();
    this.getRol();
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.translate.get('edit').subscribe((res: string) => {
        this.operation = res;
      });
      this.getUserId(id);
    }
  }

  getUserId(id: number) {
    this._userServices.getUserId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const userObject = firstArray[0];
            this.form.patchValue({
              name: userObject.name,
              email: userObject.email,
              status: userObject.id_status,
              rol: userObject.id_rol
            });
          }
        }
      }
    });
  }

  addUser() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.id === undefined) {
      const user: User = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        id_status: 1,
        id_rol: this.form.value.rol,
      }

      setTimeout(() => {
        this._userServices.addUser(user).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.userSave, this.aggregate);
        });
      }, 200);
    } else {
      const user: User = {
        id: this.id,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        id_status: this.form.value.status,
        id_rol: this.form.value.rol,
      }

      setTimeout(() => {
        this._userServices.updateUser(user).pipe(
          catchError((error: HttpErrorResponse) => {
            this.loading = false;
            this._errorService.msjError(error);
            return throwError(error);
          })
        ).subscribe(() => {
          this.loading = false;
          this.dialogRef.close(true);
          this.toastr.success(this.userUpdate, this.edited);
        });
      }, 200);
    }
  }

  getStatus() {
    this._statusService.getStatus().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.status = result.filter((state: Status) => state.name !== 'Paid' && state.name !== 'Canceled');
        }
      }
    });
  }

  getRol() {
    this._rolService.getRol().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.rol = result;
        }
      }
    });
  }

  translateStateName(stateName: string | undefined): string {
    if (typeof stateName === 'string') {
      const translatedName = this.translate.instant(`statuses.${stateName}`);
      return translatedName !== `statuses.${stateName}` ? translatedName : '';
    } else {
      return '';
    }
  }

  translateRolName(rolName: string | undefined): string {
    if (typeof rolName === 'string') {
      const translatedName = this.translate.instant(`role.${rolName}`);
      return translatedName !== `role.${rolName}` ? translatedName : '';
    } else {
      return '';
    }
  }

  es() {
    this.translate.use('es');
    this._userServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._userServices.updateServerLanguage('en').subscribe(() => { });
  }
}