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
  public default_item
  ngOnInit() {
    this.cartProducts =  sessionStorage.getItem('addtoCartProducts').split(',') 
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
        this.default_item = res[0]._id 
        console.log('data',res)
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  } 

}
