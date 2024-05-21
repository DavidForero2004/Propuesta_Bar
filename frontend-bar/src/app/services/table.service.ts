import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Table } from '../interfaces/table';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myApiUrl = 'tables' ;
    this.myAppUrl = environment.endpoint;
   }

  getTable(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  addTable(table: Table): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/inserttable`, table);
  }

  deleteTable(id?: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deletetable/${id}`);
  }

  updateTable(table: Table): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updatetable`, table);
  }

  getTableId(id?: number): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }
}
