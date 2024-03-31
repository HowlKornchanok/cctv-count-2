import { Component, OnInit } from '@angular/core';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { SidebarMenu2Component } from './sidebar-menu-2/sidebar-menu-2.component';
import { Menu2Service } from '../../services/menu2.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        AngularSvgIconModule,
        SidebarMenuComponent,
        RouterLink,
        SidebarMenu2Component
    ],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;
  currentLanguage: string = 'th';
  translations = this.languageService.translations

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
  constructor( public menuService: MenuService ,public menu2Service: Menu2Service , private router: Router, private languageService: LanguageService) {}



  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }


}
