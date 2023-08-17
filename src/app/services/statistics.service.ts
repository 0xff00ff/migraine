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
  fullStat: {[key: string]: number} = {}

  streamShort: BehaviorSubject<typeof this.shortStat> = new BehaviorSubject(this.shortStat);
  streamFull: BehaviorSubject<typeof this.fullStat> = new BehaviorSubject(this.fullStat);

  constructor(private itemsService: ItemsService) {
    this.itemsService.getList().subscribe((items) => {
      this.generateStat(items);
    })
  }

  generateStat(items: Item[]) {
    const shortStat = {
      totalItems: 0,
      totalPerWeek: 0,
      totalPerMonth: 0,
      totalPerYear: 0,
    }
    const fullStat:{[key:string]: number} = {}
    shortStat.totalItems = items.length;
    const d = new Date();
    items.forEach((item) => {
      
      // generate short stat
      if (this.getWeek(d) == this.getWeek(item.date)) {
        shortStat.totalPerWeek++;
      }
      if (d.getMonth() == item.date.getMonth()) {
        shortStat.totalPerMonth++;
      }
      if (d.getFullYear() == item.date.getFullYear()) {
        shortStat.totalPerYear++;
      }

      // generate full stat
      this.incHashKey(fullStat, "additionalPill: ", item.additionalPill)
      this.incHashKey(fullStat, "alcohole: ", item.alcohole)
      this.incHashKey(fullStat, "backHeadPain: ", item.backHeadPain)
      this.incHashKey(fullStat, "cycleDay: ", item.cycleDay)
      this.incHashKey(fullStat, "dayTime: ", item.dayTime)
      this.incHashKey(fullStat, "flu: ", item.flu)
      this.incHashKey(fullStat, "howManyPills: ", item.howManyPills)
      this.incHashKey(fullStat, "neckPain: ", item.neckPain)
      this.incHashKey(fullStat, "nightTraweling: ", item.nightTraweling)
      this.incHashKey(fullStat, "noBreakfast: ", item.noBreakfast)
      this.incHashKey(fullStat, "pillsWorkFast: ", item.pillsWorkFast)
      this.incHashKey(fullStat, "stress: ", item.stress)
      this.incHashKey(fullStat, "weather: ", item.weather)
    })
    let max1 = 0;
    let max2 = 0;
    let max3 = 0;
    for (let key in fullStat) {
      const val = fullStat[key]
      if (val > max1) {
        max1 = val;
      } else if (val > max2 && val != max1) {
        max2 = val;
      } else if (val > max3 && val != max2 && val != max1) {
        max3 = val;
      }
    }
    for (let key in fullStat) {
      if (fullStat[key] <= max3 || fullStat[key] < 2) {
        delete(fullStat[key])
      }
    }

    this.fullStat = fullStat;
    this.shortStat = shortStat;
    this.streamFull.next(this.fullStat);
    this.streamShort.next(this.shortStat);
  }

  getFullStatistics() {
    return this.streamFull;
  }

  getShortStatistics() {
    return this.streamShort;
  }

  private incHashKey(hash: {[key:string]:number}, prefix: string, key: string) {
    if (!key) {
      return
    }
    if (!hash[prefix+key]) {
      hash[prefix+key] = 0
    }
    hash[prefix+key] ++
  }

  private getWeek(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  }
}
