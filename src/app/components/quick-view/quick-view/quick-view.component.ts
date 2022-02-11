import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback-service/feedback.service';
import { WishlistService } from '../../../services/wishlist-service/wishlist.service';
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
  feedbackForm! : FormGroup;
  reviews: any;
  rating:any;
  clickedRating=0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private booksService: BooksService, private cartService: CartService, 
    private wishlistService:WishlistService, private feedbackService: FeedbackService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.params['bookId'];
    this.GetBook(this.bookId);
    this.GetCount(this.bookId);
    this.GetAllReviews(this.bookId);
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', [Validators.required]]
    });
  }

  ShowNumber(unStar:any){
    console.log(unStar)
    this.clickedRating = unStar;
  }

  GetBook(bookId: any) {
    console.log(bookId)
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

  GetAllReviews(bookId: any) {
    let reqData = {
      product_id: this.bookId,
    }
    this.feedbackService.GetAllReviews(reqData).subscribe((res: any) => {
      console.log(res)
      this.reviews = res.result;
    }, err => {
      console.log(err.message);
    })
  }

  SubmitFeedback(){
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value)
      let reqData = {
        comment: this.feedbackForm.value.feedback,
        rating: this.clickedRating,
      }
      this.feedbackService.SubmitFeedback(this.bookId,reqData).subscribe((response: any) => {
        console.log(response);
          this.router.navigateByUrl('/').then(()=>{
            this.router.navigateByUrl('/user/home/'+this.bookId)
          })
      }
      )
    }
  }
}
