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

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name_product', 'image', 'price', 'stock', 'status', 'action'];
  dataSource = new MatTableDataSource<Product>;
  userDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // listUser: User[] = [];

  constructor(private _productService: ProductService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('deleteUser').subscribe((res: string) => {
      this.userDelete = res;
    });

    this.translate.get('removed').subscribe((res: string) => {
      this.removed = res;
    });
  }

  ngOnInit(): void {
    this.getProduct();
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
        // Check if the first element of result is an array of users
        if (Array.isArray(result)) {
          // Assign users to listUser
          // this.listUser = result;
          this.dataSource.data = result;
        }
      }
    });
  }

  addProduct(id?: number) {
    // console.log(id);
    const dialogRef = this.dialog.open(AddOrEditProductComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.getProduct();
      }
    });
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getProduct();
      this.toastr.success(this.userDelete, this.removed);
    });;
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
