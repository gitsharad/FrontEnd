import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {}
  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser(){
   this.authService.loginUser(this.loginUserDetails).subscribe(
     res => { 
      localStorage.setItem('token',res.token)
      this._router.navigate(['/profile'])
      
    },
     err => console.log(err)
   )
  }

}
