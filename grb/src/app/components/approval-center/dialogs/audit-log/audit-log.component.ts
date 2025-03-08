import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/environments/environment';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['metroNum', 'grbNum', 'band', 'empBand', 'requestedDate', 'requestedBy', 'bizopsUpdateDate', 'bizopsremarks'];

  grbNumber = ""
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;



  constructor(public dialogRef: MatDialogRef<AuditLogComponent>,private reportService:ReportsService, private approvalCenterGrb: ApprovalCenterGrbService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private excelService: ExcelService) {
      
    this.grbNumber = data;

  }

  ngOnInit() {

    this.getData();

  }

  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;


    this.approvalCenterGrb.getGrbReviseAudit(this.grbNumber).subscribe((data: any[]) => {
      //this.JSON_Data = this.AUDIT_JSON;
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

  exportData() {
    let url = environment.APPROVAL_CENTER_GRB_REVISE_AUDIT_DOWNLOAD + this.grbNumber;
    this.reportService.setDownloadingReport("GRB_REVISE_AUDIT_"+this.grbNumber);
    this.excelService.exportData(url).subscribe((data: any[]) => {
      this.reportService.popDownloadingReport("GRB_REVISE_AUDIT");
      this.excelService.saveAsExcelFile(data['body'], 'GRB_REVISE_AUDIT');


    });

  }
}
