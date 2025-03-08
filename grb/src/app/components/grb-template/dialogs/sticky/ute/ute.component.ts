import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UTEStickyDetails } from 'src/app/tsclasses/ute-sticky-details';
import { UTEStickies } from 'src/app/tsclasses/ute-stickies';

@Component({
  selector: 'app-ute',
  templateUrl: './ute.component.html',
  styleUrls: ['./ute.component.scss']
})
export class UteComponent implements OnInit {

  displayedColumns: string[] = ['weekEndingDate', 'targetUTE', 'actualChargeableUTE'];
  dataSourceWTD = new MatTableDataSource<UTEStickies>();
  enableLoadingMsg: boolean;
  subscription: Subscription;
  deptCode: any;
  enabledNoDataMsgWTD: boolean;
  dataSourceQTD = new MatTableDataSource<UTEStickies>();
  enabledNoDataMsgQTD: boolean;


  constructor(public dialogRef: MatDialogRef<UteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.getDeptDetails();
    this.getUTEStickyDetails(this.deptCode);
  }

  getDeptDetails() {
    this.subscription = this.hiringFormService.dept$.subscribe(data => {
      this.deptCode = data['deptCode'];
    });
  }

  getUTEStickyDetails(deptCode: string) {
    this.enableLoadingMsg = true;
    this.hiringFormService.getUTEStickyDetails<UTEStickies[]>(deptCode).subscribe((data: UTEStickies[]) => {
      this.enableLoadingMsg = false;

      if (data['uteStickyDetailsList'].length === 0) {
        this.enabledNoDataMsgWTD = true;
      } else {
        this.dataSourceWTD.data = data['uteStickyDetailsList'];
      }

      if (data['uteStickyDetails']) {
        this.dataSourceQTD.data = [data['uteStickyDetails']];
      } else {
        this.enabledNoDataMsgQTD = true;
      }

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }


  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
  }

}
