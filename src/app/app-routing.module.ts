import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cocktails',
    component: CocktailsComponent,
  },
  {
    path: 'cocktails/:id',
    component: CocktailDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const AppRoutingModuleComponents = [
  HomeComponent,
  CocktailsComponent,
  CocktailDetailsComponent
];
