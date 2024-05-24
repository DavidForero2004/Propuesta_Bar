import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'orders';
  }

  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  getSales(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/sales`);
  }
  getSalesMonth(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/salesmonth`);
  }
  getSalesProduct(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/salesproduct`);
  }

  getSalesProductMonth(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/salesproductmonth`);
  }
  getSalesTable(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/salestable`);
  }
  
  addOrder(order: Order): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/insertorder`, order);
  }

  deleteOrder(id?: number) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deleteorder/${id}`);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updateorder`, order);
  }

  getOrderId(id?: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }
}
