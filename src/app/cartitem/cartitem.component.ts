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
    this.currentProductData = {
    _id: data._id,
    prodName: data.productName,
    qty:1,
    addon:'0',
    pay:1,
    words:500,
    otherInfo:[
      {"name":"",
       "addon":"",
       "addonqty":0,
       "addonrate":100
      }
    ],
    rate: data.rate,
    addontotal:0
    }
  }
 // changeAddonQty

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
