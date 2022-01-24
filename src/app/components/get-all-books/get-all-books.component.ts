import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/booksService/books.service';

@Component({
  selector: 'app-get-all-books',
  templateUrl: './get-all-books.component.html',
  styleUrls: ['./get-all-books.component.scss']
})
export class GetAllBooksComponent implements OnInit {

  BookList:any;
  constructor(private booksService:BooksService) { }

  ngOnInit(): void {
    this.GetAllBooks()
  }

  GetAllBooks(){
    this.booksService.GetAllBooks().subscribe((res: any) => {
      console.log(res);
      this.BookList=res.result;
      // this.BookList.reverse();
      console.log(this.BookList)
    },err =>{
      console.log(err.message);
      
    })
  }

}
