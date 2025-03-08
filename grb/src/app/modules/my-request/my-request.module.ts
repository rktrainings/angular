import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { PendingRequestComponent } from '../../../app/components/dashboard/common/pending-request/pending-request.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ApprovedRequestComponent } from '../../../app/components/dashboard/common/approved-request/approved-request.component';
import { MyRequestMainComponent } from 'src/app/components/my-request/my-request-main/my-request-main.component';
import { MyRequestRoutingModule } from './my-request-routing.modules';

import { HireRequestComponent } from 'src/app/components/my-request/hire-request/hire-request.component';
import { GrbReviseComponent } from 'src/app/components/my-request/grb-revise/grb-revise.component';
import { SwapComponent } from 'src/app/components/my-request/swap/swap.component';
import { BandChangeComponent } from 'src/app/components/my-request/band-change/band-change.component';
import { CostcaseComponent } from 'src/app/components/my-request/costcase/costcase.component';
import { AuditComponent } from 'src/app/components/my-request/audit-dialogs/hire-request-audit/audit.component';
import { SwapAuditComponent } from 'src/app/components/my-request/audit-dialogs/swap-audit/swap-audit.component';
import { GrbreviseAuditComponent } from 'src/app/components/my-request/audit-dialogs/grbrevise-audit/grbrevise-audit.component';
import { BandchangeAuditComponent } from 'src/app/components/my-request/audit-dialogs/bandchange-audit/bandchange-audit.component';
import { CostcaseAuditComponent } from 'src/app/components/my-request/audit-dialogs/costcase-audit/costcase-audit.component';
import { CiComponent } from 'src/app/components/my-request/ci/ci.component';
import { CiAuditComponent } from 'src/app/components/my-request/audit-dialogs/ci-audit/ci-audit.component';




@NgModule({
  declarations: [
    MyRequestMainComponent,
    AuditComponent,
    HireRequestComponent,
    GrbReviseComponent,
    SwapComponent,
    BandChangeComponent,
    CostcaseComponent,
   // SwapAuditComponent,
    GrbreviseAuditComponent,
    BandchangeAuditComponent,
    CostcaseAuditComponent,
    CiComponent,
    CiAuditComponent
  ],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [AuditComponent, GrbreviseAuditComponent,
    BandchangeAuditComponent,CostcaseAuditComponent,CiAuditComponent]
})
export class MyRequestModule { }
