import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-service/admin.service';
import { DataShareService } from '../../services/data-share-service/data-share.service';
import { UserService } from '../../services/user-service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm!:FormGroup;
  hide:boolean=true;
  isAdminForm = false;
  isFromAdmin:any;
  isFromAdminSubscription!:Subscription;
  
  constructor(
    private elementRef: ElementRef, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private router:Router, 
    private adminService: AdminService,
    private dataShareService: DataShareService,
    ) { }

  ngOnInit(): void {
    this.isFromAdminSubscription = this.dataShareService.isFromAdmin.subscribe(data =>this.isFromAdmin=data)
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      service: "advance"
    });
  }

  // ngAfterViewInit() {
  //   this.elementRef.nativeElement.ownerDocument
  //     .body.style.backgroundColor = '#b0acac';
  // }

  ChangeToAdmin(){
    this.dataShareService.changeIsFromAdmin(true);
  }

  ChangeToUser(){
    this.dataShareService.changeIsFromAdmin(false);
  }

  UserLogin(){
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value)
      let reqData = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password,
      }
      this.userService.UserLogin(reqData).subscribe((response: any) => {
        console.log(response);
          localStorage.setItem('token',response.result.accessToken)
          this.router.navigateByUrl('/user')
      }
      )
    }
  }

  AdminLogin(){
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value)
      let reqData = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password,
      }
      this.adminService.AdminLogin(reqData).subscribe((response: any) => {
        console.log(response);
          localStorage.setItem('token',response.result.accessToken)
          this.router.navigateByUrl('/admin')
      }
      )
    }
  }

}
