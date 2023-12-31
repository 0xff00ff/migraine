import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { NavigationService, Pages } from 'src/app/services/navigation.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  items: Item[] = [];
  itemsSubscription:any;
  stat: any = {}
  statSubscription: any;

  constructor(itemsService: ItemsService, statService: StatisticsService, private navService: NavigationService) {
    this.itemsSubscription = itemsService.getList().subscribe((items) => {
      console.log('Dashboard: got items', items)
      this.items = items.slice(-5).reverse();
    });
    this.statSubscription = statService.getShortStatistics().subscribe((stat) => {
      console.log('Dashboard: got stat', stat)
      this.stat = stat;
    })
   }

   ngOnInit() {
    this.navService.setPage(Pages.Dashboard);
   }

   ngOnDestroy() {
    console.log('Dashboard: ngOnDestroy')
    this.itemsSubscription.unsubscribe();
  }
}
