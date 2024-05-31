import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../services/localstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form: FormGroup;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._userService.updateServerLanguage('es').subscribe(() => {});
  }

  ngOnInit(): void {
    this.localStorageService.clear();
  }

  login() {
    if (this.form.invalid) {
      this.translate.get('required').subscribe((res: string) => {
        this.toastr.error(res, 'Error');
      });

      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this._userService.login(user).subscribe({
      next: (response: any) => {
        this.router.navigate(['/chart']);
        const token = response.token;
        this.localStorageService.setItem('token', token);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
  }

  es() {
    this.translate.use('es');
    this._userService.updateServerLanguage('es').subscribe(() => {});
  }

  en() {
    this.translate.use('en');
    this._userService.updateServerLanguage('en').subscribe(() => {});
  }
}
