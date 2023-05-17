import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user.model';
import { UserProfile } from 'src/models/users/user_profile';
import { Subscription } from 'rxjs';
import { MiddlewareService } from 'middle/services/stella_services';


@Component({
  selector: 'app-user-db',
  templateUrl: './user-db.component.html',
  styleUrls: ['./user-db.component.css']
})
export class UserDbComponent implements OnInit, OnDestroy {
  user: User[] = [];
  userProf: UserProfile[] = [];
  user_sub: Subscription;

  
  constructor(
              private mw: MiddlewareService) {
              //let user = this.mw.getUsers();
              //console.log(user);
              }

  ngOnInit(): void {
    console.log('We got USERS component!');
    this.user_sub = this.mw.getUsers().subscribe({
      next: (data) => {
        this.user = data;
        this.userProf = this.user.map(user => user.u_prof);
        console.log(this.user);
      },
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    if (this.user_sub) {
      this.user_sub.unsubscribe();
    }
  }
}

  // getUser() {
  //   this.http.get<User[]>("http://localhost:3000/users").pipe(
  //     take(1) // Only emit the first value and then complete
  //   ).subscribe({
  //     next: (data) => {
  //       this.user = data;
  //       this.userProf = this.user.map(user => user.u_prof); // Assign the services of the first category to the services property
  //       //console.log(this.user);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

