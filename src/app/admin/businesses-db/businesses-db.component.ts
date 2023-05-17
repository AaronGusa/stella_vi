import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../../../models/business/business.model';
import { BusinessServices } from '../../../models/business/business_services.model';
import { Subscription } from 'rxjs';
import { MiddlewareService } from 'middle/services/stella_services';


@Component({
  selector: 'app-businesses-db',
  templateUrl: './businesses-db.component.html',
  styleUrls: ['./businesses-db.component.css']
})
export class BusinessesDbComponent implements OnInit {
  business: Business[] = [];
  services: BusinessServices[] = [];
  bus_sub: Subscription;
  
  constructor(private http: HttpClient,
              private mw: MiddlewareService) {
                //let business = this.mw.getBusiness();
                //console.log(business);
              }

  ngOnInit(): void {
    console.log('We got BUSINESSs component!')
    // this.getBusiness();
    this.bus_sub = this.mw.getBusiness().subscribe({
      next: (data) => {
        this.business = data;
        this.services = this.business.map(business => business.services);
      },
      error: (err) => console.error(err),
    });
  }

  // getBusiness() {
    
  //   this.http.get<Business[]>("http://localhost:3000/businesses").pipe(
  //     take(1) // Only emit the first value and then complete
  //   ).subscribe({
  //     next: (data) => {
  //       this.business = data;
  //       this.services = this.business.map(business => business.services); // Assign the services of the first category to the services property
  //       //console.log(this.business);
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }
}
