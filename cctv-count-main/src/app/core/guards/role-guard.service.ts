import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check user role from session storage
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      // Check if the user's role is 'admin' (role === 1)
      if (user.role === 1) {
        return true; // Allow access to the route
      } else {
        alert('You do not have permission to access this page.');
        this.router.navigate(['/dashboard']); // Redirect to dashboard or another page
        return false;
      }
    }
    // If user data is not found, redirect to login page
    this.router.navigate(['/auth/sign-in']);
    return false;
  }
}
