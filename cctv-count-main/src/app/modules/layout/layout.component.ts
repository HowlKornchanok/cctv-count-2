import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageService } from 'src/app/core/services/language.service';
import { AuthService } from 'src/app/core/guards/auth.service';
import { SignoutService } from 'src/app/core/guards/signout.service';
import { Subscription } from 'rxjs';
import { ValidateService } from 'src/app/core/guards/validate.service';
import { interval } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SidebarComponent, RouterOutlet,NavbarComponent,FooterComponent,CommonModule],
  providers: [LanguageService,AuthService,SignoutService,ValidateService]
})
export class LayoutComponent implements OnInit {
  private mainContent: HTMLElement | null = null;
  currentLanguage : string = 'th';
  translations = this.languageService.translations

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private validateService: ValidateService,
    private authService: AuthService,
    private signoutService: SignoutService
    ) {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }

  ngOnInit(): void {
    this.mainContent = document.getElementById('main-content');
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
    this.checkToken();
  }

  private checkTokenSubscription!: Subscription;
  public displayTokenRefreshModal = false;

  ngOnDestroy(): void {
    if (this.checkTokenSubscription) {
      this.checkTokenSubscription.unsubscribe();
    }
  }

  private checkToken(): void {
    this.checkTokenSubscription = interval(10000).subscribe(() => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        this.router.navigate(['/auth/sign-in']);
        return;
      }

      const isExpired = this.validateService.isTokenExpired(accessToken);
      if (isExpired) {
        this.signoutService.logout();
        setTimeout(() => this.router.navigate(['/auth/sign-in']), 100);
        return;
      }

      const remainingTime = this.validateService.getTimeRemainingBeforeTimeout(accessToken);
      remainingTime.subscribe(time => {
        const remainingMinutes = Math.floor(time / (1000 * 60));
        if (remainingMinutes <= 10) {
          this.displayTokenRefreshModal = true;
        }
      });
    });
  }

  public logout() {
    this.signoutService.logout();
    this.displayTokenRefreshModal = false;
  }

  public refreshToken() {
    this.authService.tokenRefresh().subscribe(
      response => {
        sessionStorage.setItem('accessToken', response.msg);
        window.location.href = 'http://wrp-smarttraffic.com/dashboard/main';
      }
    );
  }
    public closeTokenRefreshModal() {
        this.displayTokenRefreshModal = false;
    }
}


