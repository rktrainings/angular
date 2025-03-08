import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateRequestGrbService } from 'src/app/services/create-request-grb.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]

})
export class SwapComponent implements OnInit {

  swapForm: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  tollRoutName: string;
  durationInSeconds: number = 7;
  mainSwapData: any;
  employeeDetails: any
  employeeStatus: any;
  swapCreateRequest: any;
  transferEffectiveDate: any;
  minDate: Date;
  maxDate: Date;
  disableSubmit: boolean = true;
  employeeId: any;
  enableLoadingMsg: boolean;
  band: string;

  constructor(public dialogRef: MatDialogRef<SwapComponent>,private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private createRequestGrbService: CreateRequestGrbService,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private notification: NotificationService) {
    this.mainSwapData = data;
    this.resetForm();
    // this.swapForm = new FormGroup({
    //   empId: new FormControl('', Validators.required),
    //   empName: new FormControl('', Validators.required),
    //   deptName: new FormControl('', Validators.required),
    //   band: new FormControl('', Validators.required),
    //   supId: new FormControl('', Validators.required),
    //   supName: new FormControl('', Validators.required),
    //   transferDate: new FormControl('', Validators.required),
    // });
  }


  ngOnInit() {
    //this.enableLoadingMsg = true;
    let today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(today.getDate());
    this.maxDate.setMonth(today.getMonth() + 6);
    this.band = this.mainSwapData.band;
  }

  resetForm() {
    this.swapForm = new FormGroup({
      empId: new FormControl(this.employeeId, Validators.required),
      empName: new FormControl('', Validators.required),
      deptName: new FormControl('', Validators.required),
      band: new FormControl('', Validators.required),
      supId: new FormControl('', Validators.required),
      supName: new FormControl('', Validators.required),
      transferDate: new FormControl('', Validators.required),
    });
  }

  getEmpDetails(empId: any) {
    this.disableSubmit = true;
    this.employeeId = empId;
    this.enableLoadingMsg = true;
    this.spinner.show();
    this.createRequestGrbService.getSwapEmpDetails(empId,this.band).subscribe((data: any) => {
      this.spinner.hide();

      ////console.log('response', data);
      if (data.response === 'SUCCESS') {
        this.enableLoadingMsg = false;
        if (parseInt(data.band) <= parseInt(this.mainSwapData.band)) {
          this.employeeDetails = data;
          this.swapForm = new FormGroup({
            empId: new FormControl(empId, Validators.required),
            empName: new FormControl(data.empName, Validators.required),
            deptName: new FormControl(data.deptName, Validators.required),
            band: new FormControl(data.band, Validators.required),
            supId: new FormControl(data.supId, Validators.required),
            supName: new FormControl(data.supName, Validators.required),
            transferDate: new FormControl('', Validators.required),
          });

        } else {
          this.notification.showSnackBar(CommonMessageProperties.SWAP_BAND_VALIDATION);
          this.resetForm();
        }

      } else {
        this.employeeStatus = data.response;
        this.openSnackBar(this.employeeStatus);
      }
    });
  }

  handleTEDChange(event: any) {
    if (this.employeeDetails && event.target.value) {
      this.disableSubmit = false;
    }
  }

  buildSwapCreateRequest(formSubmitData: any) {
    const formatedDate = new Date(formSubmitData.transferDate);
    this.transferEffectiveDate = this.datepipe.transform(formatedDate, 'yyyy-MM-dd');
    this.swapCreateRequest = {
      metronumber: this.mainSwapData.metroNumber,
      grbNumber: this.mainSwapData.grbNumber,
      metroDeptCode: this.mainSwapData.deptCode,
      metroDeptName: this.mainSwapData.deptName,
      metroBand: this.mainSwapData.band,
      empId: formSubmitData.empId,
      empName: formSubmitData.empName,
      deptName: formSubmitData.deptName,
      band: formSubmitData.band,
      supId: formSubmitData.supId,
      supName: formSubmitData.supName,
      deptCode: this.employeeDetails.deptCode,
      supMailId: this.employeeDetails.supMailId,
      ted: this.transferEffectiveDate
    }
  }

  onSubmit(formSubmitData: any) {
    this.spinner.show();
    this.buildSwapCreateRequest(formSubmitData);
    this.createRequestGrbService.postSubmitSwapDetails(this.swapCreateRequest).subscribe((data: any) => {
    this.spinner.hide();

      if (data.status === 'SUCCESS') {
        this.openSnackBar(data.status);
      }
    });
  }


  openSnackBar(status: any) {
    if (status === 'SUCCESS') {
      this.notification.showSnackBar(CommonMessageProperties.SUCCESS_MESSAGE);
      this.dialogRef.close({
        event: 'close',
        response: status,
      });
    }else if(status === CommonMessageProperties.SWAP_ORP_ERROR_MESSAGE){
      this.openErrorSnackBar(status);
      this.resetForm();
    }
     else {
      this.notification.showSnackBar(status);
      this.resetForm();
    }

  }

  openErrorSnackBar(error:any) {
    this.snackBar.open(error, 'Close', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


}
