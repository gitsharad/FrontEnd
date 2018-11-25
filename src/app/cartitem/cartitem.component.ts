import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '.app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
 @Input() itemList 
  constructor() { }

  ngOnInit() {
    console.log('item',this.itemList)
  }
}
