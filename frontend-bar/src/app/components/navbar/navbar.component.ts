import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { faBars } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  iconMenu = faBars;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private translate: TranslateService,
    private _userService: UserService,
    private renderer: Renderer2
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    
    this._userService.updateServerLanguage('es').subscribe(() => {});
  }

  ngOnInit(): void {
    this.loadScript('../../../../assets/js/nav/nav.js');
  }

  private loadScript(url: string): void {
    const script = this.renderer.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logOut() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }

  es() {
    this.translate.use('es');
    this._userService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._userService.updateServerLanguage('en').subscribe(() => { });
  }
}
