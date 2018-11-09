import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastrServiceService } from "../toastr-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {
    email:"",
    password:""
  }
  constructor(private authService: AuthService, private _router: Router, public toastr: ToastrServiceService) {
   
   }

  ngOnInit() {
  }

  loginUser(){
    if(this.loginUserDetails.email.length === 0){
      this.toastr.Error("Email Should Not Be Empty")
      return 
    } else if(this.loginUserDetails.password.length === 0){
      this.toastr.Error("Password Should Not Be Empty")
      return
    }
   this.authService.loginUser(this.loginUserDetails).subscribe(
     res => { 
      localStorage.setItem('token',res.token)
      this._router.navigate(['/profile'])
      
    },
     err => {
       console.log('err',err)
       this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
     }
   )
  }

}
