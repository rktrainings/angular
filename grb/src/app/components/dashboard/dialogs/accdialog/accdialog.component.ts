
import { Component, OnInit, Inject, ViewChild, Optional, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { actualCostCase } from 'src/app/models/actualCostCase';
import { DashboardService } from 'src/app/services/dashboard.service';
import { costcasecal } from 'src/app/models/costcasecal';
import { element } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';

@Component({
  selector: 'app-accdialog',
  templateUrl: './accdialog.component.html',
  styleUrls: ['./accdialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AccdialogComponent implements OnInit {

  step = 0;
  name: string;
  date = new Date();
  deptCode: any;
  cyear: any;
  ACCLEMENT_DATA = [];
  accDataSource: any = [];
  availableYears = [];
  @Input() showValidate: boolean;
  columnsToAccDisplay = ['Month', 'band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  columnsToDisplay2 = ['description', 'band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  selectedFilter: number;
  showLoader: boolean = true;
  ccDataSource: any;
  showLoaderCC: boolean;
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
  tabIndex: any = 0;
  enabledCCView: any;
  enabledACCView: any;
  enableLoadingMsg1: boolean = false;
  enableLoadingMsg2: boolean = false;
  ccDetails: any;

  enabledNoDataMsg = false;
  enabledACCNoDataMsg = false;
  dept: string;
  disabledYear: boolean = true;
  validateButton: boolean = false;
  status: string;



  constructor(
    public dialogRef: MatDialogRef<AccdialogComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService, private spinner: NgxSpinnerService, private notification: NotificationService) {
    var dd = this.date.getDate();
    this.cyear = this.date.getFullYear();
    this.deptCode = data.deptCode;
    this.dept = data.deptname;

  }

  ngOnInit() {

    this.onTabChangeEvent(0);

  }

  onTabChangeEvent(index: any) {
    this.tabIndex = index;
    if (index === 0) {
      this.enabledCCView = 'Enabled';
      this.showLoaderCC = true;
      this.ccDataSource = new MatTableDataSource([]);
      this.fetchCurrentCCCalc(this.deptCode);
    } else if (index === 1) {
      //this.checkDate();

      this.yeardropdown();
      this.enabledACCView = 'Enabled';

      // this.getCCValidate(this.deptCode, this.cyear);
      // setTimeout(() => {
        this.fetchActualCC(this.deptCode, this.cyear);
      // }, 200);
    }

  }
  fetchCurrentCCCalc(deptCode: any) {
    this.enableLoadingMsg1 = true;
    this.dashboardService.getCurrentCostCaseCalc<costcasecal[]>(deptCode).subscribe((data: any) => {
      ////console.log(data.status)
      if (data.status == 'OK') {
        this.enableLoadingMsg1 = false;
        this.enabledNoDataMsg = true;
      }
      else {
        this.pushCCData(data);
      }
      //////console.log(data[0].status)
      ////console.log(data)
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
  }

  // getKey(key) {
  //   return this.ccJSON[key]
  // }

  yeardropdown() {
    var max = new Date().getFullYear(),
      min = max - 4;
    // max = max + 1;
    this.selectedFilter = max;
    for (var i = min; i <= max; i++) {
      this.availableYears.push({ "id": i });
    }
  }
  fetchActualCC(deptcode: any, year: any) {
    this.showLoader = true;
    this.enableLoadingMsg2 = true;
    this.disabledYear = true;
    this.dashboardService.getActualCostCase<actualCostCase[]>(deptcode, year).subscribe((data: actualCostCase[]) => {
      this.showLoader = false;
      this.disabledYear = false;
      if(data['april']['validation']){
        this.showValidate = true;
      }

      this.pushCalcData(data);


    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));

  }
  getCCValidate(deptcode: any, year: any) {
    this.showLoader = true;
    var mm = this.date.getMonth() + 1;
    this.enableLoadingMsg2 = true;
    this.disabledYear = true;
    this.dashboardService.getActualCostCaseValidate<actualCostCase[]>(deptcode, year).subscribe((data: any) => {
      this.showLoader = false;
      this.disabledYear = false;
      if (data[0].ccValidation == 'NOT_VALIDATED' && mm == 1) {

        this.showValidate = true;

      }
      else
        this.showValidate = false;
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));



  }

  pushCalcData(data: actualCostCase[]) {

    let filteredOBJ = []
    Object.keys(data).forEach(e => {
      if (data[e] == null) {
        this.enabledACCNoDataMsg = true;
        this.enableLoadingMsg2 = false;
      }
      else {
        data[e]['Month'] = e;
        filteredOBJ.push(data[e])
      }
    })
    if (this.accDataSource.data !== null) {
      this.enableLoadingMsg2 = false;
    }

    this.accDataSource = new MatTableDataSource(filteredOBJ);

  }

  getAccData(item) {
  //  console.log('year'+this.selectedFilter)
  //  console.log(item)
    // this.getCCValidate(this.deptCode, item.value);
    // setTimeout(() => {
      //this.fetchActualCC(this.deptCode, this.cyear);
      this.fetchActualCC(this.deptCode, this.selectedFilter);
    // }, 200);

  }
  checkDate() {
    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    ////console.log(this.validateButton)
    if (mm == 1) {
      this.showValidate = true;

    }
    else
      this.showValidate = false;

  }

  ValidateButton() {


    this.ccDetails = {
      'deptcode': this.deptCode,
      'year': this.selectedFilter
    }

    this.spinner.show();
    this.dashboardService.postCCValidate(this.ccDetails).subscribe((data: any) => {
      this.spinner.hide();
      ////console.log(data.value)
      this.openSnackBar(data.value);

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }
  openSnackBar(status: any) {

    if (status == 'VALIDATED') {
      this.notification.showSnackBar('Cost Case Validated');
      this.showValidate = false;

    } else {
      this.notification.showSnackBar('Cost Case not Validated');

    }
  }
  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);

  }
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.accDataSource.paginator = this.paginator;
    this.accDataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  setStep(index: number) {
    this.step = index;
  }


  //  Filter Function
  applyFilter(filterValue: string) {
    this.accDataSource.filter = filterValue.trim().toLowerCase();

    if (this.accDataSource.filteredData.length == 0) {
      this.enabledACCNoDataMsg = true
    } else {
      this.enabledACCNoDataMsg = false;

    }

  }

}

