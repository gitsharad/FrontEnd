import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastrServiceService } from "../toastr-service.service";
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profileData = {
    email: "",
    newpassword: "",
    password:"",
    website:"",
    companyname:"",
    fname:"",
    lname:"",
    phone:""
  }
  constructor(private authService: AuthService, private _router: Router, public toastr: ToastrServiceService) { }

  ngOnInit() {
    this.getProfileData()
  }
  getProfileData(){
    this.authService.getProfile('ssspawar25@gmail.com').subscribe(
      res => { 
        this.profileData = res
        
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
}

setProfileData(profileData){
  this.authService.setProfileData(profileData).subscribe(
    res => { 
      this.toastr.Success("profile Updated Successfully !","Success")
   },
    err => {
      console.log('err',err)
      this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
    }
  )
}
}
