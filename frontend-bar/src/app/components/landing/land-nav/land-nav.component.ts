import { Component, OnInit, Renderer2 } from '@angular/core';
import { faShoppingCart, faBars, faPhone, faHouse,faLanguage } from '@fortawesome/free-solid-svg-icons'
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-land-nav',
  templateUrl: './land-nav.component.html',
  styleUrl: './land-nav.component.css'
})
export class LandNavComponent implements OnInit {

  //icons
  iconCar = faShoppingCart;
  iconMenu = faBars;
  iconPhone = faPhone;
  iconHouse = faHouse;
  iconLanguage = faLanguage;

  constructor(
    private renderer: Renderer2,
    private translate: TranslateService,
    private _userService: UserService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.loadScript('../../../../assets/js/landing/landing.js');
  }

  private loadScript(url: string): void {
    const script = this.renderer.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
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
