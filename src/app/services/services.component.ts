import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/services/service.model';
import { Category } from '../../models/services/category.model';
import { Subscription } from 'rxjs';
import { MiddlewareService } from 'middle/services/stella_services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  s_categories: Category[] = [];
  services: Service[] = [];
  serv_sub: Subscription;
  
  constructor(private http: HttpClient,
              private mw: MiddlewareService) {

              }

  ngOnInit(): void {
    console.log('We got services component!')
    this.getServices();
  }

  getServices() {
    this.http.get<Category[]>("http://localhost:3000/services").subscribe({
      next: (data) => {
        this.s_categories = data;
        this.services = data[0].services; // Assign the services of the first category to the services property
        // console.log(this.s_categories.length);
      },
      error: (err) => console.error(err)
    });
  }
}
