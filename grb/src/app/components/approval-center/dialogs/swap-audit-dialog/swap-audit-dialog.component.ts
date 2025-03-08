import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { BandChangeAuditLogComponent } from '../../grb/band-change-audit-log/band-change-audit-log.component';
import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/environments/environment';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-swap-audit-dialog',
  templateUrl: './swap-audit-dialog.component.html',
  styleUrls: ['./swap-audit-dialog.component.scss']
})
export class SwapAuditDialogComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  displayedHeaders = ['METRO#', 'GRB#', 'CREATED BY', 'CREATED DATE', 'LAST UPDATED BY', 'LAST UPDATED DATE', 'STATUS', 'ASSIGNED TO']
  displayedColumns = ['metroNumber', 'grbNumber', 'createdBy', 'createdDate', 'lastUpdatedBy', 'lastUpdatedDate', 'grbStatus', 'assignedTo'];
  grbNumber = ""
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;

  constructor(public dialogRef: MatDialogRef<SwapAuditDialogComponent>,
    private approvalCenterGrb: ApprovalCenterGrbService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private excelService: ExcelService,
    private reports: ReportsService) {
    this.grbNumber = data;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
    this.approvalCenterGrb.getSwapAudit(this.grbNumber).subscribe((data: any[]) => {
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
    let url = environment.APPROVAL_CENTER_SWAP_AUDIT_DOWNLOAD + this.grbNumber;
    this.reports.setDownloadingReport('SWAP AUDIT');
    this.excelService.exportData(url).subscribe(data => {
      this.reports.popDownloadingReport("SWAP AUDIT");
      this.excelService.saveAsExcelFile(data['body'], 'SWAP_AUDIT');

    })
  }

}
