import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
public cartProduct 
  ngOnInit() {
    this.cartProduct =  sessionStorage.getItem('addtoCartProducts').split(',')
    console.log('this',this.cartProduct)
  }

}
