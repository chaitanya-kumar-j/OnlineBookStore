import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    
  token:any;
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  constructor(private httpService:HttpService) { }

  AddToCart(reqData:any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.PostService(this.baseUrl+'bookstore_user/add_cart_item/'+reqData.product_id, reqData,true, httpOptions);
  }

  GetAllCartItems() {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.GetService(this.baseUrl+'bookstore_user/get_cart_items',true, httpOptions);
  }

  UpdateCart(cartItem_id:any,reqData: any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.PutService(this.baseUrl+'bookstore_user/cart_item_quantity/'+cartItem_id, reqData,true, httpOptions);
  }

  DeleteCart(cartItemId: any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.DeleteService(this.baseUrl+'bookstore_user/remove_cart_item/'+cartItemId,true, httpOptions);
  }

  
}
