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
 @Input() addonList
 public removeProduct
 public currentProductData
 @Output() itemToRemove: EventEmitter<string>= new EventEmitter()
  constructor() { }
  public numbers
  public wordList
  
  ngOnInit(){
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
    this.currentProductData.productName = data.productName  
  }
  addonchange(index){
    this.currentProductData.otherInfo[index].addonqty = 0
  }
  addonqtychange (){
    let total = 0
    for(let i = 0 ; i < this.currentProductData.otherInfo.length; i++){
      total = total + (this.currentProductData.otherInfo[i].addonqty * this.currentProductData.otherInfo[i].addonrate)
    }
    this.currentProductData.addontotal =  total
  }
 
  addtitlelist(event){
    if(this.currentProductData.otherInfo.length > event){
      let totalLength = this.currentProductData.otherInfo.length
      for(let k = event ; k<totalLength ; k++ ){
        this.currentProductData.otherInfo.splice(k,1)
      }
    }
    for(let i = this.currentProductData.otherInfo.length; i< event ; i++){
      this.currentProductData.otherInfo[i] =  {"name":"",
            "addon":"",
            "addonqty":0,
            "addonrate":100
            }
    }  
  }
}
