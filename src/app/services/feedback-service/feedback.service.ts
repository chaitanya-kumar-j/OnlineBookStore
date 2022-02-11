import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  token: any;
  baseUrl = 'https://bookstore.incubation.bridgelabz.com/';
  

  constructor(private httpService: HttpService) { }

  GetAllReviews(reqData: any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.GetService(this.baseUrl+'bookstore_user/get/feedback/'+reqData.product_id,true, httpOptions);
  }

  SubmitFeedback(product_id:any, reqData:any) {
    this.token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token
      })
    }
    return this.httpService.PostService(this.baseUrl+'bookstore_user/add/feedback/'+product_id,reqData,true, httpOptions);
  }
}
