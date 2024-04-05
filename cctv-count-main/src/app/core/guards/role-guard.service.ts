import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check user role from session storage
    const userRole =  sessionStorage.getItem('role');

    if (userRole) {
      const roleNumber = parseInt(userRole, 10); // Parse the user role as a number
      if (roleNumber === 1) {
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

