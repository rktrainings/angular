import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GrbArchiveRoutingModule } from './grb-archive-routing.modules';
import { GrbArchiveMainComponent } from 'src/app/components/grb-archive/grb-archive-main/grb-archive-main.component';
import { GrbArchiveAuditDialogComponent } from 'src/app/components/grb-archive/grb-archive-audit-dialog/grb-archive-audit-dialog.component';
import { GrbNumberComponent } from 'src/app/components/grb-archive/dialogs/grb-number/grb-number.component';
import { GrbArchiveDeleteDialogComponent } from 'src/app/components/grb-archive/grb-archive-delete-dialog/grb-archive-delete-dialog.component';

@NgModule({
  declarations: [
    GrbArchiveMainComponent,
    GrbArchiveAuditDialogComponent,
    GrbNumberComponent,
    GrbArchiveDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    GrbArchiveRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [
    GrbArchiveAuditDialogComponent,
    GrbNumberComponent,
    GrbArchiveDeleteDialogComponent
  ]
})
export class GrbArchiveModule { }
