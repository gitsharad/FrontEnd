import { Component, OnInit } from '@angular/core';
import { ProductService } from '../myservices/product.service';
import { ToastrServiceService } from '../toastr-service.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public cartProducts  = {
  productList:[],
  projectName:"",
  projectDelivery:""
}
public productData 
public default_item
public addonList
public subtotal 
 
  constructor(public productService: ProductService, public toastr: ToastrServiceService , private _router: Router,
     public _config: ConfigService) {
    let temp= {
      _id: 0,
      productName: "",
      qty:this._config.configuration.defaultProductValues.qty,
      total: this._config.configuration.defaultProductValues.Words * this._config.configuration.defaultProductValues.perWordPrice,
      otherInfo:[
        {"name":this._config.configuration.defaultProductValues.titleName,
        "words":this._config.configuration.defaultProductValues.Words,
        "addonInfo":[
         
        ]
        }
      ],
      styleGuide:{
        "audiences":[],
        "industries":[],
        "keywords":"",
        "tones":[],
        "voice":"",
        "thingsToAvoid":"",
        "thingsToMention":"",
        "additionalNotes":"",
        "styleBtnTxt":"Style"
      }
     }
     this.default_item = temp
  }
   
  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('CartProducts'))){
      this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
    }
    this.getProducts('regular')
    this.getProducts('addon')
    this.subtotalCalculator(this.cartProducts['productList'])
  }

  subtotalCalculator(data){
      if(!data){
      data =  this.cartProducts['productList']
      }
      this.subtotal =_.sumBy(data, function(o) { return o.total; });
   }

  additem(){
    let data =  _.find(this.productData,{_id: this.productData[0]._id})
    this.default_item = {
    _id: data._id,
    productName: data.productName,
    qty:this._config.configuration.defaultProductValues.qty,
    total: this._config.configuration.defaultProductValues.Words * this._config.configuration.defaultProductValues.perWordPrice,
    otherInfo:[
      {"name":this._config.configuration.defaultProductValues.titleName,
      "words":this._config.configuration.defaultProductValues.Words,
      "addonInfo":[
       
      ]
      }
    ],
    styleGuide:{
      "audiences":[],
      "industries":[],
      "keywords":"",
      "tones":[],
      "voice":"",
      "thingsToAvoid":"",
      "thingsToMention":"",
      "additionalNotes":"",
      "styleBtnTxt":"Style"
    }
   }
   
   if(!this.cartProducts['productList']){
    this.cartProducts['productList'] = []
   }
    this.cartProducts['productList'].push(this.default_item) 
    this.subtotalCalculator(this.cartProducts['productList'])
    sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts))
    
  }

  removeItem(selectedItem){
    let index = this.cartProducts['productList'].indexOf(selectedItem);
    this.cartProducts['productList'].splice(index,1)
    this.subtotalCalculator(this.cartProducts['productList'])
  }
 
  checkOutItems(checkoutType){
   if(this.validateField()){
      sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts))
      sessionStorage.setItem("checkoutType", checkoutType)
      this._router.navigate(["/checkout"])
   } else {
     return 
   } 
  }

  validateField(){
    if(!this.cartProducts['projectName']){
      this.toastr.Error("OOPs! Project Name is required Field!",'')
      return false
    } else if(!this.cartProducts['projectDelivery']){
      this.toastr.Error("OOPs! Project Delivery is required Field!",'')
      return false
    }
    return true
  }

   getProducts(type){
    this.productService.getProducts(type).subscribe(
      res => { 
        if(type === 'regular'){
          this.productData = res
        } else {
          this.addonList = res 
        }
        
     },
      err => {
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  } 
}
