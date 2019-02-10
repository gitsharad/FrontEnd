import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    private _host = "http://ec2-52-15-233-183.us-east-2.compute.amazonaws.com:3000/api/"
  // private _host = "http://globalcontentwriters.com/api/"
 // private _host = "http://localhost:3000/api/"
  private _registerUrl = this._host + "register"
  private _loginUrl = this._host + "login"
  private _profileUrl = this._host + "profile"
  private _changePassUrl = this._host + "changepassword"
  constructor(private http: HttpClient,private _router: Router) { }
   
  registerUser(user){
   return this.http.post<any>(this._registerUrl, user)
  }
  
  getProfile(email){
    const params = new HttpParams()
          .set('email', email)
    return this.http.get<any>(this._profileUrl, {params})
  }

  
  setProfileData(profileData){
    return this.http.post<any>(this._profileUrl, profileData)
   }

  loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
   }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(["/login"])
  }
  

  getToken(){
    return localStorage.getItem('token')
  }

  changePassword(changePassData){
    return this.http.post<any>(this._changePassUrl, changePassData)
  }
}
 