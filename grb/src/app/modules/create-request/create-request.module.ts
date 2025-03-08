import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateRequestRoutingModule } from './create-request-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackfillAttritionComponent } from 'src/app/components/create-request/backfill-attrition/backfill-attrition.component';
import { BackfillComponent } from 'src/app/components/create-request/backfill/backfill.component';
import { BackfillInternalMovementComponent } from 'src/app/components/create-request/backfill-internal-movement/backfill-internal-movement.component';
import { BackfillPromotionComponent } from 'src/app/components/create-request/backfill-promotion/backfill-promotion.component';
import { InternalHiringComponent } from 'src/app/components/grb-template/internal-hiring/internal-hiring.component';
import { DialogNewGrowthComponent } from 'src/app/components/create-request/new-growth/dialog-new-growth/dialog-new-growth.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { BackfillDialogComponent } from 'src/app/components/create-request/backfill-dialog/backfill-dialog.component';
import { HireRequestORPComponent } from 'src/app/components/create-request/hire-request-orp/hire-request-orp.component';
import { HiredialogComponent } from 'src/app/components/create-request/hire-request-orp/dialog-hireORP/hiredialog.component';
import { NewGrowthComponent } from 'src/app/components/create-request/new-growth/new-growth.component';
import { DialogCcnpcrComponent } from 'src/app/components/create-request/new-growth/dialog-ccnpcr/dialog-ccnpcr.component';
import { HiringFormSelectDialogComponent } from 'src/app/components/grb-template/hiring-form-select-dialog/hiring-form-select-dialog.component';
import { TransitionLowcostComponent } from 'src/app/components/create-request/new-growth/transition-lowcost/transition-lowcost.component';
import { GrbTemplateModule } from '../grb-template/grb-template.module';
import { UploadComponent } from 'src/app/components/approval-center/dialogs/upload/upload.component';
import { HiringFormSubmitComponent } from 'src/app/components/grb-template/hiring-form-submit/hiring-form-submit.component';
import { HiringFormViewComponent } from 'src/app/components/grb-template/hiring-form-view/hiring-form-view.component';
import { GrbComponent } from 'src/app/components/create-request/grb/grb.component';
import { GrbReviseDialogComponent } from 'src/app/components/create-request/grb/grb-revise-dialog/grb-revise-dialog.component';
import { SwapComponent } from 'src/app/components/create-request/grb/dialogs/swap/swap.component';
import { GrbBandchangeDialogComponent } from 'src/app/components/create-request/grb/dialogs/grb-bandchange-dialog/grb-bandchange-dialog.component';
import { AuditLogsComponent } from 'src/app/components/create-request/grb/dialogs/audit-logs/audit-logs.component';
import { GrbAuditLogsTabComponent } from 'src/app/components/create-request/grb/dialogs/grb-audit-logs-tab/grb-audit-logs-tab.component';
import { SubkComponent } from 'src/app/components/create-request/subk/subk/subk.component';

import { SubkDialogComponent } from 'src/app/components/create-request/subk/subk-dialog/subk-dialog.component';
import { NewHireComponent } from 'src/app/components/create-request/subk/new-hire/new-hire.component';
import { ExtensionComponent } from 'src/app/components/create-request/subk/extension/extension.component';
import { SubkToRegularComponent } from 'src/app/components/create-request/subk/subk-to-regular/subk-to-regular.component';
import { SubkToNonRegularComponent } from 'src/app/components/create-request/subk/subk-to-non-regular/subk-to-non-regular.component';
import { CostCaseViewComponent } from 'src/app/components/create-request/cost-case/cost-case-view/cost-case-view.component';
import { ConversionComponent } from 'src/app/components/create-request/conversion/conversion.component';
import { DialogConversionComponent } from 'src/app/components/create-request/conversion/dialog-conversion/dialog-conversion.component';
import { ConversionEmpListComponent } from 'src/app/components/create-request/conversion/conversion-emp-list/conversion-emp-list.component';
import { CiReleaseComponent } from 'src/app/components/create-request/ci-release/ci-release.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CiReleaseCommentsComponent } from 'src/app/components/create-request/ci-release-comments/ci-release-comments.component';

// import { CostCaseTemplateComponent } from 'src/app/components/create-request/cost-case/cost-case-template/cost-case-template.component';

@NgModule({
  declarations: [
    BackfillAttritionComponent,
    BackfillComponent,
    BackfillInternalMovementComponent,
    BackfillPromotionComponent,
    DialogNewGrowthComponent,
    // UploadComponent,
    BackfillDialogComponent,
    HireRequestORPComponent,
    HiredialogComponent,
    NewGrowthComponent,
    DialogCcnpcrComponent,
    DialogNewGrowthComponent,
    TransitionLowcostComponent,
    GrbComponent,
    GrbReviseDialogComponent,
    GrbBandchangeDialogComponent,
    SwapComponent,
    AuditLogsComponent,
    GrbAuditLogsTabComponent,
    SubkComponent,
    SubkDialogComponent,
    NewHireComponent,
    ExtensionComponent,
    SubkToRegularComponent,
    SubkToNonRegularComponent,
    CostCaseViewComponent,
    ConversionComponent,
    DialogConversionComponent,
    ConversionEmpListComponent,
    CiReleaseComponent,
    CiReleaseCommentsComponent

    // CostCaseTemplateComponent,

    // SubmitCommentsComponent
  ],
  imports: [
    CommonModule,
    CreateRequestRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GrbTemplateModule,
    NgbModule

  ],
  entryComponents: [
    LoaderComponent,
    UploadComponent,
    BackfillDialogComponent,
    HireRequestORPComponent,
    HiredialogComponent,
    NewGrowthComponent,
    DialogCcnpcrComponent,
    HiringFormSelectDialogComponent,
    TransitionLowcostComponent,
    DialogNewGrowthComponent,
    InternalHiringComponent,
    HiringFormSubmitComponent,
    HiringFormViewComponent,
    GrbReviseDialogComponent,
    GrbBandchangeDialogComponent,
    SwapComponent,
    AuditLogsComponent,
    GrbAuditLogsTabComponent,
    ConversionComponent,
    DialogConversionComponent,
    ConversionEmpListComponent,
    SubkDialogComponent,
CiReleaseCommentsComponent
  ],
  providers: [DatePipe]
})
export class CreateRequestModule { }
