import { Component, Input, OnInit } from '@angular/core';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent implements OnInit {

  isFromCartSubscription!:Subscription;
  isAdded:any;
  count:any;
  @Input() GetAllBooksArray:any;
  isFromCart: any;

  constructor(private dataShareService: DataShareService) { }

  ngOnInit(): void {

    this.isFromCartSubscription = this.dataShareService.isFromCart?.subscribe((data: any) => this.isFromCart = data)

    console.log(this.GetAllBooksArray)
  }

  // ngOnDestroy() {
  //   this.isFromCartSubscription.unsubscribe();
  // }

  Decrement(){

  }

  Increment() {

  }

  AddToWishlist(){

  }

}
