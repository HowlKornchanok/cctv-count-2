import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { SignoutService } from 'src/app/core/guards/signout.service';
import { ValidateService } from 'src/app/core/guards/validate.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/guards/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [ValidateService, SignoutService, AuthService]
})
export class DashboardComponent {
  
}
