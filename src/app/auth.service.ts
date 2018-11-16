import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  // private _host = "http://ec2-18-191-94-112.us-east-2.compute.amazonaws.com:3000/"
  private _host = "http://localhost:3000/"
  private _registerUrl = this._host + "api/register"
  private _loginUrl = this._host + "api/login"
  private _profileUrl = this._host + "api/profile"
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
}
 