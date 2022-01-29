import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  Cart: any;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.GetCount();
  }

  GetCount() {
    this.cartService.GetAllCartItems().subscribe((res: any) => {
      console.log(res);
      this.Cart = res.result;
      console.log(this.Cart)
    }, err => {
      console.log(err.message);

    })
  }

}
