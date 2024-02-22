import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GetUser, UserResponse } from '../../../interfaces/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit{
  listUser: GetUser[] = [];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.getUser().subscribe((data: any) => {
      if (data && data.result) {
        const result = data.result;
        // Check if the first element of result is an array of users
        if (Array.isArray(result[0])) {
          // Assign users to listUser
          this.listUser = result[0];
        } 
      }
    });
  }  
}
