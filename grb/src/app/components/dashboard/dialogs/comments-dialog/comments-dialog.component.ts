import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PendingDialogComponent } from '../pending-dialog/pending-dialog.component';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss']
})
export class CommentsDialogComponent implements OnInit {

  commentsData: any;
  requiredInfo: any;
  comments: any;
  hideFields: boolean = false;
  moreInfoData: any;
  enabledMoreInfo: boolean = false;
  displayCommentsInfo: boolean = false;
  displayCommentsBox: boolean = false;
  enabledButton: boolean = false;
  requiredInfoText: string;
  commentsText: string;
  displayNoAvailableData: boolean = false;
  inforequired: string;
  providedcomments: string = '';

  toll: any;
  color: any;
  metroNumber: string;
  resData: any;
  durationInSeconds: number = 7;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  status: any;


  constructor(public dialogRef: MatDialogRef<PendingDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private notification: NotificationService) {

    data.metroFields.filter((res => {
      if (res.name === 'metroNumber') {
        this.metroNumber = res.value;
      }
    }));
    this.toll = data.toll;
    this.requiredInfo = data.responseData;
    this.comments = data.comments;
    this.color = data.color;

    if (this.color == 'Orange') {
      if (this.requiredInfo.inforequired !== undefined) {
        this.requiredInfo = data.responseData.inforequired;
        //////////console.log('reqinfo:', this.requiredInfo);

      }
      this.displayCommentsBox = true;
      this.enabledButton = true;
    } else if (this.color = 'Green') {
      this.displayCommentsInfo = true;
      if (this.requiredInfo !== undefined && this.requiredInfo !== "") {
        this.requiredInfo = data.responseData;
        this.comments = data.comments;
      } else if (this.requiredInfo === "") {
        this.displayNoAvailableData = true;
      }
    }
  }

  ngOnInit() {

  }

  onSubmitClick() {
    const commentsData = {
      'comments': this.providedcomments,
      'toll': this.toll,
      'metro': this.metroNumber
    }
    ////console.log('commentsData:', commentsData);
    //this.resData = 'SUCCESS';
    this.dashboardService.putServiceMoreInfoComments(commentsData).subscribe((data: any) => {
      ////console.log(data);
      this.resData = data;
      this.status = data.value;
      this.openSnackBar(this.status);
      this.dialogRef.close({
        event: 'close',
        data: this.status,
        toll: this.toll,
        metro: this.metroNumber
      });
    });
  }

  openSnackBar(status: any) {
    if (status == 'SUCCESS') {
      this.notification.showSnackBar(CommonMessageProperties.SUCCESS_MESSAGE);
    } else {
      this.notification.showSnackBar(CommonMessageProperties.FAILED_MESSAGE);
    }

  }

}
