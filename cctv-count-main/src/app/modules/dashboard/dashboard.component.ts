import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ValidateService } from 'src/app/core/guards/validate.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [RouterOutlet],
    providers: [ValidateService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private checkTokenSubscription!: Subscription;

  constructor(
      private router: Router,
      private validateService: ValidateService
  ) {}

  ngOnInit(): void {
      // Check token expiry status every 10 seconds
      this.checkTokenSubscription = interval(10000).subscribe(() => {
          this.checkTokenExpiry();
      });
  }

  ngOnDestroy(): void {

  }

  private checkTokenExpiry(): void {
      const token = sessionStorage.getItem('accessToken'); // Retrieve token from session 
      if (token) {
          const isExpired = this.validateService.isTokenExpired(token);
          if (isExpired) {
              console.log('Token has expired');
              sessionStorage.removeItem('accessToken');
              sessionStorage.removeItem('userData');
              // Redirect to the login page
              this.router.navigate(['/auth/sign-in']);
          } else {

              // Token is still valid
          }
      } else {
          console.log('Token not found in session storage');
          // Token not found, handle accordingly
          this.router.navigate(['/auth/sign-in']); // Redirect to login page
      }
  }
}
