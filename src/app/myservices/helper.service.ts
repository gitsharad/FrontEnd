import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  // private _host = "http://globalcontentwriters.com/api/"
 // private _host = "http://localhost:3000/api/"
  
  constructor() { }
  public config = {
    _host:"http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/api/",
    _currency:'$'
  }
}
