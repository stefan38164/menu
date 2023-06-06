import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Zamijenite putanju sa vašim API servisom
import { MenuCategory, Area } from '../models/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  meals: MenuCategory[] = [];
  areas!: Area[];
  nationalDishSelected = false;
 
  

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
    this.getAreas();
  }

  getCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.meals = categories;
    });
  }
  getAreas() {
    this.apiService.getAreas().subscribe((areas) => {
      this.areas = areas;
    });
  }
  showNationalDishes() {
    this.nationalDishSelected = !this.nationalDishSelected;
  }
 

}
