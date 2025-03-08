import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { HiringFormViewComponent } from 'src/app/components/grb-template/hiring-form-view/hiring-form-view.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { GrbMainTemplateComponent } from 'src/app/components/grb-template/grb-main-template/grb-main-template.component';
import { HrDashboardComponent } from 'src/app/components/dashboard/hr-dashboard/hr-dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate: [AuthGuardService] },
  { path: 'hr-hiring-request', component: HrDashboardComponent,canActivate: [AuthGuardService] },
  { path: 'hireFormView', component: GrbMainTemplateComponent,canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
