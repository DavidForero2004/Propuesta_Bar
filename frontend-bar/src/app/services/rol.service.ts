import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Rol } from '../interfaces/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
 
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myApiUrl = 'rols' ;
    this.myAppUrl = environment.endpoint;
   }

   
  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  addRol(rol: Rol): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/insertrol`, rol);
  }

  deleteRol(id?: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deleterol/${id}`);
  }

  updateRol(rol: Rol): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updaterol`, rol);
  }

  getRolId(id?: number): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }
}

