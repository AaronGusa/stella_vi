import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../models/service.model';
import { Category } from '../../models/category.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  categories: Category[] = [];
  services: Service[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('We got services component!')
    this.getServices();
  }

  getServices() {
    this.http.get<Category[]>("http://localhost:3000/services").pipe(
      take(1) // Only emit the first value and then complete
    ).subscribe({
      next: (data) => {
        this.categories = data;
        this.services = data[0].services; // Assign the services of the first category to the services property
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }
}
