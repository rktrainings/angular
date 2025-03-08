import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MySpanComponent } from 'src/app/components/my-team/my-span/my-span.component';
import { MyReporteesComponent } from 'src/app/components/my-team/my-reportees/my-reportees.component';
import { AttritionComponent } from 'src/app/components/my-team/attrition/attrition.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';




const routes: Routes = [

  { path: 'my-span', component: MySpanComponent, canActivate: [AuthGuardService] },
  { path: 'my-reportees', component: MyReporteesComponent, canActivate: [AuthGuardService] },
  { path: 'attrited-employees', component: AttritionComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule { }
