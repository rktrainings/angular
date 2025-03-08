import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MySpanComponent } from 'src/app/components/my-team/my-span/my-span.component';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { MyReporteesComponent } from 'src/app/components/my-team/my-reportees/my-reportees.component';
import { AuditLogsComponent } from 'src/app/components/my-team/audit-logs/audit-logs.component';
import { EditMyTeamComponent } from 'src/app/components/my-team/edit-my-team/edit-my-team.component';
import { AddResignationComponent } from 'src/app/components/my-team/add-resignation/add-resignation.component';
import { FormsModule } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import { SearchDirective } from 'src/app/directives/search.directive';
import { MySpanService } from 'src/app/services/my-span.service';
import { MaterialModule } from '../material/material.module';
import { AttritionComponent } from 'src/app/components/my-team/attrition/attrition.component';
import { AttritionDialogComponent } from 'src/app/components/my-team/attrition-dialog/attrition-dialog.component';
import { AttritionCommentboxComponent } from 'src/app/components/my-team/attrition-commentbox/attrition-commentbox.component';
import { AttritionService } from 'src/app/services/attrition.service';
import { MyReporteesService } from 'src/app/services/my-reportees.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AttritionApproveCommentboxComponent } from 'src/app/components/my-team/attrition-approve-commentbox/attrition-approve-commentbox.component';
import { AttritionWithdrawResignationComponent } from 'src/app/components/my-team/attrition-withdraw-resignation/attrition-withdraw-resignation.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { TabularViewComponent } from 'src/app/components/my-team/tabular-view/tabular-view.component';
import { WithdrawResignationComponent } from 'src/app/components/my-team/withdraw-resignation/withdraw-resignation.component';

@NgModule({
  declarations: [
    MySpanComponent,
    MyReporteesComponent,
    TabularViewComponent,
    AuditLogsComponent,
    EditMyTeamComponent,
    AddResignationComponent,
    WithdrawResignationComponent,
    SearchDirective,
    AttritionComponent,
    AttritionDialogComponent,
    AttritionCommentboxComponent,
    AttritionApproveCommentboxComponent,
    AttritionWithdrawResignationComponent,
    // LoaderComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    MyTeamRoutingModule,
    FormsModule,
    SharedModule

  ],
  providers: [ExcelService,DatePipe,MySpanService,AttritionService,MyReporteesService],
  entryComponents: [AuditLogsComponent,EditMyTeamComponent,AddResignationComponent,WithdrawResignationComponent,AttritionDialogComponent,AttritionCommentboxComponent,AttritionApproveCommentboxComponent,AttritionWithdrawResignationComponent]
})
export class MyTeamModule { }
