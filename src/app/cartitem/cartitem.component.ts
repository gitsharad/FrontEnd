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
  public numbers
  public wordList
  ngOnInit(){
    console.log('item',this.selectedProduct)
    this.currentProductData = this.selectedProduct
    this.numbers = Array(20).fill(0).map((x,i)=>i)
    this.wordList = Array(6).fill(0).map((x,i) => i*500)
  }

  removeItem(item){
    this.removeProduct = item
    this.itemToRemove.emit(this.removeProduct)
  }

  onChange(productId){
    let data =  _.find(this.productData,{_id: productId})
    this.currentProductData = {_id: data._id,
    productName: data.productName,
    qty:1,
    addon:'0',
    pay:1,
    words:500,
    title:"",
    rate: data.rate,
    imageRate:100
   }
  }
 
}
