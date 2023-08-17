import { Component } from '@angular/core';
import { NavigationService, Pages } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor(private navService:NavigationService) { }

  ngOnInit() {
    this.navService.setPage(Pages.Statistics);
  }
}
