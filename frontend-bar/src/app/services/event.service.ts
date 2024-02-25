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
}
