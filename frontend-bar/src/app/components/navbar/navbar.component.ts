import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private _userService: UserService
    ) {
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
    }

  ngOnInit(): void {}

  logOut() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  es() {
    this.translate.use('es');
    this._userService.updateServerLanguage('es').subscribe(() => {
      console.log('Idioma del servidor actualizado a español.');
    });
  }

  en() {
    this.translate.use('en');
    this._userService.updateServerLanguage('en').subscribe(() => {
      console.log('Server language updated to English.');
    });
  }

}
