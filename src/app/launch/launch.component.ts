import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import * as _ from 'lodash';
import { CheckoutService } from '../myservices/checkout.service';
import { ToastrServiceService } from '../toastr-service.service';
import { ConfigService } from '../config.service';
declare let paypal: any;
@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.css']
})
export class LaunchComponent implements AfterViewChecked , OnInit {
public cartProducts
public grandTotal
public totalItem
public isLogin
addScript: boolean = false;
paypalLoad: boolean = true;

paypalConfig = {
  env: 'sandbox',
  client: {
    sandbox: 'AZr0Mi0TwKKr0zD_vCO_ASq_z1rq97UgZL09VHC5HWx94eCWqoDv5jcbxihZ-9-qz7kC_Ca9fB8hmdH-',
    production: '<your-production-key here>'
  },

  commit: true,
  payment: (data, actions) => {
    return actions.payment.create({
      payment: {
        transactions: [
          { amount: { total: this.grandTotal, currency: this._config.configuration.currencyCode } }
        ]
      }
    });
  },
  onAuthorize: (data, actions) => {
    return actions.payment.execute().then((payment) => {
      //Do something when payment is successful.
    })
  }
};

ngAfterViewChecked(): void {
  if (!this.addScript) {
    this.addPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      this.paypalLoad = false;
    })
  }
}

addPaypalScript() {
  this.addScript = true;
  return new Promise((resolve, reject) => {
    let scripttagElement = document.createElement('script');    
    scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
    scripttagElement.onload = resolve;
    document.body.appendChild(scripttagElement);
  })
}
  constructor(private checkoutservice: CheckoutService, private toastr: ToastrServiceService, private _config: ConfigService) { }

  ngOnInit() {
    this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))['productList']
    this.totalItem = this.cartProducts.length
    this.grandTotal =_.sumBy(this.cartProducts, function(o) { return o.total; });
  }

  onSubmit(){
    this.checkoutservice.payCheckout().subscribe(
      res => { 
        this.toastr.Success('wow!','successfully Ordered') 
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
    this.isLogin = localStorage.getItem('email') ? true : false
  }

}
