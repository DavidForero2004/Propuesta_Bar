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

  status: Status[] = [
    { id: 1, name: 'Activo' }
  ];

  rol: Rol[] = [
    { id: 1, name: 'Administrador' }
  ]

  constructor(public dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private fb: FormBuilder,
    private _userServices: UserService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      status: ['', Validators.required],
      rol: ['', Validators.required]
    });

    this.id = data.id;

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('add').subscribe((res: string) => {
      this.operation = res;
    });

    this.translate.get('saveUser').subscribe((res: string) => {
      this.userSave = res;
    });

    this.translate.get('aggregate').subscribe((res: string) => {
      this.aggregate = res;
    });

    this.translate.get('editUser').subscribe((res: string) => {
      this.userUpdate = res;
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
      this.getUserId(id);
    }
  }

  getUserId(id: number) {
    this._userServices.getUserId(id).subscribe((data: any) => {
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
    // console.log(this.form);
    if (this.form.invalid) {
      return;
    }
    // console.log(user);

    this.loading = true;

    if (this.id === undefined) {
      const user: User = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        id_status: this.form.value.status,
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

  es() {
    this.translate.use('es');
    this._userServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._userServices.updateServerLanguage('en').subscribe(() => { });
  }
}