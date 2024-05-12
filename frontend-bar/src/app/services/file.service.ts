import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'file';
  }

  getImage(image?: string) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${image}`);
  }

  addFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/save`, formData);
  }
}
