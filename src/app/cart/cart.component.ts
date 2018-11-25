import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  Inject,
  ViewContainerRef
} from '@angular/core'

import { CartitemloaderService } from "../cartitemloader.service"
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public cartProducts 
 
 
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef

  constructor(public cartitemservice: CartitemloaderService) {
    
  }
  
  ngOnInit() {
    this.cartProducts =  sessionStorage.getItem('addtoCartProducts').split(',') 
  }

  additem(){
    this.cartProducts.push('Article')
  }

}
