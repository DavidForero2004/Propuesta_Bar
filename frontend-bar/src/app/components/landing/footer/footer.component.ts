import { Component } from '@angular/core';
import { faFacebook, faTwitter, faInstagram  } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
 //icons
 IconFacebook = faFacebook;
 IconX = faTwitter;
 IconInstagram = faInstagram;

 constructor(){}


 ngOnInit(): void {
   
 }
}
