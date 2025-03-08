import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrbArchiveMainComponent } from 'src/app/components/grb-archive/grb-archive-main/grb-archive-main.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';




const routes: Routes = [
  { path: '', component: GrbArchiveMainComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrbArchiveRoutingModule { }
