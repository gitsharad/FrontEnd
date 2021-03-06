import { Component, OnInit } from '@angular/core';
import { ProductService } from "../myservices/product.service";
import { ToastrServiceService } from "../toastr-service.service";
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ConfigService } from '../config.service';
import { config } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, public toastr: ToastrServiceService, private _router: Router,
    private _config: ConfigService) { }
  public productData
  public status
  public projectDetails = {}
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

    let prodAddElement = {
    _id: prod._id,
    productName: prod.productName,
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
    sessionStorage.setItem( "CartProducts", JSON.stringify({'productList':this.addtoCartProduct,
       "projectName":"",
       "projectDelivery": this._config.configuration.defaultProductValues.projectDelivery     }))
    this._router.navigate(['/cart'])
  } 

}
