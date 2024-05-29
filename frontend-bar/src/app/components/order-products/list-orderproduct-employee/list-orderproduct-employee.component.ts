import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { environment } from '../../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ErrorService } from '../../../services/error.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order.service';
import { OrderproductService } from '../../../services/orderproduct.service';

@Component({
  selector: 'app-list-orderproduct-employee',
  templateUrl: './list-orderproduct-employee.component.html',
  styleUrls: ['./list-orderproduct-employee.component.css']
})
export class ListOrderproductEmployeeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['item', 'name_product', 'count', 'price', 'subtotal', 'action'];
  dataSource = new MatTableDataSource<Product>();
  orderId: number = 0;
  form: FormGroup;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  baseUrl: string = '';
  private myAppUrl: string;
  private myApiUrl: string;
  selectedProduct: Product | null = null;
  selectProduct: any = null;
  nameProduct: any = null;
  imageProduct: any = null;
  priceProduct: any = null;
  refreshTime: number = Date.now();

  @ViewChild('productInput') productInput!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _productService: ProductService,
    private _orderProductService: OrderproductService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private _errorService: ErrorService,
  ) { 
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.form = this.fb.group({
      id_product: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource();

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'file';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });
    this.getProduct();
    this.baseUrl = `${this.myAppUrl}${this.myApiUrl}/`;
    this.getOrderIdProduct();
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

  onKey(event: any) { 
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.search(inputValue);
  }

  search(value: string) { 
    let filter = value.toLowerCase();
    return this.products.filter((product: Product) => 
      product.name_product && product.name_product.toLowerCase().startsWith(filter)
    );
  }

  onSelectionChange(event: any) {
    this.selectProduct = event.value;
    this.getProductId(this.selectProduct);
    this.refreshTime = Date.now();
  }

  onClosed() {
    if (!this.form.get('id_product')?.value) {
      this.filteredProducts = [...this.products];
      this.productInput.nativeElement.value = '';
    } else {
      this.filteredProducts = [...this.products];
      this.productInput.nativeElement.value = '';
    }
  }

  getOrderIdProduct() {
    this._orderProductService.getOrderIdProduct(this.orderId).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.dataSource.data = result;
        }
      }
    });
  }
  
  getProduct() {
    this._productService.getProduct().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.products = result;
          this.filteredProducts = result;
        }
      }
    });
  }

  getProductId(id: number) {
    this._productService.getProductId(id).subscribe((data: any) => {
      if(data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          const object = result[0];
          this.nameProduct = object.name_product;
          this.imageProduct = object.image;
          this.priceProduct = object.price;
        }
      }
    });
  }

  es() {
    this.translate.use('es');
    this._orderProductService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._orderProductService.updateServerLanguage('en').subscribe(() => { });
  }
}
