import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  title: string;

  menuItems: any;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Accepted Cocktails';

    this.menuItems = [
      { label: 'Home', routerLink: '/home' },
      { label: 'Cocktails', routerLink: '/cocktails' },
    ];
  }

}
