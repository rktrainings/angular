import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IotBaseComponent } from 'src/app/components/approval-center/iot-base/iot-base.component';
import { BoardComponent } from 'src/app/components/approval-center/board/board.component';
import { BizopsComponent } from 'src/app/components/approval-center/bizops/bizops.component';
import { CostCaseComponent } from 'src/app/components/approval-center/tolls/cost-case/cost-case.component';
import { BandMixComponent } from 'src/app/components/approval-center/tolls/band-mix/band-mix.component';
import { UteComponent } from 'src/app/components/approval-center/tolls/ute/ute.component';
import { OrpComponent } from 'src/app/components/approval-center/tolls/orp/orp.component';
import { GrbMainTemplateComponent } from 'src/app/components/grb-template/grb-main-template/grb-main-template.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SwapTemplateComponent } from 'src/app/components/approval-center/swap/swap-template/swap-template.component';
import { ApprovalGrbComponent } from 'src/app/components/approval-center/grb/approval-grb/approval-grb.component';
import { CostCaseApprovalComponent } from 'src/app/components/approval-center/cost-case/cost-case-approval/cost-case-approval.component';
import { CostCaseSubmittedComponent } from 'src/app/components/approval-center/cost-case/cost-case-submitted/cost-case-submitted.component';
import { EarlyAttritionComponent } from 'src/app/components/approval-center/early-attrition/early-attrition.component';
import { CiReleaseViewComponent } from 'src/app/components/approval-center/ci-release/ci-release-view/ci-release-view.component';
import { CiReleasePendingComponent } from 'src/app/components/approval-center/ci-release/ci-release-pending/ci-release-pending.component';

const routes: Routes = [
  { path: 'iot', component: IotBaseComponent,canActivate: [AuthGuardService] },
  { path: 'board', component: BoardComponent,canActivate: [AuthGuardService] },
  { path: 'bizops', component: BizopsComponent,canActivate: [AuthGuardService] },
  { path: 'hire-request/cc', component: CostCaseComponent,canActivate: [AuthGuardService] },
  { path: 'hire-request/bm', component: BandMixComponent,canActivate: [AuthGuardService] },
  { path: 'hire-request/ute', component: UteComponent,canActivate: [AuthGuardService] },
  { path: 'hire-request/orp', component: OrpComponent,canActivate: [AuthGuardService] },
  { path: 'hireFormView', component: GrbMainTemplateComponent,canActivate: [AuthGuardService] },
  { path: 'swap', component: SwapTemplateComponent,canActivate: [AuthGuardService] },
  { path: 'hireSubmit', component: GrbMainTemplateComponent,canActivate: [AuthGuardService] },
  { path: 'approval-grb', component: ApprovalGrbComponent,canActivate: [AuthGuardService] },
  { path: 'early-attrition', component: EarlyAttritionComponent,canActivate: [AuthGuardService] },
  {
    path: 'cost-case',
    children: [
      { path: '', component: CostCaseSubmittedComponent, canActivate: [AuthGuardService] },
      {  path:'view', component: CostCaseApprovalComponent, canActivate: [AuthGuardService] }
    ]
  },
  {
    path: 'ci-release',
    children: [
      { path: '', component: CiReleasePendingComponent, canActivate: [AuthGuardService] },
      {  path:'view', component: CiReleaseViewComponent, canActivate: [AuthGuardService] }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalCenterRoutingModule { }
