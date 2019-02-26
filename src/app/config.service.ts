import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

 // private _host = "http://globalcontentwriters.com/api/"
 // private _host = "http://localhost:3000/api/"
  
 constructor() { }
 public configuration = {
   host:"http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/api/",
   currency:'$',
   currencyCode:'USD',
   defaultProductValues:{
    perWordPrice: 0.20,
    Words: 500,
    qty:1,
    titleName:'Title',
    projectDelivery:7
   }
 }
}
