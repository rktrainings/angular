import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { CreateRequestGrbService } from 'src/app/services/create-request-grb.service';
import { GrbComponent } from 'src/app/components/create-request/grb/grb.component';
import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-approval-band-change-dialog',
  templateUrl: './approval-band-change-dialog.component.html',
  styleUrls: ['./approval-band-change-dialog.component.scss']
})
export class ApprovalBandChangeDialogComponent implements OnInit {
  approvalForm: FormGroup;
  deptCode: string;
  deptName: string;
  metroNum: string;
  grbNum: string
  currentBand: string;
  grbDetails: any;
  bandchangeData: any;
  requestedBand: string;
  private hideFileAction: boolean;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GrbComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private approvalCenterGrbRevise: ApprovalCenterGrbService,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService, private notification: NotificationService, private router: Router,
    private userDetails: UserDetailsService) {
    //////console.log(data);
    //this.grbDetails = data;
    // this.bandChangeService.setGrbDetails(data);
    this.deptCode = this.data.deptCode;
    this.deptName = this.data.deptName;
    this.metroNum = this.data.metroNumber;
    this.grbNum = this.data.grbNumber;
    this.currentBand = this.data.band;
    this.requestedBand = this.data.reqBand;
    this.resourceContractType = this.data.resourceType;


  }

  bandComments: string = '';
  newBand: string;
  resourceContractType: string;
  fileName: string;
  storedFile: any;
  acceptbandarray: any;
  bandChangeDetails: any;
  status: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  loadingText: string;

  durationInSeconds: number = 7;


  ngOnInit() {
    this.approvalForm = this.formBuilder.group({
      deptCode: [{ value: '', disabled: true },],
      metroNum: [{ value: '', disabled: true },],
      deptName: [{ value: '', disabled: true },],
      grbNum: [{ value: '', disabled: true },],
      currentBand: [{ value: '', disabled: true },],
      requestedBand: [{ value: '', disabled: true },],
      bandComments: ['', Validators.required],
      resourceContractType: [{ value: '', disabled: true },],


    });
  }

  close() {

    this.dialogRef.close();
  }

  onAcceptClick() {

    this.bandChangeDetails = {
      'metroNum': this.data.metroNumber,
      'grbNum': this.data.grbNumber,
      'action': 'Approve',
      'currentBand': this.data.band,
      'reqBand': this.data.reqBand,
      'bizopsremarks': this.bandComments
    }
    this.loadingText = "Approving";
    this.spinner.show();
    this.approvalCenterGrbRevise.postBandChangeApproveReject(this.bandChangeDetails).subscribe((data: any) => {
      this.spinner.hide();
      this.status = data.bandChangeStatus;
      this.openSnackBar(this.status);

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));

  }
  onRejectClick() {
    this.bandChangeDetails = {
      'metroNum': this.data.metroNumber,
      'grbNum': this.data.grbNumber,
      'action': 'Reject',
      'currentBand': this.data.band,
      'reqBand': this.data.reqBand,
      'bizopsremarks': this.bandComments,


    }
    this.loadingText = "Rejecting";
    
    this.spinner.show();
    this.approvalCenterGrbRevise.postBandChangeApproveReject(this.bandChangeDetails).subscribe((data: any) => {
      this.spinner.hide();
      this.status = data.bandChangeStatus;
      this.openSnackBar(this.status);

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  openSnackBar(status: any) {

    if (status == 'Band Change Approved') {
      //this.hiringFormService.nullifyTemplateData();
      this.notification.showSnackBar('Band Change Approved');

    } else {
      this.notification.showSnackBar('Band Change Rejected');

    } setTimeout(() => {
      this.dialogRef.close(true);
    }, 500)
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

  buttonActions() {

    if (this.userDetails.getRoles().includes('GRBEORD')) {
      return true;
    } else {
      return this.bandComments.length > 0 ? false : true
    }

  }


}
