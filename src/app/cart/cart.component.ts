import { Component, OnInit } from '@angular/core';
import { ProductService } from '../myservices/product.service';
import { ToastrServiceService } from '../toastr-service.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public cartProducts 
public productData 
public default_item
public addonList
 
  constructor(public productService: ProductService, public toastr: ToastrServiceService) {
    let temp= {
      _id: 0,
      prodName: "",
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
      rate: 0,
      addontotal:0
     }
     this.default_item = temp
  }
   
  ngOnInit() {
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
    this.getProducts('regular')
    this.getProducts('addon')
  }

  additem(){
    let data =  _.find(this.productData,{_id: this.productData[0]._id})
    this.default_item = {
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
    this.cartProducts.push(this.default_item) 
  }
  removeItem(selectedItem){
    let index = this.cartProducts.indexOf(selectedItem);
    this.cartProducts.splice(index,1)
  }
  checkOutItems(){
   sessionStorage.setItem( "CartProducts", JSON.stringify(this.cartProducts))
  }

   getProducts(type){
    this.productService.getProducts(type).subscribe(
      res => { 
        if(type === 'regular'){
          this.productData = res
        } else {
          this.addonList = res 
         // console.log('addlist',this.addonList)
        }
        
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  } 

}
