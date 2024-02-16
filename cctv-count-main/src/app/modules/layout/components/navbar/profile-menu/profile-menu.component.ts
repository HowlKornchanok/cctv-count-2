import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { LanguageService } from 'src/app/core/services/language.service';
import { AuthService } from 'src/app/core/guards/auth.service';
import { JwtService } from 'src/app/core/guards/jwt.service';

@Component({
    selector: 'app-profile-menu',
    templateUrl: './profile-menu.component.html',
    styleUrls: ['./profile-menu.component.scss'],
    standalone: true,
    imports: [
        ClickOutsideDirective,
        NgClass,
        RouterLink,
        CommonModule
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
    private authService: AuthService,
    private jwtService: JwtService
    ) {}

  toggleLanguage() {
    this.languageService.toggleLanguage();
    
  }

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.jwtService.decodeBase64(token);
      this.username = tokenPayload.username; // Assign username instead of userId
      this.userRole = tokenPayload.role;
      console.log(this.username); // Log username instead of userId
      console.log(this.userRole);
    }
  }
  

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.currentLanguage = this.languageService.getCurrentLanguage()
    console.log(this.currentLanguage)
  }

}
