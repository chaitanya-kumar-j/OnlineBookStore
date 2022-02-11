import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service/admin.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddOrUpdateComponent } from '../add-or-update/add-or-update.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  isShow= false;
  Orders:any = [];
  AllBooks:any;
  BookData:any;
  count = 0;
  isAddBook:any;
  displayedColumns: string[] = ['Sno', 'BookImage', 'Author', 'Title', 'Description', 'DiscountPrice', 'Price', 'Stock', 'Actions'];

  constructor(private adminService:AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllBooks();
  }

  GetAllBooks(){
    this.adminService.GetAllBooks().subscribe((res: any) => {
      console.log(res);
      this.AllBooks = res.result;
      console.log(this.AllBooks);
      this.BookData = new Array;
      for (let element of this.AllBooks){
        this.count++;
        let a = {
          Sno : this.count,
          BookImage : element.bookImage,
          Author : element.author,
          Title : element.bookName,
          Description : element.description,
          DiscountPrice : element.discountPrice,
          Price : element.price,
          Stock : element.quantity,
        }
        this.BookData.push(a);
      }
      console.log(this.BookData);
      // this.dataShareService.changeCart(this.Cart)
    }, err => {
      console.log(err.message);
    })
  }

  AddBook(){
    const dialogRef = this.dialog.open(AddOrUpdateComponent, {
      data: {Book:null, isAddBook: true},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  DeleteBook(book:any){

  }

  EditBook(book:any){
    const dialogRef = this.dialog.open(AddOrUpdateComponent, {
      data: {Book:book, isAddBook: false},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
