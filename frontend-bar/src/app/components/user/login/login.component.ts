import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password : string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService) {}

  ngOnInit(): void {
    
  }

  login() {
    if (this.email == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const user: User = {
      email: this.email,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }
}
