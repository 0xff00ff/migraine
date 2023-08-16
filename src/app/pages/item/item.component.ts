import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  item: Item = Item.empty();
  loading: boolean = true;
  type = 'add';
  id = 0;

  constructor(private itemsService: ItemsService, private router: Router, private route:ActivatedRoute) {
    console.log(this.item)
   }

   ngOnInit() {
    this.type = this.route.snapshot.data['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type == 'edit') {
      this.itemsService.getOne(this.id).subscribe((item) => {
        this.item = item;
        this.loading = false;
      })
    } else {
      this.loading = false;
    }
   }

  parseDate(dateString: any): Date {
    return new Date(dateString.target.value);
  }

  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  onSave() {
    if (this.type == 'edit') {
      this.itemsService.edit(this.id, this.item);
    } else {
      this.itemsService.add(this.item);
    }
    this.router.navigate(['/records']);
  }
}
