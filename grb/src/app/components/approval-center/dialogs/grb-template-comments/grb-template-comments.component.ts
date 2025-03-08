import { Component, OnInit, Optional, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { environment } from 'src/environments/environment';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { NotificationService } from 'src/app/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grb-template-comments',
  templateUrl: './grb-template-comments.component.html',
  styleUrls: ['./grb-template-comments.component.scss']
})
export class GrbTemplateCommentsComponent implements OnInit {

  commentsData: any;
  comments: any;
  commentsText: string;
  metroNo: string;
  commentsType: string;
  formType: string;
  status: string;
  commentsTitle: string
  showRejectContent: boolean = false;
  tollName: any;
  resStatus: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tollRoutName: string;
  durationInSeconds: number = 7;
  band: any;
  totalQty: any;
  templateData: any;
  activeTab: any;
  grbNumber: any;
  oldMetroNumber: any;
  formName: any;
  hireType: any;
  selectedQuarter: string;
  disableSubmit: boolean = true;

  constructor(public dialogRef: MatDialogRef<GrbTemplateCommentsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService,
    private spinner: NgxSpinnerService) {
    this.commentsType = data.commentsType;
    this.formType = data.formType;
    this.metroNo = data.metroNo;
    this.tollName = data.tollName;
    this.band = data.band;
    this.totalQty = data.totalQty;
    this.templateData = data.templateData;
    this.activeTab = data.activeTab;

    this.activatedRoute.queryParams.subscribe(params => {
      this.formName = params.formName;
      this.hireType = params.hireType;
      this.oldMetroNumber = params.oldMetroNumber;
      this.grbNumber = params.grbNumber;
    });

    if (this.commentsType == 'Reject')
      this.showRejectContent = true;
  }

  receiveQuarter($event) {
    this.selectedQuarter = $event;
    ////console.log('selectedQuarter', this.selectedQuarter);
  }

  ngOnInit() {
    switch (this.tollName) {
      case 'BM':
        this.tollRoutName = 'bm';
        break;
      case 'CC':
        this.tollRoutName = 'cc';
        break;
      case 'ORP':
        this.tollRoutName = 'orp';
        break;
      case 'UTE':
        this.tollRoutName = 'ute';
        break;
    }
  }

  filledTextArea() {

    if (this.comments) {
      if (this.formType == 'board') {
        if (this.selectedQuarter)
          this.disableSubmit = false;
        else
          this.disableSubmit = true;
      }
      else {
        this.disableSubmit = false;
      }
    } else {
      this.disableSubmit = true;
    }
  }

  onSubmitClick() {
    this.getStatus(this.commentsType);
    this.buildData();
    this.identifyAPICalls(this.formType);
    this.dialogRef.close();
  }


  onClickDelete() {
    this.getStatus(this.commentsType);
    this.buildData();
    this.identifyAPICalls(this.formType);
    this.dialogRef.close();
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  getStatus(type: any) {
    switch (type) {
      case 'Approved':
        this.status = 'APPROVED';
        break;
      case 'Reject':
        this.status = 'REJECTED';
        break;
      case 'Moreinfo':
        this.status = 'MORE_INFORMATION';
        break;
    }
  }

  buildData() {
    if (this.formType == 'tolls') {
      this.commentsData = {
        metroNumber: this.metroNo,
        comments: this.comments,
      }
    } else if (this.formType == 'board') {
      this.commentsData = {
        metroNo: this.metroNo,
        comments: this.comments,
        status: this.status,
        updatedBand: this.band,
        updatedQty: this.totalQty,
        boardApprovalQuarter: this.selectedQuarter
      }
    } else {
      this.commentsData = {
        metroNo: this.metroNo,
        comments: this.comments,
        status: this.status,
        updatedBand: this.band,
        updatedQty: this.totalQty,
      }
    }
  }

  identifyAPICalls(formType: any) {
    switch (formType) {
      case 'iot':
        this.allIOTSubmitAPICalls();
        break;
      case 'board':
        this.allBoardSubmitAPICalls();
        break;
      case 'bizops':
        this.allBizopsSubmitAPICalls(this.templateData, this.commentsType.toLowerCase());
        break;
      case 'aod':
        this.allAodSubmitAPICalls(this.templateData, this.commentsType.toLowerCase());
        break;
      case 'tolls':
        this.allTollsAPICalls();
        break;
      case 'swap':
        this.allSwapSubmitAPICalls(this.templateData);
        break;
    }
  }

  allTollsAPICalls() {
    switch (this.commentsType) {
      case 'Approved':
        this.allTollsApproveAPICalls(this.commentsData, this.tollName);
        break;
      case 'Moreinfo':
        this.allTollsMoreInfoAPICalls(this.commentsData, this.tollName);
        break;
    }
  }

  submitResponseStatus: string;
  allIOTSubmitAPICalls() {
    this.spinner.show();
    this.approvalCenterService.postAllIOTSubmitAPI(this.commentsData).subscribe((data: any) => {
      this.spinner.hide();
      this.status = data.value;
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  allBoardSubmitAPICalls() {
    this.spinner.show();
    ////console.log('commentsData', this.commentsData);
    let backFillData = JSON.parse(localStorage.getItem('backFillData'));
    let selectedEmployees = backFillData.filter(e => e.checked);
    this.commentsData['bfPaEmps'] = selectedEmployees.map(e => e.empId);
    this.approvalCenterService.postAllBoardSubmitAPI(this.commentsData).subscribe((data: any) => {
      this.spinner.hide();
      this.status = data.value;
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  allBizopsSubmitAPICalls(templateData: any, commentsType: any) {
    templateData['commentsByBizops'] = this.comments
    this.spinner.show()
    this.approvalCenterService.postAllBizopsSubmitAPI(templateData, commentsType).subscribe((data: any) => {
      this.spinner.hide()
      this.status = data.status;
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  allAodSubmitAPICalls(templateData: any, commentsType: any) {

    templateData['commentsByBizops'] = this.comments

    this.spinner.show()
    this.approvalCenterService.postAllAodSubmitAPI(templateData, commentsType).subscribe((data: any) => {
      this.spinner.hide()
      this.status = data.status;
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  allTollsApproveAPICalls(tollscommentsData: any, tollName: string) {
    this.spinner.show()
    this.approvalCenterService.putGRBTollsApprove(tollscommentsData, tollName).subscribe((data: any) => {
      this.status = data.status;
      this.spinner.hide()
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  allTollsMoreInfoAPICalls(tollscommentsData: any, tollName: string) {
    this.spinner.show()
    this.approvalCenterService.putGRBTollsMoreInfo(tollscommentsData, tollName).subscribe((data: any) => {
      this.status = data.status;
      this.spinner.hide();
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));
  }

  openSnackBar(status: any) {
    if (status == 'SUCCESS') {
      this.notification.showSnackBar(CommonMessageProperties.SUCCESS_MESSAGE);
      if (this.formType === 'tolls') {
        this.router.navigateByUrl(RoutingPathProperties.TOLLS_SUBMIT_SUCCESS + this.tollRoutName);
      } else if (this.formName === 'swap') {
        this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_APPROVAL_GRB);
      }
      else {
        this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_BASE + this.formType + '?activeTab=' + this.activeTab);
      }
    }
    else if (status == 'AOD request Approved Successfully') {
      this.notification.showSnackBar(CommonMessageProperties.AOD_SUCCESS_MESSAGE);
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_AOD_PAGE);
    }
    else {
      this.notification.showSnackBar(CommonMessageProperties.FAILED_MESSAGE);
    }

  }

  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
  }

  allSwapSubmitAPICalls(templateData: any) {
    templateData['commentsByBizops'] = this.comments
    this.approvalCenterService.postAllSwapSubmitAPI(this.status, this.grbNumber, this.oldMetroNumber, this.selectedQuarter, templateData).subscribe((data: any) => {
      this.status = data.status;
      this.openSnackBar(this.status);
    }, ((httpError: HttpErrorResponse) => {
      this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
      // this.openErrorSnackBar();
    }));


  }

}
