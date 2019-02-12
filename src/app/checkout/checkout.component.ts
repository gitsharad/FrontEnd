import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public cartProducts
public addonProducts
  constructor() { }
 
  addAddon(event,index,cartindex,oinfoIndex){
   if(event.checked){
    this.cartProducts[cartindex].otherInfo[oinfoIndex].addonInfo.push({
      "name": event.name,
      "value": event.value
    })
  } else {
    this.cartProducts[cartindex].otherInfo[oinfoIndex].addonInfo.splice(index,1)
  }
    sessionStorage.setItem("CartProducts", JSON.stringify(this.cartProducts)) 
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
  }

}
