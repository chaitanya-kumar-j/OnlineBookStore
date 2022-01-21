import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  LoginForm!:FormGroup;
  hide:boolean=true;
  
  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      service: "advance"
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#b0acac';
  }

  Login(){
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value)
      let reqData = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password,
      }
      this.userService.UserLogin(reqData).subscribe((response: any) => {
        console.log(response);
          this.router.navigateByUrl('/home')
      }
      )
    }
  }

}
