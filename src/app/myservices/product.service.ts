import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class ProductService {
 private _host = "http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/"
 // private _host = "http://localhost:3000/"
  private _productUrl = this._host + "api/products"

  constructor(private http: HttpClient,private _router: Router) { }
  getProducts(type){
    const params = new HttpParams()
          .set('type', type)
    return this.http.get<any>(this._productUrl,{params})
  }
}
