import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { LanguageService } from 'src/app/core/services/language.service';
import { SignoutService } from 'src/app/core/guards/signout.service';
@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        NgClass,
        RouterLink,
        CommonModule,
    ],
    
})
export class ProfileMenuComponent implements OnInit {
    public isMenuOpen = false;
    currentLanguage: string = 'th';
    translations = this.languageService.translations;
    username: string = '';
    userRole: string = '';

    constructor(
      public languageService: LanguageService,
      private router: Router,
      private signoutService: SignoutService
  ) {}

    toggleLanguage() {
        this.languageService.toggleLanguage();  
    }

    ngOnInit(): void {
      this.currentLanguage = this.languageService.getCurrentLanguage();
        
        // Retrieve user data from session storage

    }

    public toggleMenu(): void {
      
        this.isMenuOpen = !this.isMenuOpen;
        this.currentLanguage = this.languageService.getCurrentLanguage();
        const userData = sessionStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          this.username = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 'User';
          // Assuming userRole is available in user data
          this.userRole = user.role === 1 ? 'Admin' : 'Normal User';
        } else {
          this.username = 'User';
        }
    }

    logout(): void {
      this.signoutService.logout(); // Utilize the signout service for logging out
  }

}
