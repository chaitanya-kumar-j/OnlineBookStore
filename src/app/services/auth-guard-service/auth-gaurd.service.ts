import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor() { }

  gettoken() {
    // console.log(localStorage.getItem("token"));
    
    return !!localStorage.getItem("token");
  }
  
}
