import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { CocktailsService } from '../shared/services/cocktails.service';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss']
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  coctail: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cocktailsService: CocktailsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;

      const details = this.coctailDetailsSusbscription(id);

      this.subscriptions.push(details);
    });
  }

  coctailDetailsSusbscription(id: string): Subscription {
    const params: HttpParams = new HttpParams().append('i', id);

    return this.cocktailsService.getCoctailDetails(params)
      .pipe(
        tap((res) => {
          this.coctail = res.drinks[0];
        })
      )
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
