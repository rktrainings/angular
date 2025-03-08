import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadCountComponent } from 'src/app/components/reports/head-count/head-count.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.modules';
import { CCNPCRComponent } from 'src/app/components/reports/ccn-pcr/ccn-pcr.component';
import { CcnPcrReportsDialogComponent } from 'src/app/components/reports/dialogs/ccn-pcr-reports-dialog/ccn-pcr-reports-dialog.component';
import { GrbDumpComponent } from 'src/app/components/reports/grb-dump/grb-dump.component';
import { GrbDumpReportsDialogComponent } from 'src/app/components/reports/dialogs/grb-dump-reports-dialog/grb-dump-reports-dialog.component';
import { HeadCountReportsDialogComponent } from 'src/app/components/reports/dialogs/head-count-reports-dialog/head-count-reports-dialog.component';
import { BrHiringstatusComponent } from 'src/app/components/reports/br-hiringstatus/br-hiringstatus.component';
import { BrHiringstatusReportsDialogComponent } from 'src/app/components/reports/dialogs/br-hiringstatus-reports-dialog/br-hiringstatus-reports-dialog.component';
import { ExportGrbRequestComponent } from 'src/app/components/reports/export-grb-request/export-grb-request.component';
import { ExportGrbRequestDialogComponent } from 'src/app/components/reports/dialogs/export-grb-request-dialog/export-grb-request-dialog.component';
import { RecruitmentReportsDialogComponent } from 'src/app/components/reports/dialogs/recruitment-reports-dialog/recruitment-reports-dialog.component';
import { RecruitmentComponent } from 'src/app/components/reports/recruitment/recruitment.component';
import { TramExportComponent } from 'src/app/components/reports/tram-export/tram-export.component';
import { TramExportReportDialogComponent } from 'src/app/components/reports/dialogs/tram-export-report-dialog/tram-export-report-dialog.component';
import { CostCaseReportDialogComponent } from 'src/app/components/reports/dialogs/cost-case-report-dialog/cost-case-report-dialog.component';
import { CostCaseReportComponent } from 'src/app/components/reports/cost-case-report/cost-case-report.component';
import { SundryReportsComponent } from 'src/app/components/reports/dialogs/sundry-reports/sundry-reports.component';
import { SundryComponent } from 'src/app/components/reports/sundry/sundry.component';
import { CiReportComponent } from 'src/app/components/reports/ci-report/ci-report.component';
import { CiReportDialogComponent } from 'src/app/components/reports/dialogs/ci-report-dialog/ci-report-dialog.component';

@NgModule({
  declarations: [
    HeadCountComponent,
    CCNPCRComponent,
    CcnPcrReportsDialogComponent,
    GrbDumpReportsDialogComponent,
    GrbDumpComponent,
    HeadCountReportsDialogComponent,
    BrHiringstatusComponent,
    BrHiringstatusReportsDialogComponent,
    ExportGrbRequestComponent,
    ExportGrbRequestDialogComponent,
    RecruitmentComponent,
    RecruitmentReportsDialogComponent,
    TramExportComponent,
    TramExportReportDialogComponent,
    CostCaseReportComponent,
    CostCaseReportDialogComponent,
    SundryComponent,
    SundryReportsComponent,
    CiReportComponent,
    CiReportDialogComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ReportsRoutingModule
  ],
  entryComponents: [
    CcnPcrReportsDialogComponent,
    GrbDumpReportsDialogComponent, 
    RecruitmentReportsDialogComponent,
    HeadCountReportsDialogComponent,
    BrHiringstatusReportsDialogComponent,
    ExportGrbRequestDialogComponent,
    TramExportReportDialogComponent,
    CostCaseReportDialogComponent,
    SundryReportsComponent,
    CiReportDialogComponent,
  ]
})
export class ReportsModule { }
