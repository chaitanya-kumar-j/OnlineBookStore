import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-add-or-update',
  templateUrl: './add-or-update.component.html',
  styleUrls: ['./add-or-update.component.scss']
})
export class AddOrUpdateComponent implements OnInit {

  AddOrUpdateForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    if (data?.Book != null) {
      console.log(data?.Book['Title'])
    }
  }

  ngOnInit(): void {
    this.AddOrUpdateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      actualPrice: ['', [Validators.required]],
      discountPrice: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    if (this.data?.Book != null) {
      this.AddOrUpdateForm.patchValue({
        title: this.data?.Book['Title'],
        author: this.data?.Book['Author'],
        imageUrl: this.data?.Book['BookImage'],
        description: this.data?.Book['Description'],
        discountPrice: this.data?.Book['DiscountPrice'],
        actualPrice: this.data?.Book['Price'],
        stock: this.data?.Book['Stock']
      })
    }
  }

  AddOrUpdate() {
    if (this.AddOrUpdateForm.valid) {
      console.log(this.AddOrUpdateForm.value)
      let reqData = {
        bookName: this.AddOrUpdateForm.value.title,
        author: this.AddOrUpdateForm.value.author,
        description: this.AddOrUpdateForm.value.description,
        quantity: this.AddOrUpdateForm.value.stock,
        price: parseInt(this.AddOrUpdateForm.value.actualPrice),
        discountPrice: parseInt(this.AddOrUpdateForm.value.discountPrice),
      }
      if (this.data.isAddBook) {
        console.log(reqData);
        this.adminService.AddBook(reqData).subscribe((response: any) => {
          console.log(response);
          this.router.navigateByUrl('/').then(() => {
            this.router.navigateByUrl('/admin')
          });
        })
      }
      else {
        console.log(this.data.Book)
        this.adminService.UpdateBook(this.data.Book["id"], reqData).subscribe((response: any) => {
          console.log(response);
          this.router.navigateByUrl('/').then(() => {
            this.router.navigateByUrl('/admin')
          });
        })
      }
    }
  }

}
