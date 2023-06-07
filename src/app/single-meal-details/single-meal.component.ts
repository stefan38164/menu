import { Component, Input } from '@angular/core';
import { Meal, MealDetail } from '../models/models';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-single-meal-details',
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css'],
})
export class SingleMealDetailsComponent {
  @Input() meal!: MealDetail | null;
  

  ingredients: string[] = [];
  constructor(private apiService: ApiService) {}

  ngOnChanges() {
    if (this.meal !== null) {
      const keys = Object.keys(this.meal) as (keyof MealDetail)[];
      const filteredKeys = keys.filter((key) => key.includes('strIngredient'));
      this.ingredients = filteredKeys
        .map((key) => this.meal![key]) 
        .filter((value) => value !== null && value !== '') as string[];
        console.log("aaaaa" + this.meal);
        
    }
  }
}
