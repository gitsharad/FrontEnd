import { Injectable } from '@angular/core';
declare var toastr: any
@Injectable()
export class ToastrServiceService {

  constructor() { }
  Success(title:string, message?:string){
    toastr.success(title,message)
  }

  Warning(title:string, message?:string){
    toastr.warning(title,message)
  }

  Error(title:string, message?:string){
    toastr.error(title,message)
  }
}
