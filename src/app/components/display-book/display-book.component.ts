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
  searchTextSubscription!:Subscription;
  searchText:any;
  filterMetadata = { count: 0 };
  constructor(private dataShareService: DataShareService) { }

  ngOnInit(): void {

    this.isFromCartSubscription = this.dataShareService.isFromCart?.subscribe((data: any) => this.isFromCart = data)
    this.searchTextSubscription = this.dataShareService.searchText.subscribe(text => this.searchText = text)
    // this.filterMetadata.count = this.GetAllBooksArray?.length;
    console.log(this.GetAllBooksArray, this.searchText)
  }

  ngOnDestroy() {
    this.isFromCartSubscription.unsubscribe();
    this.searchTextSubscription.unsubscribe();
  }

  Decrement(){

  }

  Increment() {

  }

  AddToWishlist(){

  }

}
