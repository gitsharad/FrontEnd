import { Component, OnInit } from '@angular/core';
import { ProductService } from "../myservices/product.service";
import { ToastrServiceService } from "../toastr-service.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, public toastr: ToastrServiceService, private _router: Router) { }
  public productData
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
  onChangeCategory(event,prod){
        if(event){
          this.addtoCartProduct.push(prod)
        } else {
          let index = this.addtoCartProduct.indexOf(prod);
          this.addtoCartProduct.splice(index,1);
        }
  }

  letStart(prod){
    sessionStorage.setItem( "addtoCartProducts", this.addtoCartProduct.toString())
    this._router.navigate(['/cart'])
  } 




}
