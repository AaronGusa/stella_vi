import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/users/user.model';
import { UserProfile } from 'src/models/users/user_profile';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-db',
  templateUrl: './user-db.component.html',
  styleUrls: ['./user-db.component.css']
})
export class UserDbComponent implements OnInit {
  user: User[] = [];
  userProf: UserProfile[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('We got services component!')
    this.getBusiness();
  }

  getBusiness() {
    this.http.get<User[]>("http://localhost:3000/users").pipe(
      take(1) // Only emit the first value and then complete
    ).subscribe({
      next: (data) => {
        this.user = data;
        this.userProf = this.user.map(user => user.u_prof); // Assign the services of the first category to the services property
        //console.log(this.user);
      },
      error: (err) => console.error(err)
    });
  }
}
