import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ToastrServiceService } from '../toastr-service.service';
@Component({
  selector: '.app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.css']
})
export class CartitemComponent implements OnInit {
 @Input() selectedProduct 
 @Input() productData
 @Input() addonList
 @Input() itemindex
 public removeProduct
 public currentProductData
 public cartProducts 
 public audienceList
 @Output() itemToRemove: EventEmitter<string>= new EventEmitter()
 @Output() subtotalCalculator: EventEmitter<object>= new EventEmitter()
  constructor(public toastr: ToastrServiceService) { 
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
    this.audienceList = ["audience1","audience2","audience3"]
  }
  public numbers
  public wordList
  public audience
  
  ngOnInit(){
    this.currentProductData = this.selectedProduct
    this.numbers = Array(20).fill(0).map((x,i)=>i)
    this.wordList = Array(6).fill(0).map((x,i) => i*500)
  }

  removeItem(item){
    this.removeProduct = item
    this.itemToRemove.emit(this.removeProduct)
  }

  subtotalCalc(){
   this.subtotalCalculator.emit(this.cartProducts)
  }

  onChange(productId){
    let data = _.find(this.productData,{_id: productId})
    this.currentProductData.productName = data.productName
    this.currentProductData.rate = data.rate
    this.currentProductData.total = this.currentProductData.rate * this.currentProductData.qty
    this.subtotalCalc()
    this.updateCartProducts()
  }
  
  updateCartProducts(){
    sessionStorage.setItem( "CartProducts", JSON.stringify(this.cartProducts))
  }

  wordscountchange (){
    let total = 0
    for(let i = 0 ; i < this.currentProductData.otherInfo.length; i++){
      total = total + (this.currentProductData.otherInfo[i].addonqty * this.currentProductData.otherInfo[i].addonrate)
    }
    this.currentProductData.addontotal =  total
  }
 
  addtitlelist(event){
    if(event <= 0){
      this.toastr.Error('','Quantity should be greater than Zero')
      this.currentProductData.qty = this.currentProductData.otherInfo.length
      this.currentProductData.total = this.currentProductData.rate * this.currentProductData.otherInfo.length
      this.subtotalCalc()
    } else {
      this.currentProductData.total = this.currentProductData.rate * this.currentProductData.qty
      this.subtotalCalc()
      if(this.currentProductData.otherInfo.length > event){
        let totalLength = this.currentProductData.otherInfo.length
        for(let k = event ; k<totalLength ; k++ ){
          this.currentProductData.otherInfo.splice(k,1)
        }
      }
      
      for(let i = this.currentProductData.otherInfo.length; i< event ; i++){
        this.currentProductData.otherInfo[i] =   {"name":"",
        "words":500
       }
      }  
    }
  }
 
}
