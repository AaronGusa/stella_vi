import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Business } from 'src/models/business/business.model';
import { BusinessServices } from 'src/models/business/business_services.model';
import { ReviewModel } from 'src/models/reviews/review.model';
import { User } from 'src/models/users/user.model';
import { UserProfile } from 'src/models/users/user_profile';
import { Category } from 'src/models/services/category.model';
import { Service } from 'src/models/services/service.model';

@Injectable({
  providedIn: 'root'
})


export class MiddlewareService {
    //Variables
    
    //ReviewsDB
    reviews: ReviewModel[] = [];
    
    constructor(private http: HttpClient) {}

    //BusinessesDB

    getBusiness() {
        return this.http.get<Business[]>("http://localhost:3000/businesses")
        // .pipe(
        // take(1) // Only emit the first value and then complete
        // ).subscribe({
        // next: (data) => {
        //     this.business = data;
        //     this.bus_services = this.business.map(business => business.services); // Assign the services of the first category to the services property
        //     //console.log(this.business);
        // },
        // error: (err) => console.error(err)
        // });
    };

    //ReviewsDB

    getReviews(): Observable<any[]> {
        return this.http.get<any[]>("http://localhost:3000/reviews").pipe(
          map((data) => {
            return this.flattenReviews(data);
          })
        );
      }

      flattenReviews(data: any[]): ReviewModel[] {
        const flattenedReviews: ReviewModel[] = [];
        data.forEach(item => {
          if (typeof item === 'object') { // Only process valid review objects
            const yearKeys = Object.keys(item);
            yearKeys.forEach(yearKey => {
              const monthKeys = Object.keys(item[yearKey]);
              monthKeys.forEach(monthKey => {
                const reviews = item[yearKey][monthKey];
                if (Array.isArray(reviews)) { // Only process valid review arrays
                  flattenedReviews.push(...reviews);
                }
              });
            });
          }
        });
        console.log('OOPO!')
        return flattenedReviews;
      }

    //UsersDB

    getUsers() {
         return this.http.get<User[]>("http://localhost:3000/users")
        //.pipe(
        //   //take(1) // Only emit the first value and then complete
        // ).subscribe({
        //   next: (data) => {
        //     this.user = data;
        //     this.userProf = this.user.map(user => user.u_prof); // Assign the services of the first category to the services property
        //     //console.log(this.user);
        //   },
        //   error: (err) => console.error(err)
        // });
    };

    //ServicesDB

    getServices() {
        return this.http.get<Category[]>("http://localhost:3000/services")
        // .pipe(
        //     take(1) // Only emit the first value and then complete
        // ).subscribe({
        //     next: (data) => {
        //     this.s_categories = data;
        //     this.services = data[0].services; // Assign the services of the first category to the services property
        //     console.log(this.s_categories);
        //     },
        //     error: (err) => console.error(err)
        // });
    };


}