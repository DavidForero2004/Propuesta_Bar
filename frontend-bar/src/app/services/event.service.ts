import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../interfaces/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'events';

  }

  selectEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}/`)
  }

  insertEvent(event: Event): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/insertevent`, event);
  }

  deleteEvent(id?: number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/deleteevent/${id}`);
  }

  updateEvent(event: Event): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/updateevent`, event);
  }

  selectEventId(id?: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }
  selectEventTop(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}/selectTop`)
  }
  

  updateServerLanguage(lang: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}language`, { lang });
  }
}
