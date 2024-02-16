import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import {Router,RouterLink,} from '@angular/router';
import { AuthService } from './core/guards/auth.service';
import { AuthGuardService } from './core/guards/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet , RouterLink],
  providers: [AuthGuardService]
})
export class AppComponent {
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService,private router:Router) {}
  ngOnInit() {
    
  }

  
}
