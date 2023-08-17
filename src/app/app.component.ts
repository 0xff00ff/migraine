import { Component } from '@angular/core';
import { Navigation } from '@angular/router';
import { NavigationService, Pages } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'migraine';
  page = '';
  pages;
  navigationSubscription: any;

  constructor(navService: NavigationService) {
    this.pages = Pages;
    this.navigationSubscription = navService.getPage().subscribe((page) => {
      setTimeout(() => {this.page = page}, 0)
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
