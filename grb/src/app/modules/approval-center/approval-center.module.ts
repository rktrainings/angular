import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalCenterRoutingModule } from './approval-center-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { UploadComponent } from 'src/app/components/approval-center/dialogs/upload/upload.component';
import { IotBaseComponent } from 'src/app/components/approval-center/iot-base/iot-base.component';
import { BoardComponent } from 'src/app/components/approval-center/board/board.component';
import { BizopsComponent } from 'src/app/components/approval-center/bizops/bizops.component';
import { CostCaseComponent } from 'src/app/components/approval-center/tolls/cost-case/cost-case.component';
import { BandMixComponent } from 'src/app/components/approval-center/tolls/band-mix/band-mix.component';
import { UteComponent } from 'src/app/components/approval-center/tolls/ute/ute.component';
import { OrpComponent } from 'src/app/components/approval-center/tolls/orp/orp.component';
import { HiringFormViewComponent } from 'src/app/components/grb-template/hiring-form-view/hiring-form-view.component';
import { IotTemplateComponent } from 'src/app/components/approval-center/iot-template/iot-template.component';
import { TollTemplateComponent } from 'src/app/components/approval-center/tolls/toll-template/toll-template.component';
import { GrbTemplateModule } from '../grb-template/grb-template.module';
import { GrbTemplateCommentsComponent } from 'src/app/components/approval-center/dialogs/grb-template-comments/grb-template-comments.component';
import { SwapTemplateComponent } from 'src/app/components/approval-center/swap/swap-template/swap-template.component';
import { AuditLogComponent } from 'src/app/components/approval-center/dialogs/audit-log/audit-log.component';
import { HiringFormSubmitComponent } from 'src/app/components/grb-template/hiring-form-submit/hiring-form-submit.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ApproveGrbDialogComponent } from 'src/app/components/approval-center/grb/approve-grb-dialog/approve-grb-dialog.component';
import { ApprovalBandChangeDialogComponent } from 'src/app/components/approval-center/grb/approval-band-change-dialog/approval-band-change-dialog.component';
import { SwapAuditComponent } from 'src/app/components/my-request/audit-dialogs/swap-audit/swap-audit.component';
import { ApprovalGrbComponent } from 'src/app/components/approval-center/grb/approval-grb/approval-grb.component';
import { BandChangeAuditLogComponent } from 'src/app/components/approval-center/grb/band-change-audit-log/band-change-audit-log.component';
import { SwapAuditDialogComponent } from 'src/app/components/approval-center/dialogs/swap-audit-dialog/swap-audit-dialog.component';
import { QuarterPickerComponent } from 'src/app/components/approval-center/dialogs/quarter-picker/quarter-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CostCaseApprovalComponent } from 'src/app/components/approval-center/cost-case/cost-case-approval/cost-case-approval.component';
import { ApprovalCommentsComponent } from 'src/app/components/approval-center/cost-case/dialogs/approval-comments/approval-comments.component';
import { CostCaseSubmittedComponent } from 'src/app/components/approval-center/cost-case/cost-case-submitted/cost-case-submitted.component';
import { RejectionCommentsComponent } from 'src/app/components/approval-center/cost-case/dialogs/rejection-comments/rejection-comments.component';
import { UploadForBoardComponent } from 'src/app/components/approval-center/upload-for-board/upload-for-board.component';
import { CiReleaseViewComponent } from 'src/app/components/approval-center/ci-release/ci-release-view/ci-release-view.component';
import { CiReleaseApproverCommentsComponent } from 'src/app/components/approval-center/ci-release/ci-release-approver-comments/ci-release-approver-comments.component';
import { EarlyAttritionComponent } from 'src/app/components/approval-center/early-attrition/early-attrition.component';
import { CiReleasePendingComponent } from 'src/app/components/approval-center/ci-release/ci-release-pending/ci-release-pending.component';

@NgModule({
  declarations: [
    IotBaseComponent,
    BoardComponent,
    BizopsComponent,
    CostCaseComponent,
    BandMixComponent,
    UteComponent,
    OrpComponent,
    IotTemplateComponent,
    TollTemplateComponent,
    GrbTemplateCommentsComponent,
    SwapTemplateComponent,
    ApprovalGrbComponent,
    AuditLogComponent,
    ApproveGrbDialogComponent,
    ApprovalBandChangeDialogComponent,
    BandChangeAuditLogComponent,
    SwapAuditDialogComponent,
    QuarterPickerComponent,
    CostCaseSubmittedComponent,
   ApprovalCommentsComponent,
   RejectionCommentsComponent,
   UploadForBoardComponent,
   EarlyAttritionComponent,
    CostCaseApprovalComponent,
   
   
    CiReleaseViewComponent,
    CiReleaseApproverCommentsComponent,
    CiReleasePendingComponent,

  ],
  imports: [
    ApprovalCenterRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GrbTemplateModule,
    NgbModule,
    CommonModule

  ],
  entryComponents: [
    LoaderComponent,
    UploadComponent,
    GrbTemplateCommentsComponent,
    AuditLogComponent,
    HiringFormSubmitComponent,
    HiringFormViewComponent,
    ApproveGrbDialogComponent,
    ApprovalBandChangeDialogComponent,
    BandChangeAuditLogComponent,
    SwapAuditDialogComponent,
    ApprovalCommentsComponent,
    RejectionCommentsComponent,
    UploadForBoardComponent,
    CiReleaseApproverCommentsComponent,

  ], providers: [
    AuthGuardService,
    QuarterPickerComponent
  ]
})
export class ApprovalCenterModule { }
