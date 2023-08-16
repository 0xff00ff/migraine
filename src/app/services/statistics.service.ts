import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { Item } from '../models/item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  shortStat = {
    totalItems: 0,
    totalPerWeek: 0,
    totalPerMonth: 0,
    totalPerYear: 0,
  }

  streamShort: BehaviorSubject<typeof this.shortStat> = new BehaviorSubject(this.shortStat);

  constructor(private itemsService: ItemsService) {
    this.itemsService.getList().subscribe((items) => {
      this.generateStat(items);
    })
  }

  generateStat(items: Item[]) {
    this.shortStat.totalItems = items.length;
    const d = new Date();
    items.forEach((item) => {
      if (d.getDay() == item.date.getDay()) {
        this.shortStat.totalPerWeek++;
      }
      if (d.getMonth() == item.date.getMonth()) {
        this.shortStat.totalPerMonth++;
      }
      if (d.getFullYear() == item.date.getFullYear()) {
        this.shortStat.totalPerYear++;
      }
    })
    this.streamShort.next(this.shortStat);
  }

  getShortStatistics() {
    return this.streamShort;
  }
}
