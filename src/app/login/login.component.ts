import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {}
  constructor(private authService: AuthService, private _router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  loginUser(){
   this.authService.loginUser(this.loginUserDetails).subscribe(
     res => { 
      localStorage.setItem('token',res.token)
      this._router.navigate(['/profile'])
      
    },
     err => {
       console.log('error',err)
       this.toastr.error(err, 'Oops!');
     }
   )
  }

}
