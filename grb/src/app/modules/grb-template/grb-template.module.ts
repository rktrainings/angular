import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalHiringComponent } from 'src/app/components/grb-template/internal-hiring/internal-hiring.component';
import { ExternalHiringComponent } from 'src/app/components/grb-template/external-hiring/external-hiring.component';
import { HiringFormBackfillComponent } from 'src/app/components/grb-template/hiring-form-backfill/hiring-form-backfill.component';
import { HiringFormTransferComponent } from 'src/app/components/grb-template/hiring-form-transfer/hiring-form-transfer.component';
import { HiringFormSelectDialogComponent } from 'src/app/components/grb-template/hiring-form-select-dialog/hiring-form-select-dialog.component';
import { HiringFormSubmitComponent } from 'src/app/components/grb-template/hiring-form-submit/hiring-form-submit.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HiringFormViewComponent } from 'src/app/components/grb-template/hiring-form-view/hiring-form-view.component';
import { UploadComponent } from 'src/app/components/approval-center/dialogs/upload/upload.component';
import { HiringFormGrbComponent } from 'src/app/components/grb-template/hiring-form-grb/hiring-form-grb.component';
import { HiringFormGomComponent } from 'src/app/components/grb-template/hiring-form-gom/hiring-form-gom.component';
import { CardGrbTemplateComponent } from 'src/app/components/grb-template/card-grb-template/card-grb-template.component';
import { GrbMainTemplateComponent } from 'src/app/components/grb-template/grb-main-template/grb-main-template.component';
import { CustomStepperComponent } from 'src/app/components/grb-template/grb-main-template/custom-stepper/custom-stepper.component';
import { FileUploadComponent } from 'src/app/components/grb-template/dialogs/file-upload/file-upload.component';
import { CcComponent } from 'src/app/components/grb-template/dialogs/sticky/cc/cc.component';
import { BandmixComponent } from 'src/app/components/grb-template/dialogs/sticky/bandmix/bandmix.component';
import { UteComponent } from 'src/app/components/grb-template/dialogs/sticky/ute/ute.component';
import { HiringFormTramComponent } from 'src/app/components/grb-template/hiring-form-tram/hiring-form-tram.component';
import { EmployeeCheckComponent } from 'src/app/components/grb-template/dialogs/employee-check/employee-check.component';


@NgModule({
  declarations: [
    InternalHiringComponent,
    ExternalHiringComponent,
    HiringFormBackfillComponent,
    HiringFormTransferComponent,
    HiringFormSelectDialogComponent,
    HiringFormSubmitComponent,
    HiringFormViewComponent,
    UploadComponent,
    HiringFormGrbComponent,
    HiringFormGomComponent,
    CardGrbTemplateComponent,
    GrbMainTemplateComponent,
    CustomStepperComponent,
    FileUploadComponent,
    CcComponent,
    BandmixComponent,
    UteComponent,
    HiringFormTramComponent,
    EmployeeCheckComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  exports:[
    InternalHiringComponent,
    ExternalHiringComponent,
    HiringFormBackfillComponent,
    HiringFormTransferComponent,
    HiringFormSelectDialogComponent,
    HiringFormSubmitComponent,
    HiringFormGrbComponent,
    HiringFormGomComponent,
    CardGrbTemplateComponent,
    GrbMainTemplateComponent,
    CustomStepperComponent
  ],
  providers: [ExternalHiringComponent],
  entryComponents:[
    FileUploadComponent,
    CcComponent,
    BandmixComponent,
    UteComponent,
    EmployeeCheckComponent
  ]
})
export class GrbTemplateModule { }
