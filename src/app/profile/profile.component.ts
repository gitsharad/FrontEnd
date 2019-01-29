import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { ToastrServiceService } from "../toastr-service.service";
import { CategoriesComponent } from '../categories/categories.component';

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
    phone:"",
    languages:[],
    yearofexp:"",
    highestdegree:"",
    categories: []
  }
  changePassData = {
    newPassword: "",
    currentPassword:""
  }
  constructor(private authService: AuthService, private _router: Router, public toastr: ToastrServiceService) { }

  ngOnInit() {
    this.getProfileData()
  }
  addcategory(category){
    if(category)
    {
      this.profileData.categories.push({"name":category})
    }
  }

  addLanguage(language){
    if(language)
    {
      this.profileData.languages.push({"name":language})
    }
  }

  removelanguage(index){
    this.profileData.languages.splice(index,1)
  }

  removecategory(index){
    this.profileData.categories.splice(index,1)
  }
  getProfileData(){
    this.authService.getProfile(localStorage.getItem('email')).subscribe(
      res => { 
       this.profileData = res
       if(this.profileData.categories.length === 0){
         this.profileData.categories = []
       }
     },
      err => {
        console.log('err',err)
        this.toastr.Error(err.error.ErrorCode,err.error.ErrorMsg)
      }
    )
}

setProfileData(profileData){
  var updateData = profileData
  let temp = updateData.userType
  delete updateData.password
  delete updateData.userType
  
  this.authService.setProfileData(updateData).subscribe(
    res => { 
      this.toastr.Success("profile Updated Successfully!","Success")
      updateData.userType = temp
   },
    err => {
      console.log('err',err)
      updateData.userType = temp
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
