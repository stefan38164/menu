import { Component, Input } from '@angular/core';
import { Meal, MealDetail } from '../models/models';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-single-meal-details',
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css'],
})
export class SingleMealDetailsComponent {
  @Input() meal: Meal | null = null;
  mealDetail: MealDetail | null = null;

  constructor( private apiService: ApiService) {}


  ngOnChanges() {
    if (this.meal) {
      this.getMealDetailById(this.meal.idMeal);
    }
  }

  getMealDetailById(mealId: string) {
  this.apiService.getMealById(mealId).subscribe(response=> this.mealDetail = response);
  }
}
