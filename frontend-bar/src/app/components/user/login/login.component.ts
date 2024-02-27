import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../assets/fonts/iconic/css/material-design-iconic-font.min.css'
  ]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.localStorageService.clear();
  }

  login() {
    if (this.email == '' || this.password == '') {
      this.translate.get('required').subscribe((res: string) => {
        this.toastr.error(res, 'Error');
      });
      return;
    }

    const user: User = {
      email: this.email,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (response: any) => {
        this.router.navigate(['/users']);
        const token = response.token; // Access the 'token' property of the response object
        this.localStorageService.setItem('token', token);// Here we save only the token
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
  }

  es() {
    this.translate.use('es');
    this._userService.updateServerLanguage('es').subscribe(() => {

    });
  }

  en() {
    this.translate.use('en');
    this._userService.updateServerLanguage('en').subscribe(() => {
      
    });
  }
}
