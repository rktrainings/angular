import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { HeadCountComponent } from 'src/app/components/reports/head-count/head-count.component';
import { CCNPCRComponent } from 'src/app/components/reports/ccn-pcr/ccn-pcr.component';
import { GrbDumpComponent } from 'src/app/components/reports/grb-dump/grb-dump.component';
import { BrHiringstatusComponent } from 'src/app/components/reports/br-hiringstatus/br-hiringstatus.component';
import { ExportGrbRequestComponent } from 'src/app/components/reports/export-grb-request/export-grb-request.component';
import { RecruitmentComponent } from 'src/app/components/reports/recruitment/recruitment.component';
import { TramExportComponent } from 'src/app/components/reports/tram-export/tram-export.component';
import { CostCaseReportComponent } from 'src/app/components/reports/cost-case-report/cost-case-report.component';
import { SundryComponent } from 'src/app/components/reports/sundry/sundry.component';
import { CiReportComponent } from 'src/app/components/reports/ci-report/ci-report.component';

const routes: Routes = [
  { path: 'hc&att', component:  HeadCountComponent, canActivate: [AuthGuardService] },
  { path: 'recruitment-status', component:  RecruitmentComponent, canActivate: [AuthGuardService] },
  { path: 'ccn-pcr', component:  CCNPCRComponent, canActivate: [AuthGuardService] },
  { path: 'grb-dump', component:  GrbDumpComponent, canActivate: [AuthGuardService] },
  { path: 'br-hiring-status', component:  BrHiringstatusComponent, canActivate: [AuthGuardService] },
  { path: 'export-grb-requests', component:  ExportGrbRequestComponent, canActivate: [AuthGuardService] },
  { path: 'tram', component:  TramExportComponent, canActivate: [AuthGuardService] },
  { path: 'cost-case', component:  CostCaseReportComponent, canActivate: [AuthGuardService] },
  { path: 'sundry', component:  SundryComponent, canActivate: [AuthGuardService] },
  { path: 'ci-report', component:  CiReportComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
