import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Status } from '../interfaces/status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myApiUrl = 'state' ;
    this.myAppUrl = environment.endpoint;
   }

   
  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  addStatus(status: Status): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/insertstatus`, status);
  }

  deleteStatus(id?: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deletestatus/${id}`);
  }

  updateStatus(status: Status): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updatestatus`, status);
  }

  getStatusId(id?: number): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }

}
