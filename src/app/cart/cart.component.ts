import { Component, OnInit } from '@angular/core';
import { ProductService } from '../myservices/product.service';
import { ToastrServiceService } from '../toastr-service.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public cartProducts : Array <any> = []
public productData 
public default_item
public addonList
public projectDetails = {}
public subtotal 
 
  constructor(public productService: ProductService, public toastr: ToastrServiceService , private _router: Router) {
    let temp= {
      _id: 0,
      productName: "",
      qty:1,
      addon:'0',
      total:0,
      words:500,
      otherInfo:[
        {"name":"",
        "words":500,
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
      },
      rate: 0
     }
     this.default_item = temp
  }
   
  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('CartProducts'))){
      this.cartProducts =  JSON.parse(sessionStorage.getItem('CartProducts'))
    }
    this.projectDetails = JSON.parse(sessionStorage.getItem('projectDetails'))
    this.getProducts('regular')
    this.getProducts('addon')
    this.subtotalCalculator(this.cartProducts)
  }

  subtotalCalculator(data){
      if(!data){
      data =  this.cartProducts
      }
      this.subtotal =_.sumBy(data, function(o) { return o.total; });
   }

  additem(){
    let data =  _.find(this.productData,{_id: this.productData[0]._id})
    this.default_item = {
    _id: data._id,
    productName: data.productName,
    qty:1,
    total:data.rate * 1,
    otherInfo:[
      {"name":"",
       "words":500,
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
    },
    rate: data.rate
   }
    this.cartProducts.push(this.default_item) 
    sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts))
    
  }

  removeItem(selectedItem){
    let index = this.cartProducts.indexOf(selectedItem);
    this.cartProducts.splice(index,1)
    this.subtotalCalculator(this.cartProducts)
  }
 
  checkOutItems(checkoutType){
   if(this.validateField()){
      sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts))
      sessionStorage.setItem("projectDetails",JSON.stringify(this.projectDetails))
      sessionStorage.setItem("checkoutType", checkoutType)
      this._router.navigate(["/checkout"])
   } else {
     return 
   } 
   
  }

  validateField(){
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
