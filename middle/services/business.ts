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


export class BusinessService {

    constructor(private http: HttpClient) {}


    getBusiness() {
        return this.http.get<Business[]>("http://localhost:3000/businesses")
            // .then(response => response.data)
            // .catch(error => {
            //     console.error('Error Fetching Businesses:', error);
            //     throw error;
            // });

        }
    }