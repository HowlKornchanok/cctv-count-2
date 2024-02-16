import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent} from './pages/analytics/analytics.component';
import { MainComponent } from './pages/main/main.component';
import { HistoryComponent } from './pages/history/history.component';
import { SettingComponent } from './pages/setting/setting.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

const routes: Routes = [
  
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'history', component:HistoryComponent},
      { path: 'setting', 
        component: SettingComponent, 
        canActivate: [AuthGuardService], 
        data: { roles: ['admin'] } 
      },
      { path: '**', redirectTo: 'error/404' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
