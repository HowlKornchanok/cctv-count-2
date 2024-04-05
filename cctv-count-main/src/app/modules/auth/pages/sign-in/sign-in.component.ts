import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
        RouterLink,
        AngularSvgIconModule,
        NgClass,
        NgIf,
        
    ],
    providers:[AuthService,ValidateService,UserService]
})
export class SignInComponent {
  form: FormGroup;
  submitted = false;
  passwordTextType = false;
  userData: any;

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

    // Call the login method from AuthService
    this.authService.login(user, password).subscribe(
        response => {
            // Handle successful login response

            if (response.status === 200) {
                // Store token in session storage
                sessionStorage.setItem('accessToken', response.msg);
                
                
                // Redirect to dashboard upon successful login
                this.router.navigate(['/dashboard']);

                // Call the method to fetch user info
                this.getUserInfo(user);
                console.log(sessionStorage);
            } else {
                // Handle other scenarios if needed

            }
        },
        error => {
            // Handle login error
            console.error('Login error', error);
            // Display error message to the user
            alert('Incorrect Password');
        }
    );
  }



  private getUserInfo(username: string) {
    // Call the method from UserService to get user info
    this.userService.getUserInfo(username).subscribe(
        userData => {
            // Handle user info
            const userInfo = userData.msg; 
            
            // Filter out the user objects where the user_name matches the username
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
