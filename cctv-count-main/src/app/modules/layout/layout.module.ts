import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';
import { AuthService } from 'src/app/core/guards/auth.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

@NgModule({
  imports: [LayoutRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot()],
  providers: [AuthService , AuthGuardService]
})
export class LayoutModule {}
