import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { HcHistoryComponent } from 'src/app/components/upload/hc-history/hc-history.component';
import { HcActualComponent } from 'src/app/components/upload/hc-actual/hc-actual.component';
import { CostCaseComponent } from 'src/app/components/upload/cost-case/cost-case.component';
import { HcUpdateComponent } from 'src/app/components/upload/hc-update/hc-update.component';

const routes: Routes = [
  { path: 'hc-history', component: HcHistoryComponent,canActivate: [AuthGuardService] },
  { path: 'hc-actual', component: HcActualComponent ,canActivate: [AuthGuardService] },
  { path: 'cost-case', component: CostCaseComponent ,canActivate: [AuthGuardService] },
  { path: 'hc-update', component: HcUpdateComponent ,canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }