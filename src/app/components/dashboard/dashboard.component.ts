import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service/cart.service';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  
  Cart: any;
  isShow:boolean=false;
  cartSubscription!: Subscription;
  searchTextSubscription!:Subscription;
  searchText:any;

  constructor(
    public router:Router,
    private cartService:CartService,
    private dataShareService: DataShareService
    ) { }

  ngOnInit(): void {
    this.GetCart();
    this.cartSubscription = this.dataShareService.Cart.subscribe(cart => this.Cart = cart)
    this.searchTextSubscription = this.dataShareService.searchText.subscribe(text => this.searchText = text)
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.searchTextSubscription.unsubscribe();
  }

  GetCart() {
    this.cartService.GetAllCartItems().subscribe((res: any) => {
      console.log(res);
      this.Cart = res.result;
      console.log(this.Cart, this.searchText);
      this.dataShareService.changeCart(this.Cart)
    }, err => {
      console.log(err.message);
    })
  }

  Logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/home')
  }

  ChangeSearchString(value:any){
    
    console.log(value)
    this.dataShareService.getSearchText(value)
  }
}
