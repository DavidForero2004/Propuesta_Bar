import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../interfaces/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AddOrEditProductComponent } from '../add-or-edit-product/add-or-edit-product.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name_product', 'image', 'price', 'stock', 'status', 'action'];
  dataSource = new MatTableDataSource<Product>;
  productDelete: string = '';
  removed: string = '';
  baseUrl: string = '';
  private myAppUrl: string;
  private myApiUrl: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // listUser: User[] = [];

  constructor(private _productService: ProductService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private _fileServices: FileService,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'file';
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('deleteProduct').subscribe((res: string) => {
      this.productDelete = res;
    });

    this.translate.get('removed').subscribe((res: string) => {
      this.removed = res;
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.baseUrl = `${this.myAppUrl}${this.myApiUrl}/`;
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

  getProduct() {
    this._productService.getProduct().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.dataSource.data = result;
        }
      }
    });
  }

  addProduct(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditProductComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProduct();
      }
    });
  }

  imageProduct: any = null;

  deleteProduct(id: number) {
    this._productService.getProductId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const productObject = firstArray[0];
            this.imageProduct = productObject.image;
          }
        }
      }
    });

    this._productService.deleteProduct(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getProduct();
      this.toastr.success(this.productDelete, this.removed);
      this._fileServices.deleteFile(this.imageProduct).subscribe(res => {
        // console.log(`Respuesta del servidor`, res);
      });
    });
  }

  es() {
    this.translate.use('es');
    this._productService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._productService.updateServerLanguage('en').subscribe(() => { });
  }
}
