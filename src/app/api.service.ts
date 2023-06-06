import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuCategory, Area, Meal, MealDetail } from './models/models';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<MenuCategory[]> {
    return this.http
      .get<any>(`${this.apiUrl}/categories.php`)
      .pipe(map((response) => response.categories));
  }

  getAreas(): Observable<Area[]> {
    return this.http
      .get<any>(`${this.apiUrl}/list.php?a=list`)
      .pipe(map((response) => response.meals));
  }

  getMealById(id: string): Observable<MealDetail> {
    return this.http
      .get<any>(`${this.apiUrl}/lookup.php?i=${id}`)
      .pipe(map((response) => response.meals));
  }
  getMealsByCategory(category: string): Observable<Meal[]> {
    const url = `${this.apiUrl}/filter.php?c=${category}`;
    return this.http
      .get<{ meals: Meal[] }>(url)
      .pipe(map((response) => response.meals));
  }
}
