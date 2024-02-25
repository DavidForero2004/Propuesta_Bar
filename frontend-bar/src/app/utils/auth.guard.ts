import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService) {
    }

  canActivate(): boolean {
    const storedToken = this.localStorageService.getItem('token'); // Usa el servicio para obtener el token
    if (!storedToken) {
      this.router.navigate(['/login']);
      this.translate.get('accessDeneged').subscribe((res: string) => {
        this.toastr.error(res, 'Error');
      });
      return false;
    }
    return true;
  }
}
