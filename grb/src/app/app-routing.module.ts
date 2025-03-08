import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { LoggedOutViewComponent } from './components/logged-out-view/logged-out-view.component';
import { TermGuardService } from './services/term-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  
  { path: 'main-menu', component: MainViewComponent},
  { path: 'accept-terms', component: TermsComponent,canActivate:[TermGuardService] },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'session-expired', component: SessionExpiredComponent },
  { path: 'logged-out', component: LoggedOutViewComponent },

  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'my-team', loadChildren: './modules/my-team/my-team.module#MyTeamModule' },
  { path: 'create-request', loadChildren: './modules/create-request/create-request.module#CreateRequestModule' },
  { path: 'my-request', loadChildren: './modules/my-request/my-request.module#MyRequestModule' },
  { path: 'approval-center', loadChildren: './modules/approval-center/approval-center.module#ApprovalCenterModule' },
  { path: 'grb-archive', loadChildren: './modules/grb-archive/grb-archive.module#GrbArchiveModule' },
  { path: 'reports', loadChildren: './modules/reports/reports.module#ReportsModule' },
  { path: 'upload', loadChildren: './modules/upload/upload.module#UploadModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false,
    useHash: true,
    // preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
