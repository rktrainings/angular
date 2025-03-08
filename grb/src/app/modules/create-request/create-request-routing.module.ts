import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackfillAttritionComponent } from 'src/app/components/create-request/backfill-attrition/backfill-attrition.component';
import { BackfillComponent } from 'src/app/components/create-request/backfill/backfill.component';
import { BackfillInternalMovementComponent } from 'src/app/components/create-request/backfill-internal-movement/backfill-internal-movement.component';
import { BackfillPromotionComponent } from 'src/app/components/create-request/backfill-promotion/backfill-promotion.component';
import { InternalHiringComponent } from 'src/app/components/grb-template/internal-hiring/internal-hiring.component';
import { ExternalHiringComponent } from 'src/app/components/grb-template/external-hiring/external-hiring.component';
import { DialogNewGrowthComponent } from 'src/app/components/create-request/new-growth/dialog-new-growth/dialog-new-growth.component';
// import { GrbMainTemplateComponent } from 'src/app/components/grb-template/grb-main-template/grb-main-template.component';
import { GrbComponent } from 'src/app/components/create-request/grb/grb.component';
import { GrbMainTemplateComponent } from 'src/app/components/grb-template/grb-main-template/grb-main-template.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SubkComponent } from 'src/app/components/create-request/subk/subk/subk.component';
import { NewHireComponent } from 'src/app/components/create-request/subk/new-hire/new-hire.component';
import { SubkToRegularComponent } from 'src/app/components/create-request/subk/subk-to-regular/subk-to-regular.component';
import { SubkToNonRegularComponent } from 'src/app/components/create-request/subk/subk-to-non-regular/subk-to-non-regular.component';
import { ExtensionComponent } from 'src/app/components/create-request/subk/extension/extension.component';
import { CostCaseViewComponent } from 'src/app/components/create-request/cost-case/cost-case-view/cost-case-view.component';
import { DialogConversionComponent } from 'src/app/components/create-request/conversion/dialog-conversion/dialog-conversion.component';
import { CiReleaseComponent } from 'src/app/components/create-request/ci-release/ci-release.component';

const routes: Routes = [
  {
    path: 'backfill',
    children: [
      { path: '', component: BackfillComponent, canActivate: [AuthGuardService] },
      { path: 'attrition', component: BackfillAttritionComponent, canActivate: [AuthGuardService] },
      { path: 'internal-movement', component: BackfillInternalMovementComponent, canActivate: [AuthGuardService] },
      { path: 'promotion', component: BackfillPromotionComponent, canActivate: [AuthGuardService] },]
  },
  { path: 'internal', component: InternalHiringComponent,canActivate: [AuthGuardService] },
  { path: 'external', component: ExternalHiringComponent,canActivate: [AuthGuardService] },
  { path: 'new-growth', component: DialogNewGrowthComponent,canActivate: [AuthGuardService] },
  { path: 'hiresubmit', component: GrbMainTemplateComponent,canActivate: [AuthGuardService] },
  { path: 'grb-request', component: GrbComponent,canActivate: [AuthGuardService] },
  { path: 'cost-case', component: CostCaseViewComponent,canActivate: [AuthGuardService] },
  { path: 'conversion', component: DialogConversionComponent,canActivate: [AuthGuardService] },
  { path: 'ci-release', component: CiReleaseComponent,canActivate: [AuthGuardService] },

  {
    path: 'subk',
    children: [
      { path: '', component: SubkComponent,canActivate: [AuthGuardService] },
      { path: 'new-hire', component: NewHireComponent,canActivate: [AuthGuardService] },
      { path: 'subk-regular', component: SubkToRegularComponent,canActivate: [AuthGuardService] },
      { path: 'subk-non-regular', component: SubkToNonRegularComponent,canActivate: [AuthGuardService] },
      { path: 'extension', component: ExtensionComponent,canActivate: [AuthGuardService] },]},

  
  {
    path: 'cost-case',
    children: [
      { path: '', component: CostCaseViewComponent, canActivate: [AuthGuardService]  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRequestRoutingModule { }
