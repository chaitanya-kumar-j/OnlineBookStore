import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 
  token:any;
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  constructor(private httpService:HttpService) { }

  GetAllBooks() {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    }
    return this.httpService.GetService(this.baseUrl+'bookstore_user/get/book',true, httpOptions)
  }
}
