import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastrServiceService } from "../toastr-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profileData = {
    email: "",
    website:"",
    companyname:"",
    fname:"",
    lname:"",
    phone:""
  }
  changePassData = {
    newPassword: "",
    currentPassword:""
  }
  constructor(private authService: AuthService, private _router: Router, public toastr: ToastrServiceService) { }

  ngOnInit() {
    this.getProfileData()
  }
  getProfileData(){
    this.authService.getProfile(localStorage.getItem('email')).subscribe(
      res => { 
        this.profileData = res
        console.log('profileData',this.profileData)
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
}

setProfileData(profileData){
  var updateData = profileData
  delete updateData.password
  delete updateData.userType

  this.authService.setProfileData(updateData).subscribe(
    res => { 
      this.toastr.Success("profile Updated Successfully !","Success")
   },
    err => {
      console.log('err',err)
      this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
    }
  )
}

changePassword(changePassData){
  changePassData.email = this.profileData.email

 this.authService.changePassword(changePassData).subscribe(
    res => { 
      this.toastr.Success("password changed Successfully !","Success")
   },
    err => {
      console.log('err',err)
      this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
    }
  )
}
}
