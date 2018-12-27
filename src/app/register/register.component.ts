import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from "@angular/router";
import { ToastrServiceService } from "../toastr-service.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registerUserData =  {
   email:"",
   password:"",
   userType:""
 }
  constructor(private _authservice: AuthService, private _router: Router, public toastr: ToastrServiceService) { 

  }
 
  ngOnInit() {

  }
 registerUser(){
  if(this.registerUserData.email.length === 0){
    this.toastr.Error("Email Should Not Be Empty")
    return 
  } else if(this.registerUserData.password.length === 0){
    this.toastr.Error("Password Should Not Be Empty")
    return
  } else if(this.registerUserData.userType.length === 0){
    this.toastr.Error("Please Select UserType")
    return
  } 
   this._authservice.registerUser(this.registerUserData)
    .subscribe(res =>{ 
      localStorage.setItem('token',res.token)
      localStorage.setItem('email' ,this.registerUserData.email)
      this._router.navigate(['/profile'])
    },
   err => {this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)}
   
   )
 }
}
