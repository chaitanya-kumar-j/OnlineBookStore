import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent implements OnInit {

  @Input() GetAllBooksArray:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.GetAllBooksArray)
  }

}
