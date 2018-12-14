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
 
  constructor(public productService: ProductService, public toastr: ToastrServiceService) {}
  public default_item = {
    _id: 0,
    prodName: "",
    qty:1,
    addon:'0',
    pay:1,
    words:500,
    title:"",
    rate: 0,
    imageRate:100
   }
  ngOnInit() {
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
    this.getProducts()
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
    title:"",
    rate: data.rate,
    imageRate:100
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

   getProducts(){
    this.productService.getProducts('regular').subscribe(
      res => { 
        this.productData = res
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  } 

}
