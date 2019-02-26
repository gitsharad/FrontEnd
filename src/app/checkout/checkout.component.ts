import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ConfigService } from '../config.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public cartProducts
public addonProducts
public subtotal
  constructor(private router: Router , private route: ActivatedRoute, private _config: ConfigService) { }
 
  addAddon(event,index,cartindex,oinfoIndex){
   if(event.checked){
    this.cartProducts['productList'][cartindex].otherInfo[oinfoIndex].addonInfo.push({
      "name": event.name,
      "value": event.value
    })
    this.cartProducts['productList'][cartindex].total = parseFloat(this.cartProducts['productList'][cartindex].total) + parseFloat(event.value)
  } else {
    this.cartProducts['productList'][cartindex].otherInfo[oinfoIndex].addonInfo.splice(index,1)
    this.cartProducts['productList'][cartindex].total = parseFloat(this.cartProducts['productList'][cartindex].total) - parseFloat(event.value)
  }
     this.subtotalCalculator(this.cartProducts['productList'])
  }


  subtotalCalculator(data){
    if(!data){
    data =  this.cartProducts['productList']
    }
    this.subtotal =_.sumBy(data, function(o) { return o.total; });
 }

  ngOnInit() {
    this.cartProducts = JSON.parse(sessionStorage.getItem('CartProducts'))
    this.addonProducts = [{
      "name":"FBPost",
      "value":"300"
    },
    {
      "name":"Graphics",
      "value":"500"
    },
    {
      "name":"Email",
      "value":"25"
    },
    {
      "name":"Twitter",
      "value":"40"
    },
    {
      "name":"LinkedIn",
      "value":"40"
    },
    {
      "name":"Insta",
      "value":"50"
    },
    {
      "name":"Other",
      "value":"70"
    }
  ]
  this.subtotalCalculator(this.cartProducts['productList'])
  }

  
  launch() {
    sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts))
    this.router.navigate(['launch']);
  }

}
