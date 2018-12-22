import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public cartProducts
  constructor() { }

  ngOnInit() {
    this.cartProducts = JSON.parse(sessionStorage.getItem('CartProducts'))
  }

}
