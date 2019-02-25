import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CheckoutService } from '../myservices/checkout.service';
import { ToastrServiceService } from '../toastr-service.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements OnInit {
public cartProducts
public grandTotal
  constructor(private checkoutservice: CheckoutService, private toastr: ToastrServiceService) { }

  ngOnInit() {
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))['productList']
    this.grandTotal =_.sumBy(this.cartProducts, function(o) { return o.total; });
  }

  onSubmit(){
    console.log('demo')
    this.checkoutservice.payCheckout().subscribe(
      res => { 
        this.toastr.Success('wow!','successfully Ordered') 
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  }

}
