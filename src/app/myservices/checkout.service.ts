import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 // private _host = "http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/api/"
 // private _host = "http://globalcontentwriters.com/api/"
  private _host = "http://localhost:3000/api/"
  private _url = this._host + "pay"

  constructor(private _router: Router, private http: HttpClient) { }
  payCheckout(){
    return this.http.post<any>(this._url,{})
  }
}
