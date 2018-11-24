import { Component, OnInit } from '@angular/core';
import { ProductService } from "../myservices/product.service";
import { ToastrServiceService } from "../toastr-service.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, public toastr: ToastrServiceService) { }
  public productData
  ngOnInit() {
    this.getProducts()
  }
  public prod

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

   letStart(prod){
     console.log('prod',prod)
    sessionStorage.setItem( "prod", prod );
  } 




}
