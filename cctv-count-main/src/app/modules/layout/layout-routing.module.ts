import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthComponent } from '../auth/auth.component';
import { SignInComponent } from '../auth/pages/sign-in/sign-in.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';


const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuardService], // AuthGuard to protect the dashboard rout
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, data: { returnUrl: window.location.pathname } },
      { path: '**', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}