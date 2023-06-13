import { Component, Input, OnInit } from '@angular/core';
import { MealDetail } from '../models/models';

@Component({
  selector: 'app-single-meal-details',
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css'],
})
export class SingleMealDetailsComponent implements OnInit {
  @Input() meal!: MealDetail | null;

  ingredients: string[] = [];

  ngOnInit() {
    if (this.meal !== null) {
      const keys = Object.keys(this.meal) as (keyof MealDetail)[];
      const filteredKeys = keys.filter((key) => key.includes('strIngredient'));
      this.ingredients = filteredKeys
        .map((key) => this.meal![key])
        .filter((value) => value !== null && value !== '') as string[];
    }
  }
}
