import { Component, OnDestroy, OnInit } from '@angular/core';

import { CocktailsService } from './shared/services/cocktails.service';

import { tap } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  title = 'accepted-coctails';

  themeOptions: SelectItem[];

  theme: string;
  display: boolean;

  constructor(
    private cocktailsService: CocktailsService,
  ) {}

  ngOnInit(): void {
    const theme = this.themeSubscription();

    this.subscriptions.push(theme);

    this.themeOptions = [
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ];
  }

  themeSubscription(): Subscription {
    return this.cocktailsService.theme$
      .pipe(
        tap((res) => {
          this.theme = res;
          this.theme === 'dark'
            ? document.body.classList.add('dark-theme')
            : document.body.classList.remove('dark-theme');
        })
      )
      .subscribe();
  }

  showSettings(): void {
    this.display = true;
  }

  onSelectTheme(value: string): void {
    this.cocktailsService.setTheme(value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
