import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GrbComponent } from '../../grb.component';

@Component({
  selector: 'app-grb-audit-logs-tab',
  templateUrl: './grb-audit-logs-tab.component.html',
  styleUrls: ['./grb-audit-logs-tab.component.scss']
})
export class GrbAuditLogsTabComponent implements OnInit {

  grbNumber = "";
  swapAudit = [];
  grbRevise = [];
  bandChange = [];
  show: boolean = false;
  constructor(public dialogRef: MatDialogRef<GrbComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private commonService: CommonService) {
    this.grbNumber = data['grbNumber'];
  }

  ngOnInit() {
    let url1 = environment.CREATE_REQUEST_SWAP_AUDIT + this.grbNumber
      , url2 = environment.CREATE_REQUEST_GRB_REVISE + this.grbNumber,
      url3 = environment.CREATE_REQUEST_BAND_CHANGE + this.grbNumber;
    this.commonService.requestDataFromMultipleSources(url1, url2, url3).subscribe((data: any[]) => {
      this.swapAudit = data[0];
      this.grbRevise = data[1];
      this.bandChange = data[2];
      this.show = true;
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
