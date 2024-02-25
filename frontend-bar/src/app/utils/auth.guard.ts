import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService) { 
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
    }

  canActivate(): boolean {
    const storedToken = localStorage.getItem('token');
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
