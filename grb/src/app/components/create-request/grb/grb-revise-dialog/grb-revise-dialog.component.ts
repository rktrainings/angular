import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { CreateRequestGrbService } from 'src/app/services/create-request-grb.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-grb-revise-dialog',
  templateUrl: './grb-revise-dialog.component.html',
  styleUrls: ['./grb-revise-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class GrbReviseDialogComponent implements OnInit {
  grbDetails: any;
  internalDetails: any = {};
  completeDetails: any;
  comment: string = "";
  empId: string;
  enableSubmit: boolean;
  showLoader: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 7;
  roomsFilter: any = {};
  currentData: any = {};
  submitStatus = "";
  newDate: any = "";
  todayDate: Date = new Date();
  loadingText: string;
  constructor(private router: Router, private createRequestGrb: CreateRequestGrbService,

    public dialogRef: MatDialogRef<GrbReviseDialogComponent>,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private notification: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.grbDetails = data;
  }

  ngOnInit() {
  }

  populateDetails() {
    this.loadingText = 'Loading';
    this.roomsFilter.date = '';
    this.comment = '';
    this.checkEnable();
    this.spinner.show();
    if (this.empId) {
      this.createRequestGrb.getEmpDetails(this.empId, this.grbDetails.band).subscribe((data: any) => {
        this.spinner.hide()
        this.internalDetails = data;

        if (data.response != 'SUCCESS') {
          // this.snackBar.open(data.response, 'Close', {
          //   duration: this.durationInSeconds * 1000,
          //   panelClass: ['mat-snackbar'],
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          // });
          this.notification.showSnackBar(data.response);
        }
      });

    }

  }

  onSubmit() {
    this.loadingText = 'Submitting';
    this.spinner.show();
    this.currentData = this.getData();
    this.createRequestGrb.submitRequestGrbRevise(this.currentData).subscribe((data: any) => {
      this.spinner.hide();
      this.submitStatus = data.status;

      this.openSnackBar(this.submitStatus);

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();

    }));


  }
  getData(): any {
    let data = {
      metronumber: this.grbDetails.metroNumber,
      grbNumber: this.grbDetails.grbNumber,
      metroDeptCode: this.grbDetails.deptCode,
      metroDeptName: this.grbDetails.deptName,
      metroBand: this.grbDetails.band,
      empId: this.empId,
      empName: this.internalDetails.nominatedEmpName,
      empDeptName: this.internalDetails.empDeptName,
      empBand: this.internalDetails.empBand,
      empSupId: this.internalDetails.supId,
      empSupName: this.internalDetails.supName,
      empDeptCode: this.internalDetails.empDeptCode,
      ted: this.formatDate(this.roomsFilter.date),
      comments: this.comment,
    }
    return data;
  }

  formatDate(date): any {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  public onDate(event): void {
    this.roomsFilter.date = event;


  }

  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);

    // this.snackBar.open(CommonMessageProperties.SERVER_ERROR_MESSAGE, 'Close', {
    //   duration: this.durationInSeconds * 1000,
    //   panelClass: ['mat-snackbar'],
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }

  openSnackBar(status: any) {

    if (status == 'SUCCESS') {
      this.nullifyData();
      this.notification.showSnackBar(CommonMessageProperties.SUCCESS_SUBMITTED_REQUEST);
      // this.snackBar.open('Success...!!! Request is submitted', 'Close', {
      //   duration: this.durationInSeconds * 1000,
      //   panelClass: ['mat-snackbar'],
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,        
      // });
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 500)
    } else {
      this.notification.showSnackBar(CommonMessageProperties.FAILED_SUBMITTED_REQUEST);

      // this.snackBar.open('Failed...!!! Please re-submit the request', 'Close', {
      //   duration: this.durationInSeconds * 1000,
      //   panelClass: ['mat-snackbar'],
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      // });
    }
  }
  nullifyData() {
    this.grbDetails = {};
    this.internalDetails = {};
    this.currentData = {};
  }

  checkEnable() {
    if (this.comment.length > 0 && this.empId && this.roomsFilter.date && this.internalDetails.empBand) {
      return true;
    }
    else {
      return false;
    }
  }

  close() {
    this.dialogRef.close(false);

  }
}
