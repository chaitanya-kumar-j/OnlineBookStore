import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  

  private cartSource = new BehaviorSubject([
    {
        "product_id": {},
        "quantityToBuy": 1,
        "_id": "62011ee3145c49000eb5acfe",
        "user_id": {
            "address": [
                {
                  "addressType": "Home"
                }
            ],
        },
    }
  ]);
 
  private isFromCartSource = new BehaviorSubject(false);
  private isFromAdminSource = new BehaviorSubject(false);

  Cart = this.cartSource.asObservable();
  isFromCart = this.isFromCartSource.asObservable();
  isFromAdmin = this.isFromAdminSource.asObservable();
  constructor() { }

  changeCart(Cart: any) {
    this.cartSource.next(Cart)
  }

  changeIsFromCart(value:boolean){
    this.isFromCartSource.next(value);
  }

  changeIsFromAdmin(value:boolean){
    this.isFromAdminSource.next(value);
  }
}
