import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { faShoppingCart, faBars, faPhone, faHouse, faLanguage, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-land-nav',
  templateUrl: './land-nav.component.html',
  styleUrls: ['./land-nav.component.css']
})
export class LandNavComponent implements OnInit {

  //icons
  iconCar = faShoppingCart;
  iconMenu = faBars;
  iconPhone = faPhone;
  iconHouse = faHouse;
  iconLanguage = faLanguage;
  iconCalendar = faCalendar;

  isMenuOpen = false;

  constructor(
    private translate: TranslateService,
    private _userService: UserService,
    private el: ElementRef,
    private router: Router
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.loadScript('../../../../assets/js/landing/landing.js');
    this.checkScreenWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMenuOpen = window.innerWidth <= 720 ? this.isMenuOpen : false;
  }

  navigateToFooter() {
    this.router.navigate(['/hollowbar-initial/client/'], { fragment: 'footer' });
  }

  private loadScript(url: string): void {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      this.el.nativeElement.appendChild(script);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
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
