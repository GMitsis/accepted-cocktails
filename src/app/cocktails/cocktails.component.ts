import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { CocktailsService } from '../shared/services/cocktails.service';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit, OnDestroy {


  subscriptions: Subscription[] = [];
  searchRequestSubscriptions: Subscription[] = [];

  categories: any[];
  coctails: any[];

  activeCategory: string;

  inputValue = new Subject<string>();
  searchValue: string;

  constructor(
    private cocktailsService: CocktailsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const categories = this.categoriesSubscription();
    const coctails = this.coctailsSubscription('a');
    const search = this.searchSubscription();

    this.subscriptions.push(
      coctails,
      categories,
      search
    );
    this.subscriptions.push(categories);
    this.subscriptions.push(search);
  }

  categoriesSubscription(): Subscription {
    return this.cocktailsService.getCategories()
      .subscribe((res) => {
        this.categories = res.drinks.map((d) => ({ label: d.strCategory, value: d.strCategory }));
      });
  }

  coctailsSubscription(letter: string): Subscription {
    const params: HttpParams = new HttpParams().append('f', letter);

    return this.cocktailsService
      .getCocktails(params)
      .pipe(
        tap((res) => {
          this.coctails = res.drinks;
        })
      )
      .subscribe();
  }

  searchSubscription(): Subscription {
    const subscription = this.inputValue.pipe(
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged(),
      tap((value: string) => {
        this.searchCoctail(value);
      })
    )
    .subscribe();

    return subscription;
  }

  searchCoctail(value: string): void {
    this.cancelPendingRequests();

    const search = this.searchCoctailsSubscription(value);

    this.searchRequestSubscriptions.push(search);
  }

  searchCoctailsSubscription(value: string): Subscription {
    const params: HttpParams = new HttpParams().append('s', value);

    const subscription = this.cocktailsService.searchCoctails(params)
    .pipe(
      tap((res) => {
        this.coctails = res.drinks;
      })
    )
    .subscribe();

    return subscription;
  }

  onInput(e: any): void{
    this.inputValue.next(e.target.value);
  }

  getCoctailsByCategory(category: string): void {
    const params: HttpParams = new HttpParams().append('c', category);

    this.cocktailsService.getCoctailsByCategory(params)
    .pipe(
      tap((res) => {
        this.coctails = res.drinks;
      })
    )
    .subscribe();

    this.activeCategory = category;
  }

  getCoctailDetails(id: string): void {
    this.router.navigate(['/cocktails', id]);
  }

  cancelPendingRequests(): void {
    this.searchRequestSubscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
