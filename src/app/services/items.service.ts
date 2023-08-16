import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  items: Item[] = [
    Item.empty(),
    Item.empty(),
    Item.empty(),
    new Item(new Date())
  ];
  stream: BehaviorSubject<Item[]> = new BehaviorSubject(this.items);

  constructor() {
    const j = localStorage.getItem('items');
    if (j) {
      this.items = JSON.parse(j);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i] = Item.fromObject(this.items[i]);
      }
      console.log('items restored')
    }
    this.stream.next(this.items);
   }

  getOne(id: number):Observable<Item> {
    console.log('getting item', id)
    return new Observable<Item>(observer => {
      observer.next(this.items[id]);
      observer.complete();
    })
  }

  getList(): Subject<Item[]> {
    return this.stream;
  }

  add(d: Item) {
    console.log('adding item', d)
    this.items.push(d);
    this.stream.next(this.items);
    this.sync();
  }

  edit(id: number, d: Item) {
    this.items[id] = d;
    this.stream.next(this.items);
    this.sync();
  }

  delete(id: number) {
    this.items.splice(id, 1);
    this.stream.next(this.items);
    this.sync();
  }

  sync() {
    const j = JSON.stringify(this.items);
    localStorage.setItem('items', j);
  }
}