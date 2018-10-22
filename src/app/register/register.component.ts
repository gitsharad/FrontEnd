import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 registerUserData =  {}
  constructor(private _authservice: AuthService, private _router: Router) { 

  }
 
  ngOnInit() {

  }
 registerUser(){
   this._authservice.registerUser(this.registerUserData)
    .subscribe(res =>{ 
      localStorage.setItem('token',res.token)
      this._router.navigate(['/profile'])
    },
   err => console.log(err))
 }
}
