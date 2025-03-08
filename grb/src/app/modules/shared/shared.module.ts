import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SwapAuditComponent } from 'src/app/components/my-request/audit-dialogs/swap-audit/swap-audit.component';
import { MaterialModule } from '../material/material.module';
import { MyRequestRoutingModule } from '../my-request/my-request-routing.modules';
import { FormsModule } from '@angular/forms';
import { CostCaseTemplateComponent } from 'src/app/components/cost-case-template/cost-case-template.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SwapAuditComponent,
    CostCaseTemplateComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule, 
    CommonModule,

    MaterialModule,

    FormsModule
  ],
  exports: [
    LoaderComponent,
    NgxSpinnerModule,
    CostCaseTemplateComponent
  ], entryComponents: [SwapAuditComponent]
})
export class SharedModule { }
