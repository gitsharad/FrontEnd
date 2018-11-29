import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: '.app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
 @Input() selectedProduct 
 @Input() productData
 public removeProduct
 public currentProductData
 @Output() itemToRemove: EventEmitter<string>= new EventEmitter()
  constructor() { }

  ngOnInit(){
    console.log('item',this.selectedProduct)
    this.currentProductData = this.selectedProduct
  }

  removeItem(item){
    this.removeProduct = item
    this.itemToRemove.emit(this.removeProduct)
  }

  onChange(productId){
    console.log('productId',productId)
    this.currentProductData =  _.find(this.productData,{_id: productId});
  }
 
}
