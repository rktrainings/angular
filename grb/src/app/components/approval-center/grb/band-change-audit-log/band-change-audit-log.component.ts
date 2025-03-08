import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { ExcelService } from 'src/app/services/excel.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-band-change-audit-log',
  templateUrl: './band-change-audit-log.component.html',
  styleUrls: ['./band-change-audit-log.component.scss']
})
export class BandChangeAuditLogComponent implements OnInit {

  
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['metroNum', 'grbNum', 'currentBand', 'reqBand', 'requestedDate', 'requestedBy', 'bizopsUpdateDate','status', 'bizopsremarks'];

  grbNumber = ""
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;



  constructor(public dialogRef: MatDialogRef<BandChangeAuditLogComponent>, private approvalCenterGrb: ApprovalCenterGrbService,
    public dialog: MatDialog, private spinner: NgxSpinnerService,
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


    this.approvalCenterGrb.getBandChangeAudit(this.grbNumber).subscribe((data: any[]) => {
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
    this.spinner.show();
    let url = environment.APPROVAL_CENTER_BAND_CHANGE_AUDIT_DOWNLOAD + this.grbNumber;
    this.spinner.hide();
    this.excelService.exportData(url).subscribe(data => {
      this.excelService.saveAsExcelFile(data['body'], 'BAND_AUDIT');
})
    // this.excelService.exportData(url).subscribe((data: any[]) => {

    //   this.excelService.saveAsExcelFile(data['body'], 'AUDIT');


    // });

  }

}
