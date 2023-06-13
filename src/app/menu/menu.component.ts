import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Zamijenite putanju sa vašim API servisom
import { MenuCategory, Area } from '../models/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  meals: MenuCategory[] = [];
  areas!: Area[];
  nationalDishSelected = false;

  selectedMenu: string = 'categories';
  searchQuery: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCategories();
    this.getAreas();
  }

  selectMenu(event:any) {
    const selectedValue = event.target.value;
    this.selectedMenu = selectedValue;
  }
  getCategories() {
    this.apiService.getCategories().subscribe((categories:MenuCategory[]) => {
      this.meals = categories;
    });
  }
  getAreas() {
    this.apiService.getAreas().subscribe((areas:Area[]) => {
      this.areas = areas;
    });
  }
  showNationalDishes() {
    this.nationalDishSelected = !this.nationalDishSelected;
  }
 Search() {
    if (this.searchQuery === '') {
      this.getCategories();
      this.getAreas();
      return;
    }

    if (this.selectedMenu === 'categories') {
      this.apiService.getCategories().subscribe((categories:MenuCategory[]) => {
        this.meals = categories.filter((category:MenuCategory) =>
          category.strCategory
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    } else if (this.selectedMenu === 'national-dishes') {
      this.apiService.getAreas().subscribe((areas:Area[]) => {
        this.areas = areas.filter((area) =>
          area.strArea.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }
}
