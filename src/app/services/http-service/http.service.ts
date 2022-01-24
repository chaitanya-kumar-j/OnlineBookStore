import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  PostService(url:string,payload:any,token:boolean=false,httpOptions:any){
    console.log(url,payload)
    return this.httpClient.post(url, payload, httpOptions)
  }

  GetService(url:string,token:boolean=false,httpOptions:any){
    console.log(url)
    return this.httpClient.get(url, token&&httpOptions)
  }
}
