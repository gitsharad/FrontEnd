import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  Inject,
  ViewContainerRef
} from '@angular/core'

import { CartitemloaderService } from "../cartitemloader.service"
import { ProductService } from '../myservices/product.service';
import { ToastrServiceService } from '../toastr-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public cartProducts 
public productData 
 
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef

  constructor(public cartitemservice: CartitemloaderService,public productService: ProductService, public toastr: ToastrServiceService) {
    
  }
  public default_item = {_id: 0,
    productName: "",
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
    this.cartProducts.push(this.default_item)
  }
  removeItem(selectedItem){
    let index = this.cartProducts.indexOf(selectedItem);
    this.cartProducts.splice(index,1)
  }

   getProducts(){
    this.productService.getProducts('regular').subscribe(
      res => { 
        this.productData = res     
        this.default_item._id = res[0]._id 
        this.default_item.rate = res[0].rate
        this.default_item.productName = res[0].productName
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  } 

}
