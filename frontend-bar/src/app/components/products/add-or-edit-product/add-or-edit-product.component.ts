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
import { FileService } from '../../../services/file.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrl: './add-or-edit-product.component.css'
})

export class AddOrEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  productSave: string = '';
  aggregate: string = '';
  productUpdate: string = '';
  edited: string = '';
  baseUrl: string = '';
  private myAppUrl: string;
  private myApiUrl: string;
  operation: string = '';
  id: number | undefined;
  selectedFile: any = null;
  nameProduct: any = null;
  imageProduct: any = null;
  status: Status[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOrEditUserComponent>,
    private fb: FormBuilder,
    private _productServices: ProductService,
    private _fileServices: FileService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private _statusService: StatusService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id = data.id;

    if (this.id === undefined) {
      this.form = this.fb.group({
        name_product: ['', Validators.required],
        image: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],
      });
    } else {
      this.form = this.fb.group({
        name_product: [null],
        image: [null],
        price: ['', Validators.required],
        stock: ['', Validators.required],
        id_status: ['', Validators.required]
      });
    }

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'file';

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._productServices.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['add','saveProduct','aggregate','editProduct','edited']).subscribe((res: any) => {
      this.operation = res.add;
      this.productSave = res.saveProduct;
      this.aggregate = res.aggregate;
      this.productUpdate = res.editProduct;
      this.edited = res.edited;
    });
  };

  ngOnInit(): void {
    this.isEdit(this.id);
    this.getStatus();
    this.baseUrl = `${this.myAppUrl}${this.myApiUrl}/`;
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.translate.get('edit').subscribe((res: string) => {
        this.operation = res;
      });
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
              price: productObject.price,
              stock: productObject.stock,
              id_status: productObject.id_status
            });
            this.nameProduct = productObject.name_product;
            this.imageProduct = productObject.image;
          }
        }
      }
    });
  }

  addProduct() {
    this.loading = true;

    if (this.id === undefined) {
      if (this.form.invalid) {
        return;
      }

      const today = new Date();
      const nameFile = this.selectedFile.name.split('.').slice(0, -1).join('.');
      const extensionFile = this.selectedFile.name.split('.').pop();
      const formattedDate = today.getFullYear().toString().padStart(4, '0') + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
      const newNameFile = `${nameFile}${formattedDate}.${extensionFile}`;
      const newFile = new File([this.selectedFile], newNameFile);
      
      const product: Product = {
        name_product: this.form.value.name_product,
        image: newNameFile,
        price: this.form.value.price,
        stock: this.form.value.stock,
        id_status: 1 // Active
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
          this.toastr.success(this.productSave, this.aggregate);

          this._fileServices.addFile(newFile).subscribe(res => {});
        });
      }, 200);
    } else {
      if (this.selectedFile == null) {
        const product: Product = {
          id: this.id,
          name_product: this.nameProduct,
          image: this.imageProduct,
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
            this.toastr.success(this.productUpdate, this.edited);
          });
        }, 200);
      } else {
        const today = new Date();
        const nameFile = this.selectedFile.name.split('.').slice(0, -1).join('.');
        const extensionFile = this.selectedFile.name.split('.').pop();
        const formattedDate = today.getFullYear().toString().padStart(4, '0') + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
        const newNameFile = `${nameFile}${formattedDate}.${extensionFile}`;
        const newFile = new File([this.selectedFile], newNameFile);

        const product: Product = {
          id: this.id,
          name_product: this.nameProduct,
          image: newNameFile,
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
            this.toastr.success(this.productUpdate, this.edited);
            this._fileServices.deleteFile(this.imageProduct).subscribe(res => {});

            this._fileServices.addFile(newFile).subscribe(res => {});
          });
        }, 200);
      }
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
    this._productServices.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._productServices.updateServerLanguage('en').subscribe(() => { });
  }
}
