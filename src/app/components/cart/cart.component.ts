import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service/cart.service';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { UserService } from '../../services/user-service/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  Cart: any;
  isClickedPlaceOrder: boolean = false;
  addressForm!: FormGroup;
  userAddress:any;
  addressTypes = ['Work', 'Home'];
  addressType:any;
  isUpdatedAddress:boolean=false;
  orderItem:any;
  order: any;
  cartSubscription!: Subscription;

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private userService:UserService, 
    private dataShareService: DataShareService
    ) { }

  ngOnInit(): void {

    this.cartSubscription = this.dataShareService.Cart.subscribe(cart => (this.Cart = cart,
       this.userAddress = cart[0]?.user_id.address[0],
        this.addressType = cart[0]?.user_id.address[0].addressType))
    this.addressForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      fullAddress: ['', [Validators.required]],
      cityOrTownName: ['', [Validators.required]],
      stateName: ['', [Validators.required]]
    })


  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

 

  Delete(cartItemId: any) {
    this.cartService.DeleteCart(cartItemId).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('/').then((res: any) => {
        this.router.navigateByUrl('/user/cart')
      })
    }, err => {
      console.log(err.message);
    })
  }

  UpdateCart(cartItemId: any, quantity: any) {
    if (quantity === 0) {
      this.Delete(cartItemId);
    }
    else {
      let reqData = {
        quantityToBuy: quantity
      }
      this.cartService.UpdateCart(cartItemId, reqData).subscribe((res: any) => {
        console.log(res)
        this.router.navigateByUrl('/').then((res: any) => {
          this.router.navigateByUrl('/user/cart')
        })
      }, err => {
        console.log(err.message);
      })
      
    }
  }

  UpdateAddress() {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value)
      let reqData = {
        addressType:this.addressType,
        fullAddress: this.addressForm.value.fullAddress,
        city: this.addressForm.value.cityOrTownName,
        state: this.addressForm.value.stateName
      }
      this.userService.UpdateAddress(reqData).subscribe((response: any) => {
        console.log(response)
      })
    }
  }

  PlaceOrder(){
    this.order = new Array();
    for (var item of this.Cart) {
      console.log(item);
      this.orderItem = {
        product_id: item.product_id._id,
        product_name: item.product_name,
        product_quantity: item.quantityToBuy,
        product_price: item.product_id.discountPrice
      }
      this.order.push(this.orderItem)
    }
    let reqData = {
      orders: this.order
    }
    this.cartService.PlaceOrder(reqData).subscribe((res: any) => {
      console.log(res)
      for(var item of this.Cart){
        this.Delete(item._id)
      }
    }, err => {
      console.log(err.message);
    })
    
    this.dataShareService.changeIsFromCart(true);
    this.router.navigateByUrl('/').then((res: any) => {
      this.router.navigateByUrl('/user')
    })
  }
}
