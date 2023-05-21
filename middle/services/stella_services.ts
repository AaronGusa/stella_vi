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

    convertObjectToArray(obj) {
        return Object.keys(obj).map((key) => {
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            return this.convertObjectToArray(obj[key]);
          }
          return obj[key];
        });
    }

    //BusinessesDB

    getBusiness() {
        return this.http.get<Business[]>("http://localhost:3000/businesses")
            // .then(response => response.data)
            // .catch(error => {
            //     console.error('Error Fetching Businesses:', error);
            //     throw error;
            // });
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
        return this.http.get<ReviewModel[]>("http://localhost:3000/reviews").pipe(
          map(reviews => {
            //console.log('REVIEW RETURN');
            //console.log(reviews);
      
            const modifiedData = reviews.map(entry => {
              const reviewsArray = Object.values(entry.reviews);
              return { ...entry, reviews: reviewsArray };
            });
      
            //console.log(modifiedData);
      
            return modifiedData;
          })
        );
      };

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