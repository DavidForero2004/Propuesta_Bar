import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const storedToken = this.localStorageService.getItem('token');

        if (storedToken) {
            // Agregar el token al encabezado de la solicitud
            req = req.clone({ setHeaders: { Authorization: `Bearer ${storedToken}` } });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })
        );
    }
}
