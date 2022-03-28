import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  private searchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
  private categoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  private cocktailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
  private cocktailsByCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  private cocktailsDetailsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

  private theme: BehaviorSubject<string> = new BehaviorSubject<string>(this.initialTheme());
  public readonly theme$: Observable<string> = this.theme.asObservable();

  constructor(
    private apiService: ApiService
  ) { }

  getCategories(): Observable<any> {
    return this.apiService.get(`${this.categoriesUrl}`);
  }

  getCocktails(params?: HttpParams): Observable<any> {
    return this.apiService.get(`${this.cocktailsUrl}`, params);
  }

  getCoctailsByCategory(params?: HttpParams): Observable<any> {
    return this.apiService.get(`${this.cocktailsByCategoryUrl}`, params);
  }

  getCoctailDetails(params?: HttpParams): Observable<any> {
    return this.apiService.get(`${this.cocktailsDetailsUrl}`, params);
  }

  searchCoctails(params: HttpParams): Observable<any> {
    return this.apiService.get(`${this.searchUrl}`, params);
  }

  initialTheme(): string {
    const theme = localStorage.getItem('coctails-theme');

    return theme ? theme : 'light';
  }

  setTheme(value: string): void {
    localStorage.setItem('coctails-theme', value);

    this.theme.next(value);
  }
}
