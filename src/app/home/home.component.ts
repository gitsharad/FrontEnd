import { Component, OnInit } from '@angular/core';
import { ProductService } from "../myservices/product.service";
import { ToastrServiceService } from "../toastr-service.service";
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, public toastr: ToastrServiceService, private _router: Router) { }
  public productData
  public status
  addtoCartProduct: Array <any> = []
  ngOnInit() {
    this.getProducts()
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
  onChangeCategory(event,prod,ordernow){
    let prodAddElement = {_id: prod._id,
    productName: prod.productName,
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
    rate: prod.rate,
    addontotal:0
   }
        if(event){
          this.addtoCartProduct.push(prodAddElement)
          if(ordernow){
            this.letStart(this.addtoCartProduct)
          }
        } else {
          let index = _.findIndex(this.addtoCartProduct, function(o) { return o.prodName.toUpperCase() === prod.productName.toUpperCase() });
          if(index !== -1){
            this.addtoCartProduct.splice(index,1)
          }
        }
  }
 
  muteStream(){
    this.status = true
  }

  letStart(prod){
    sessionStorage.setItem( "CartProducts", JSON.stringify(this.addtoCartProduct))
    this._router.navigate(['/cart'])
  } 




}
