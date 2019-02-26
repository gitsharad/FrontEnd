import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { ConfigService } from '../config.service';

@Injectable()
export class ProductService {
  private _host = this._config.configuration.host
  private _productUrl = this._host + "products"

  constructor(private http: HttpClient,private _router: Router, private _config: ConfigService) { }
  getProducts(type){
    const params = new HttpParams()
          .set('type', type)
    return this.http.get<any>(this._productUrl,{params})
  }
}
