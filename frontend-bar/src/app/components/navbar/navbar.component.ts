import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,
    private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  logOut() {
    this.localStorageService.clear();
    this.router.navigate(['/login']);
  }
}
