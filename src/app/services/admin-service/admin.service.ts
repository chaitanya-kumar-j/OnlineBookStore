import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
      
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  token: any;
  constructor(private httpService: HttpService) { }

  AdminLogin(reqData: any) {
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json'
        })
    }
    console.log(reqData)
    return this.httpService.PostService(this.baseUrl+'bookstore_user/admin/login',reqData,false,httpOptions)
  }

  AdminSignup(reqData: any) {
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json'
        })
    }
    console.log(reqData)
    return this.httpService.PostService(this.baseUrl+'bookstore_user/admin/registration',reqData,false,httpOptions)
  }

  GetAllBooks() {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.GetService(this.baseUrl+'bookstore_user/get/book',true, httpOptions);
  }

  AddBook(reqData: any) {
    this.token = localStorage.getItem('token');
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'x-access-token': this.token
        })
    }
    console.log(reqData)
    return this.httpService.PostService(this.baseUrl+'bookstore_user/admin/add/book',reqData,true,httpOptions)
  }

  UpdateBook(bookId:any,reqData: any) {
    this.token = localStorage.getItem('token');
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'x-access-token': this.token
        })
    }
    console.log(bookId,reqData)
    return this.httpService.PutService(this.baseUrl+'bookstore_user/admin/update/book/'+bookId,reqData,true,httpOptions)
  }

  DeleteBook(book: any) {
    this.token = localStorage.getItem('token');
    let httpOptions={
      headers: new HttpHeaders ({
        'Content-Type':'application/json',
        'x-access-token': this.token
        })
    }
    console.log(book.id)
    return this.httpService.DeleteService(this.baseUrl+'bookstore_user/admin/delete/book/'+book.id,true,httpOptions)
  }
}
