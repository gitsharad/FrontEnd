import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrServiceService } from '../toastr-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
public forgotpassStatus = true
public token = ''
public loginUserDetails = {
  email:"",
  password:"",
  confirmPassword:""
}
  constructor(private authService: AuthService, private _router: Router,private toastr: ToastrServiceService) { }

  ngOnInit() {
  }

  forgotPassword(){
    this.authService.forgotPassword(this.loginUserDetails.email).subscribe(
      res => { 
       this.forgotpassStatus = false
       console.log('res',res)
       this.token = res
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
   }

  changePassword(){
    this.authService.resetPassword(this.token).subscribe(
      res => { 
        this._router.navigate(["/login"])
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
  }

}
