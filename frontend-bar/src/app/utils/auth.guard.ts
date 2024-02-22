import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private toastr: ToastrService) {}

  canActivate(): boolean {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      this.router.navigate(['/login']);
      this.toastr.error('Access deneged', 'Error');
      return false;
    }
    return true;
  }
}
