import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../interfaces/status';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddOrEditUserComponent } from '../../user/add-or-edit-user/add-or-edit-user.component';
import { ProductService } from '../../../services/product.service';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../../interfaces/product';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StatusService } from '../../../services/status.service';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrl: './add-or-edit-product.component.css'
})
export class AddOrEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  userSave: string = '';
  aggregate: string = '';
  userUpdate: string = '';
  edited: string = '';

  operation: string = '';
  id: number | undefined;

  status: Status[] = [];

  constructor(public dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private fb: FormBuilder,
    private _productServices: ProductService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private _statusService: StatusService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      name_product: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      id_status: ['', Validators.required]
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
    this.isEdit(this.id);
    this.getStatus();
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
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
      this.getProductId(id);
    }
  }

  getProductId(id: number) {
    this._productServices.getProductId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const productObject = firstArray[0];
            this.form.patchValue({
              name_product: productObject.name_product,
              //image es input tipo file y no deja poner string
              //image: productObject.image,
              price: productObject.price,
              stock: productObject.stock,
              id_status: productObject.id_status
            });
          }
        }
      }
    });
  }

  addProduct() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    if (this.id === undefined) {
      const product: Product = {
        name_product: this.form.value.name_product,
        image: this.form.value.image,
        price: this.form.value.price,
        stock: this.form.value.stock,
        id_status: this.form.value.id_status
      }
      setTimeout(() => {
        this._productServices.addProduct(product).pipe(
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
      const product: Product = {
        id: this.id,
        name_product: this.form.value.name_product,
        image: this.form.value.image,
        price: this.form.value.price,
        stock: this.form.value.stock,
        id_status: this.form.value.id_status
      }
      setTimeout(() => {
        this._productServices.updateProduct(product).pipe(
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
        // Check if the first element of result is an array of users
        if (Array.isArray(result)) {
          this.status = result;
        }
      }
    });
  }
  es() {
    this.translate.use('es');
    this._productServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._productServices.updateServerLanguage('en').subscribe(() => { });
  }
}
