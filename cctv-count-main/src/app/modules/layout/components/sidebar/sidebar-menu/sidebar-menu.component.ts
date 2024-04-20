import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/menu.model';
import { MenuService } from '../../../services/menu.service';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { LanguageService } from 'src/app/core/services/language.service';
import { Router } from '@angular/router';
import { Menu2Service } from '../../../services/menu2.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SignoutService } from 'src/app/core/guards/signout.service';
@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        AngularSvgIconModule,
        NgTemplateOutlet,
        RouterLink,
        RouterLinkActive,
        NgIf,
        SidebarSubmenuComponent,
    ],
})
export class SidebarMenuComponent implements OnInit {

  currentLanguage : string = 'th';
  translations = this.languageService.translations
  

  constructor(
    public menuService: MenuService,
    private languageService: LanguageService,
    public menu2Service: Menu2Service,
    private router: Router,
    public themeService: ThemeService,
    private signoutService: SignoutService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
    
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
    
  }

  logout(): void {
    this.signoutService.logout()
    console.log('User logged out'); 
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }
}