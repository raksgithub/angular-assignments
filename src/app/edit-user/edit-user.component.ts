import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User | null = null; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.userService.getUser(params.get('id') as string))
      )
      .subscribe(user => this.user = user);
  }

  handleUserUpdate(user: User) {
    this.userService.updateUser({
      ...user,
      id: this.user?.id || ''
    })
      .subscribe(() => this.router.navigate(['/user-list']))
  }

}
