import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/guards/auth.service';
import { ValidateService } from 'src/app/core/guards/validate.service';
import { UserService } from 'src/app/core/guards/user.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
        NgClass,
        NgIf,
        
    ],
    providers:[AuthService,ValidateService,UserService]
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  passwordTextType = false;
  userData: any;
  responseMsg: string = ''; // Variable to hold response message

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    const { user, password } = this.form.value;

    this.authService.login(user, password).subscribe(
        response => {
            if (response.status === 200) {
                sessionStorage.setItem('accessToken', response.msg);
                this.getUserInfo(user);
                this.router.navigate(['/dashboard/main']);
            } else {
                this.responseMsg = response.msg;
            }
        },
        error => {
            console.error('Login error', error);
            this.responseMsg = 'Error: ' + error.message;
        }
    );
  }

  private getUserInfo(username: string) {
    this.userService.getUserInfo(username).subscribe(
        userData => {
            const userInfo = userData.msg; 
            const filteredUserInfo = userInfo.filter((user: any) => user.user_name === username);

            sessionStorage.setItem('userID',filteredUserInfo[0].id);
            sessionStorage.setItem('uname',filteredUserInfo[0].user_name);
            sessionStorage.setItem('role',filteredUserInfo[0].role);
        },
        error => {
            console.error('Error fetching user info:', error);
        }
    );
  }
}