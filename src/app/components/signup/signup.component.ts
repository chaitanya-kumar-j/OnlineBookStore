import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit, AfterViewInit {

  SignupForm!: FormGroup;
  
  hide:boolean = true;
  constructor(private elementRef: ElementRef, private route: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.SignupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', Validators.required],
      service: "advance"
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#777777';
  }

  Signup() {
    if (this.SignupForm.valid) {
      console.log(this.SignupForm.value)
      let reqData = {
        fullName: this.SignupForm.value.fullName,
        email: this.SignupForm.value.email,
        password: this.SignupForm.value.password,
        phone: this.SignupForm.value.mobileNumber,
        service: this.SignupForm.value.service
      }
      this.userService.UserSignup(reqData).subscribe((response: any) => {
        console.log(response);
      }
      )
    }
  }
}
