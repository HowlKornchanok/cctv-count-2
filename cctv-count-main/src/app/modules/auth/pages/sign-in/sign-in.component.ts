import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/guards/auth.service';
import { ValidateService } from 'src/app/core/guards/validate.service';

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
    providers:[AuthService,ValidateService]
})
export class SignInComponent {
  form: FormGroup;
  submitted = false;
  passwordTextType = false;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router // Inject Router service
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
                
                // Store username in session storage as "uname"
                sessionStorage.setItem('uname', user);
          
                


                // Redirect to dashboard upon successful login
                this.router.navigate(['/dashboard']);

                // Call the method to fetch user info
                this.getUserInfo(user, password, response.access_token);
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



  getUserInfo(username: string, password: string, token: string) {
    // Call the method from AuthService to get user info
    this.authService.getUserData(username, password, token).subscribe(
        userData => {
            // Handle user info
            const userInfo = userData.msg[0]; // Extracting user info from the response

            // Store user data in session storage
            sessionStorage.setItem('userID', JSON.stringify(userInfo.id));
            sessionStorage.setItem('userData', JSON.stringify(userInfo));

            // Log session storage
            
            // Check if the token has expired
            const isExpired = this.validateService.isTokenExpired(token);
            if (isExpired) {
                // If the token is expired, handle accordingly
                console.log('Token has expired. Please log in again.');
                // For example, you can display a message to the user or redirect them to the login page
            }
        },
        error => {
            // Handle error while fetching user info
            console.error('Error fetching user data', error);
        }
    );
}



}
