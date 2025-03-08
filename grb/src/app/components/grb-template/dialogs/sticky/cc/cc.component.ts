import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { costcasecal } from 'src/app/models/costcasecal';
import { DashboardService } from 'src/app/services/dashboard.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CcComponent implements OnInit {

  ccDataSource: any;
  ccJSON = {
    approvedCostCase: "Approved Cost Case",
    ciRelease: "CI Release",
    currentCostCase: "Current Cost Case",
    headCount: "HeadCount",
    attritionCount: "Attrition Count",
    submittedPostions: "Submitted Positions",
    openPostions: "Open Positions",
    vacantPostions: "Vacant Positions"
  }
  columnsToDisplay = ['description', 'band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  subscription: Subscription;
  deptCode: string;
  deptName: string;
  enableLoadingMsg1: boolean;
  enabledNoDataMsg: boolean;
  showLoaderCC: boolean;


  constructor(public dialogRef: MatDialogRef<CcComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private dashboardService: DashboardService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.ccDataSource = new MatTableDataSource([]);
    this.getDeptDetails();
    this.fetchCurrentCCCalc(this.deptCode);

  }

  getDeptDetails() {
    this.subscription = this.hiringFormService.dept$.subscribe(data => {
      ////console.log('deptCode:', data['deptCode']);
      ////console.log('deptName:', data['deptName']);
      this.deptCode = data['deptCode'];
      this.deptName = data['deptName'];
    });

  }

  fetchCurrentCCCalc(deptCode: any) {
    this.enableLoadingMsg1 = true;
    this.dashboardService.getCurrentCostCaseCalc<costcasecal[]>(deptCode).subscribe((data: any) => {
      //console.log(data)
      if (data.status == 'OK') {
        this.enableLoadingMsg1 = false;
        this.enabledNoDataMsg = true;
      }
      else {
        this.pushCCData(data);
      }
      //console.log(data)
      this.showLoaderCC = false;
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  pushCCData(data: costcasecal[]) {

    let filteredOBJ = []
    Object.keys(data).forEach(e => {
      data[e]['description'] = e;
      filteredOBJ.push(data[e])
    })

    if (this.ccDataSource.data !== null) {
      this.enableLoadingMsg1 = false;
    }
    this.ccDataSource = new MatTableDataSource(filteredOBJ);
    ////console.log('ccData', this.ccDataSource);

  }

  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);

  }

}
