import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList$: Observable<User [] | null> = of(null);

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
  }

  ngOnInit(): void {
    this.userList$ = this.userService.getUsers();
  }

  viewUser(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  editUser(user: User) {
    this.router.navigate(['/user/edit', user.id]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id)
        .subscribe(() => this.userList$ = this.userService.getUsers());
  }

  addUser() {
    this.router.navigate(['/add-user']);
  }

}
