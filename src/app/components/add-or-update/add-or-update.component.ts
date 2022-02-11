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

  AddOrUpdateForm!:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
    ) {
      if(data?.Book != null){
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
  }

  AddOrUpdate(){
    if (this.AddOrUpdateForm.valid) {
      console.log(this.AddOrUpdateForm.value)
      let reqData = {
        bookName: this.AddOrUpdateForm.value.title,
        author: this.AddOrUpdateForm.value.author,
        description: this.AddOrUpdateForm.value.description,
        quantity: this.AddOrUpdateForm.value.stock,
        price: this.AddOrUpdateForm.value.actualPrice,
        discountPrice: this.AddOrUpdateForm.value.discountPrice,
      }
      if(this.data.isAddBook){
        this.adminService.AddBook(reqData).subscribe((response: any) => {
          console.log(response);
            localStorage.setItem('token',response.result.accessToken)
            this.router.navigateByUrl('/admin')
        })
      }
      else{
        this.adminService.UpdateBook(this.data.Book["_id"],reqData).subscribe((response: any) => {
          console.log(response);
            localStorage.setItem('token',response.result.accessToken)
            this.router.navigateByUrl('/admin')
        })
      }
    }    
  }

}
