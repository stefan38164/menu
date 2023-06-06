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
  columns = ['Id', 'Name', 'Tags', 'Area'];
  mealDetailList: any = [];
  selectedMeal: Meal | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const mealCategory = params['id'];
      this.getMealCategories(mealCategory);
    });
  }

  getMealCategories(category: string) {
    this.apiService.getMealsByCategory(category).subscribe((meals) => {
      this.meals = meals;
      this.fetchMealDetails();
    });
  }

  fetchMealDetails() {
    const observables = this.meals.map((meal) =>
      this.apiService.getMealById(meal.idMeal)
    );
    
    forkJoin(observables).subscribe((response) => {
      this.mealDetailList = response;
    });
  }

  openMealDetails(meal: Meal) {
    this.selectedMeal = meal;
  }
}

  

