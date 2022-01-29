import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist-service/wishlist.service';
import { BooksService } from '../../../services/booksService/books.service';
import { CartService } from '../../../services/cart-service/cart.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit {

  bookId: any;
  Book: any;
  isAdded: boolean = false;
  count: any;
  Cart: any;
  cartItemId:any;
  ChangedImageUrl: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private booksService: BooksService, private cartService: CartService, 
    private wishlistService:WishlistService) { }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.children[0].params['bookId'];
    this.GetBook(this.bookId);
    this.GetCount(this.bookId);
  }



  GetBook(bookId: any) {
    this.booksService.GetAllBooks().subscribe((res: any) => {
      this.Book = res.result.filter((element: any) => {
        return element._id == bookId;
      })[0];
      console.log(this.Book)
      if (this.Book.bookImage == null) {
        this.ChangedImageUrl = "../../../../assets/BookImageMain.jpg"
      }
      else {
        this.ChangedImageUrl = this.Book.bookImage;
      }
    }, err => {
      console.log(err.message);

    })
  }

  GetCount(bookId: any) {
    this.cartService.GetAllCartItems().subscribe((res: any) => {
      console.log(res);
      this.Cart = res.result.filter((element: any) => {
        return element.product_id._id == bookId;
      })[0];
      console.log(this.Cart)
      if (this.Cart == null) {
        this.count = 0;
      }
      else {
        this.isAdded = true;
        this.count = this.Cart.quantityToBuy;
        this.cartItemId = this.Cart._id;
      }
      console.log(this.count)
    }, err => {
      console.log(err.message);

    })
  }

  ChangeImageUrl(bookImageUrl: any) {
    this.ChangedImageUrl = bookImageUrl;
  }

  Increment() {
    console.log('increment')
    this.count += 1;
    if (this.count === 1) {
      let reqData = {
        product_id: this.bookId,
      }
      this.cartService.AddToCart(reqData).subscribe((res: any) => {
        console.log(res)
      }, err => {
        console.log(err.message);
      })

    }
    else {
      this.UpdateCart();
    }
  }
  UpdateCart() {
    let reqData = {
      quantityToBuy: this.count
    }
    this.cartService.UpdateCart(this.cartItemId, reqData).subscribe((res: any) => {
      console.log(res)
    }, err => {
      console.log(err.message);
    })
  }

  Decrement() {
    this.count -= 1;
    if (this.count === 0) {
      this.isAdded = false;
      this.cartService.DeleteCart(this.cartItemId).subscribe((res: any) => {
        console.log(res)
      }, err => {
        console.log(err.message);

      })
    }
    else {
      this.UpdateCart();
    }
  }

  AddToWishlist(){
    let reqData = {
      product_id: this.bookId,
    }
    this.wishlistService.AddToWishlist(reqData).subscribe((res: any) => {
      console.log(res)
    }, err => {
      console.log(err.message);
    })
  }
}
