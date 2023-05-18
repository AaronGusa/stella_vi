import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MiddlewareService } from 'middle/services/stella_services';
import { Subscription } from 'rxjs';

import { ReviewModel } from 'src/models/reviews/review.model';

@Component({
  selector: 'app-reviews-db',
  templateUrl: './reviews-db.component.html',
  styleUrls: ['./reviews-db.component.css']
})
export class ReviewsDbComponent implements OnInit, OnDestroy {
  reviews = [];
  data = [];
  businesses = [];
  bus_reviews = [];


  rev_sub: Subscription;
    
  constructor(private http: HttpClient,
              private mw: MiddlewareService) {}

  ngOnInit(): void {
    console.log('We got REVIEWS component!');
    try{
      this.rev_sub = this.mw.getReviews().subscribe(
        (data) => {
          this.reviews = data;
        },
        (error) => {
          console.error(error);
        }
      );
      } catch {
        console.log('Error');
      }
  }

  ngOnDestroy(): void {
    this.rev_sub.unsubscribe();
  }
  
  

  // getReviews() {
  //   // this.http.get<ReviewModel[]>("http://localhost:3000/reviews").pipe(
  //   //   //take(1) // Only emit the first value and then complete
  //   // ).subscribe({
  //   //   next: (data) => {
  //   //     this.reviews = data;
  //   //     //this.services = this.business.map(business => business.services); // Assign the services of the first category to the services property
  //   //     //console.log(this.business);
  //   //   },
  //   //   error: (err) => console.error(err)
  //   // });
  //   this.http.get<any[]>("http://localhost:3000/reviews").subscribe({
  //     next: (data) => {
  //       this.reviews = this.flattenReviews(data);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  // flattenReviews(data: any[]): ReviewModel[] {
  //   const flattenedReviews: ReviewModel[] = [];
  //   data.forEach(item => {
  //     const yearKeys = Object.keys(item);
  //     yearKeys.forEach(yearKey => {
  //       const monthKeys = Object.keys(item[yearKey]);
  //       monthKeys.forEach(monthKey => {
  //         const reviews = item[yearKey][monthKey];
          
  //         flattenedReviews.push(...reviews);
        
  //       });
  //     });
  //   });
  //   console.log('OOPO!')
  //   return flattenedReviews;
  // }
}
