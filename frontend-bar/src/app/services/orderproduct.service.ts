import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Orderproduct } from '../interfaces/orderproduct';

@Injectable({
  providedIn: 'root'
})
export class OrderproductService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) { 

    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "order-products";
  }

  getOrderProduct(): Observable<Orderproduct[]> {
    return this.http.get<Orderproduct[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getOrderProductId(id: number):Observable<Orderproduct> {
    return this.http.get<Orderproduct>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  getOrderIdProduct(id: number):Observable<Orderproduct> {
    return this.http.get<Orderproduct>(`${this.myAppUrl}${this.myApiUrl}/orderid/${id}`);
  }

  getOrderIdProductId(ido: number, idp: number):Observable<Orderproduct> {
    return this.http.get<Orderproduct>(`${this.myAppUrl}${this.myApiUrl}/orderid/${ido}/productid/${idp}`);
  }

  addOrderProduct(orderProduct: Orderproduct): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/insertorderproduct`, orderProduct);
  }

  updateOrderProduct(orderProduct: Orderproduct): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/updateorderproduct`, orderProduct);
  }

  deleteOrderProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/deleteorderproduct/${id}`);
  }

  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }
}
