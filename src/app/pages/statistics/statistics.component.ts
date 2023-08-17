import { Component } from '@angular/core';
import { NavigationService, Pages } from 'src/app/services/navigation.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  statistics: {[key: string]: number} = {}
  stream: any

  constructor(private navService:NavigationService, statisticsService: StatisticsService) {
    this.stream = statisticsService.getFullStatistics().subscribe((stat) => {
      this.statistics = stat;
    })
   }

  ngOnInit() {
    this.navService.setPage(Pages.Statistics);
  }

  ngOnDestroy() {
    this.stream.unsubscribe()
  }
}
