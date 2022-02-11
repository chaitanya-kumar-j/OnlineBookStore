import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  token: any;
  
  constructor(private httpService:HttpService) { }

  UserSignup(reqData:any) {
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json'
        })
    }
    console.log(reqData)
    return this.httpService.PostService(this.baseUrl+'bookstore_user/registration',reqData,false,httpOptions)
  }

  UserLogin(reqData: any) {
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json'
        })
    }
    console.log(reqData)
    return this.httpService.PostService(this.baseUrl+'bookstore_user/login',reqData,true,httpOptions)
  }

  UpdateAddress(reqData: any) {
    this.token = localStorage.getItem('token');
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'x-access-token': this.token
        })
    }
    console.log(reqData)
    return this.httpService.PutService(this.baseUrl+'bookstore_user/edit_user',reqData,true,httpOptions)
  }
}
