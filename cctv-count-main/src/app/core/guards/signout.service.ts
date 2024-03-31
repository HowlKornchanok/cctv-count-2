import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignoutService {

  constructor(private router: Router) { }

  logout(): void {
    // Clear session storage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    // Redirect to the login page
    this.router.navigate(['/auth/sign-in']);
    console.log('User logged out');
  }
}
