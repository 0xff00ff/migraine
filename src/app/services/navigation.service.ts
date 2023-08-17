import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Pages {
  None = "",
  Dashboard = "dashboard",
  Add = "add",
  Edit = "edit",
  Records = "records",
  Item = "item",
  Statistics = "statistics",
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  pageStream = new BehaviorSubject<Pages>(Pages.None);

  constructor() { }

  setPage(page: Pages) {
    this.pageStream.next(page);
  }

  getPage() {
    return this.pageStream
  }
}
