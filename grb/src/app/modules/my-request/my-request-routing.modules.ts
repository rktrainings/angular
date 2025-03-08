import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRequestMainComponent } from 'src/app/components/my-request/my-request-main/my-request-main.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';




const routes: Routes = [
  { path: '', component: MyRequestMainComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRequestRoutingModule { }
