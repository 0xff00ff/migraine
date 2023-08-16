import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent {
  items: Item[] = [];
  subscription: Subscription;

  constructor(private itemsService: ItemsService) { 
    console.log('records: constructor')
     this.subscription = this.itemsService.getList().subscribe((items) => {
      console.log('records: got items', items)
      this.items = items
    });
  }

  ngOnInit(): void {
    console.log('records: ngOnInit')
    console.log(this.items)
  }

  ngOnDestroy() {
    console.log('records: ngOnDestroy')
    this.subscription.unsubscribe();
  }

  onDelete(i: number) {
    console.log('records: onDelete')
    if (!confirm('Are you sure?')) {
      return;
    }
    this.itemsService.delete(i);
  }
}
