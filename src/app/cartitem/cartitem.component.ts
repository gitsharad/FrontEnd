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
 @Output() itemToRemove: EventEmitter<string>= new EventEmitter()
  constructor(public toastr: ToastrServiceService) { 
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
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

  removeaudience(index){
    this.currentProductData.styleGuide.audiences.splice(index,1)
  }

  onChange(productId){
    let data =  _.find(this.productData,{_id: productId})
    this.currentProductData.productName = data.productName  
  }

  getStyleData(itemindex){
   
  }
  addonchange(index){
    this.currentProductData.otherInfo[index].addonqty = 0
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
      this.currentProductData.qty = 1
      return
    }
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

  addAudience(name){
    this.audience = ""
  }
}
