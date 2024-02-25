import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, 
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private translate: TranslateService) { }

  canActivate(): boolean {
    const storedToken = this.localStorageService.getItem('token');
    if (storedToken) {
      // Aquí puedes realizar cualquier otra verificación si es necesario
      return true;
    } else {
      // Verifica si hay un token en localStorage al recargar la página
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.translate.get('accessDeneged').subscribe((res : string) => {
          this.toastr.error(res, 'Error');
        });
        return false;
      }
    }
  }
}
