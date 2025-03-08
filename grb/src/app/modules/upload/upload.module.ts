import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { HcHistoryComponent } from 'src/app/components/upload/hc-history/hc-history.component';
import { HcActualComponent } from 'src/app/components/upload/hc-actual/hc-actual.component';
import { CostCaseComponent } from 'src/app/components/upload/cost-case/cost-case.component';
import { DialogCostCaseComponent } from 'src/app/components/upload/Dialogs/dialog-cost-case/dialog-cost-case.component';
import { DialogHcActualComponent } from 'src/app/components/upload/Dialogs/dialog-hc-actual/dialog-hc-actual.component';
import { DialogHcHistoryComponent } from 'src/app/components/upload/Dialogs/dialog-hc-history/dialog-hc-history.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogHcUpdateComponent } from 'src/app/components/upload/Dialogs/dialog-hc-update/dialog-hc-update.component';
import { HcUpdateComponent } from 'src/app/components/upload/hc-update/hc-update.component';
//import { DialogHcUpdateComponent } from 'src/app/components/upload/Dialogs/dialog-hc-update/dialog-hc-update.component';

@NgModule({
  declarations: [
    HcHistoryComponent,
    HcActualComponent,
    CostCaseComponent,
    DialogCostCaseComponent,
    DialogHcActualComponent,
    DialogHcHistoryComponent,
    HcUpdateComponent,
    DialogHcUpdateComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ DialogCostCaseComponent,
    DialogHcActualComponent,
    DialogHcHistoryComponent,
    DialogHcUpdateComponent
  ]
})
export class UploadModule { }