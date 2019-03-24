import { Component, OnInit, AfterViewChecked  } from '@angular/core';
import * as _ from 'lodash';
import { CheckoutService } from '../myservices/checkout.service';
import { ToastrServiceService } from '../toastr-service.service';
import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
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
public aboutCustomer
public profileData
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
  constructor(private checkoutservice: CheckoutService, private authService: AuthService ,private toastr: ToastrServiceService, public _config: ConfigService) { }

  ngOnInit() {
    this.cartProducts=  JSON.parse(sessionStorage.getItem('CartProducts'))
    this.totalItem = this.cartProducts.length
    this.grandTotal =_.sumBy(this.cartProducts['productList'], function(o) { return o.total; });
    this.isLogin = localStorage.getItem('email') ? true : false;
    if(this.isLogin){
        this.getProfileData(localStorage.getItem('email'))
    }
  }
  
  onSubmit(checkoutForm){
    this.cartProducts['billingInfo'] = checkoutForm.form.value;
    this.checkoutservice.payCheckout(this.cartProducts,localStorage.getItem('email')).subscribe(
      res => { 
        this.toastr.Success('wow!','successfully Ordered') 
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  }
getProfileData(email){
    this.authService.getProfile(email).subscribe(
      res => { 
       this.profileData = res
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )

}
}
