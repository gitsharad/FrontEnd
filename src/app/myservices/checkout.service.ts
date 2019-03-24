import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private _host = this._config.configuration.host
  private _url = this._host + "addorder"

  constructor(private _router: Router, private http: HttpClient, private _config: ConfigService) { }
  payCheckout(orderDetails,email){
    const headers = new HttpHeaders().set("email", email);
    let options = {
      headers: headers
         }; 
    return this.http.post<any>(this._url,orderDetails,options)
  }
}
