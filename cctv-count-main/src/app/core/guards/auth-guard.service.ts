import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the user is authenticated
    const isAuthenticated = !!sessionStorage.getItem('accessToken'); // Check if access token exists in session storage
    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      // If user is not authenticated, redirect to the sign-in page with return URL
      this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
