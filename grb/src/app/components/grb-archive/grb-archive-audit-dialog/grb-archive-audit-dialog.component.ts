import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { GrbArchiveService } from 'src/app/services/grb-archive.service';
import { AuditTable } from 'src/app/tsclasses/audit-table';
import { GrbArchiveMainComponent } from '../grb-archive-main/grb-archive-main.component';

@Component({
  selector: 'app-grb-archive-audit-dialog',
  templateUrl: './grb-archive-audit-dialog.component.html',
  styleUrls: ['./grb-archive-audit-dialog.component.scss']
})
export class GrbArchiveAuditDialogComponent implements OnInit {
  ELEMENT_DATA: AuditTable[] = [];
  metroNum: any;
  displayedColumns: string[] = ['metronum', 'Band', 'deptcode', 'submittedBy', 'submittedDate', 'lastUpdatedBy', 'lastUpdatedDate', 'status', 'comments'];
  dataSource = new MatTableDataSource<AuditTable>(this.ELEMENT_DATA);
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;
  constructor(public dialogRef: MatDialogRef<GrbArchiveAuditDialogComponent>, private grbArchiveService: GrbArchiveService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    //console.log(this.data)
    this.metroNum = this.data;
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
   // //console.log(this.metroNum)
    this.grbArchiveService.getGRBArchiveAuditDetails(this.metroNum).subscribe((data: any[]) => {
      ////console.log(data);
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      if (this.dataSource.data !== null) {

        this.enableLoadingMsg = true;

      }

      if (this.dataSource.data.length === 0) {

        this.enabledNoDataMsg = true;

      }

    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
