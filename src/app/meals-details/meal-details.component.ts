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
      if (params['id']) {
        this.getMealCategories(params['id']);
      }

      if (params['area']) {
        this.getMealArea(params['area']);
      }
    });
  }

  getMealCategories(category: string):void {
    this.apiService.getMealsByCategory(category).subscribe((meals:Meal[]) => {
      this.meals = meals;

      this.fetchMealDetails(meals);
    });
  }
  getMealArea(area: string):void {
    this.apiService.getMealByArea(area).subscribe((meals:Meal[]) => {
      this.mealAreaList = meals;
      this.fetchMealDetails(this.mealAreaList);
    });
  }

  fetchMealDetails(array: Meal[]):void {
    const ids = array.map((meal: Meal) =>
      this.apiService.getMealById(meal.idMeal)
    );
    if (array === this.meals) {
      forkJoin(ids).subscribe((response:MealDetail[]) => {
        this.mealCategoryList = response;
      });
    } else {
      forkJoin(ids).subscribe((response:MealDetail[]) => {
        this.mealsAreaList = response;
      });
    }
  }
  openMealDetails(meal: MealDetail | null):void {
    this.selectedMeal = meal;
  }
}
