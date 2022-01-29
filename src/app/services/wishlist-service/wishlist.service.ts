import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  token:any;
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  constructor(private httpService:HttpService) { }

  AddToWishlist(reqData:any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.PostService(this.baseUrl+'bookstore_user/add_wish_list/'+reqData.product_id, reqData,true, httpOptions);
  }
}
