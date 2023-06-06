import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FormsModule} from '@angular/forms'
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';


import { ReactiveFormsModule } from '@angular/forms';
import { MealDetailsComponent } from './meals-details/meal-details.component';
import { SingleMealDetailsComponent } from './single-meal-details/single-meal.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  
    AboutComponent,
       MenuComponent,
       

       MealDetailsComponent,
       SingleMealDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

