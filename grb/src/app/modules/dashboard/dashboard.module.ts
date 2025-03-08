import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GrbTemplateModule } from '../grb-template/grb-template.module';
import { HiringFormViewComponent } from 'src/app/components/grb-template/hiring-form-view/hiring-form-view.component';
import { PendingRequestComponent } from 'src/app/components/dashboard/common/pending-request/pending-request.component';
import { ApprovedRequestComponent } from 'src/app/components/dashboard/common/approved-request/approved-request.component';

import { HiringFormSubmitComponent } from 'src/app/components/grb-template/hiring-form-submit/hiring-form-submit.component';
import { UploadComponent } from 'src/app/components/approval-center/dialogs/upload/upload.component';
import { BackfillDialogComponent } from 'src/app/components/create-request/backfill-dialog/backfill-dialog.component';
import { HireRequestORPComponent } from 'src/app/components/create-request/hire-request-orp/hire-request-orp.component';
import { HiredialogComponent } from 'src/app/components/create-request/hire-request-orp/dialog-hireORP/hiredialog.component';
import { NewGrowthComponent } from 'src/app/components/create-request/new-growth/new-growth.component';
import { DialogCcnpcrComponent } from 'src/app/components/create-request/new-growth/dialog-ccnpcr/dialog-ccnpcr.component';
import { HiringFormSelectDialogComponent } from 'src/app/components/grb-template/hiring-form-select-dialog/hiring-form-select-dialog.component';
import { TransitionLowcostComponent } from 'src/app/components/create-request/new-growth/transition-lowcost/transition-lowcost.component';
import { DialogNewGrowthComponent } from 'src/app/components/create-request/new-growth/dialog-new-growth/dialog-new-growth.component';
import { InternalHiringComponent } from 'src/app/components/grb-template/internal-hiring/internal-hiring.component';
import { CurrentccComponent } from 'src/app/components/dashboard/common/currentcc/currentcc.component';
import { AccdialogComponent } from 'src/app/components/dashboard/dialogs/accdialog/accdialog.component';
import { ConvertToInternalComponent } from 'src/app/components/dashboard/dialogs/convert-to-internal/convert-to-internal.component';
import { OrpListComponent } from 'src/app/components/dashboard/dialogs/orp-list/orp-list.component';
import { PendingDialogComponent } from 'src/app/components/dashboard/dialogs/pending-dialog/pending-dialog.component';
import { CommentsDialogComponent } from 'src/app/components/dashboard/dialogs/comments-dialog/comments-dialog.component';
import { ApprovedDialogComponent } from 'src/app/components/dashboard/dialogs/approved-dialog/approved-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/components/dashboard/dialogs/confirmation-dialog/confirmation-dialog.component';
import { CiDashboardComponent } from 'src/app/components/dashboard/common/ci-dashboard/ci-dashboard.component';
import { HrDashboardComponent } from 'src/app/components/dashboard/hr-dashboard/hr-dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PendingRequestComponent,
    ApprovedRequestComponent,
    CurrentccComponent,
    AccdialogComponent,
    ConvertToInternalComponent,
    OrpListComponent,
    PendingDialogComponent,
    CommentsDialogComponent,
    ApprovedDialogComponent,
    ConfirmationDialogComponent,
    CiDashboardComponent,
    HrDashboardComponent
    // HiringFormViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    GrbTemplateModule
  ],
  entryComponents:[
    AccdialogComponent,
    // LoaderComponent,
    // UploadComponent,
    // BackfillDialogComponent,
    // HireRequestORPComponent,
    // HiredialogComponent,
    // NewGrowthComponent,
    // DialogCcnpcrComponent,
    // HiringFormSelectDialogComponent,
    // TransitionLowcostComponent,
    // DialogNewGrowthComponent,
    // InternalHiringComponent,
    HiringFormSubmitComponent,
    HiringFormViewComponent,
    ConvertToInternalComponent,
    OrpListComponent,
    PendingDialogComponent,
    CommentsDialogComponent,
    ApprovedDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class DashboardModule { }
