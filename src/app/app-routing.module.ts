import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';

import { MealDetailsComponent } from './meals-details/meal-details.component';
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'menu/meal-details/:id', component: MealDetailsComponent },
  { path: 'menu/meal-area/:area', component: MealDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
