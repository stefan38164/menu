import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Meal, MealDetail } from '../models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
})
export class MealDetailsComponent implements OnInit {
  meals!: Meal[];
  columnsCategory = ['No:', 'Id:', 'Name:', 'Tags:', 'Area:'];
  columnsArea = ['No:', 'Id:', 'Name:', 'Category:'];

  mealCategoryList: any = [];
  mealAreaList: Meal[] = [];
  mealsAreaList: any = [];
  selectedMeal: MealDetail | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (Object.keys(params).includes('id')) {
        const mealCategory = params['id'];
        this.getMealCategories(mealCategory);
      }
      if (Object.keys(params).includes('area')) {
        const mealArea = params['area'];
        this.getMealArea(mealArea);
      }
    });
  }

  getMealCategories(category: string) {
    this.apiService.getMealsByCategory(category).subscribe((meals) => {
      this.meals = meals;

      this.fetchMealDetails(meals);
    });
  }
  getMealArea(area: string) {
    this.apiService.getMealByArea(area).subscribe((meals) => {
      this.mealAreaList = meals;
      this.fetchMealDetails(this.mealAreaList);
    });
  }

  fetchMealDetails(array: any) {
    const observables = array.map((meal: any) =>
      this.apiService.getMealById(meal.idMeal)
    );
    if (array === this.meals) {
      forkJoin(observables).subscribe((response) => {
        this.mealCategoryList = response;
      });
    } else {
      forkJoin(observables).subscribe((response) => {
        this.mealsAreaList = response;
      });
    }
  }
  openMealDetails(meal: MealDetail | null) {
    this.selectedMeal = meal;
  }
}
