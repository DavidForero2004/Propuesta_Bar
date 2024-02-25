import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private _errorService: ErrorService,
        private localStorageService: LocalStorageService
    ) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const storedToken = this.localStorageService.getItem('token'); // Usa el servicio para obtener el token

        // If there is a token in the localStorage, add it as an authorization header to the request
        if (storedToken) {
            req = req.clone({ setHeaders: { Authorization: `Bearer ${storedToken}` } });
        }

        // Return HTTP request with token added
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                }
                this._errorService.msjError(error);
                return throwError(error);
            })
        );
    }
}
