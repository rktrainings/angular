import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { CommentsDialogComponent } from 'src/app/components/dashboard/dialogs/comments-dialog/comments-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-approve-grb-dialog',
  templateUrl: './approve-grb-dialog.component.html',
  styleUrls: ['./approve-grb-dialog.component.scss']
})
export class ApproveGrbDialogComponent implements OnInit {

  grbDetails: any = {};
  internalDetails: any = {};
  completeDetails: any;
  comment="";
  empId: string;
  enableSubmit: boolean;
  showLoader: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  loadingText: string;
  constructor(private router: Router, private approvalCenterGrbRevise: ApprovalCenterGrbService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ApproveGrbDialogComponent>,
    public dialog: MatDialog,
    private notification: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private userDetails: UserDetailsService) {
    this.grbDetails = data.grbDetails;
    this.internalDetails = data.internalDetails;
   
   
  }

  ngOnInit() {
   
  }

  checkEnable() {
    if (this.userDetails.getRoles().includes('GRBEORD')) {
      return false;
    } else {
      if (this.comment.length > 0) { 
        return true;
       }
      else { 
        return false; 
      }
    }
  }


  approveGrbRevise() {
   this.loadingText='Approving';
   this.spinner.show();
    this.completeDetails = {
      'metroNumber': this.grbDetails.metroNumber,
      'grbNumber': this.grbDetails.grbNumber, 
      'action': 'Approve', 
      'bizopsRemarks': this.comment
    }

    this.approvalCenterGrbRevise.postApproveReject(this.completeDetails).subscribe((data: any) => {
      this.spinner.hide();
     this.openSnackBar(data.status);

    });
    

  }

  rejectGrbRevise() {
    this.loadingText='Rejecting';
    this.spinner.show();
    this.completeDetails = {
      'metroNumber': this.grbDetails.metroNumber,
      'grbNumber': this.grbDetails.grbNumber, 
      'action': 'Reject', 
      'bizopsRemarks': this.comment
    }

    this.approvalCenterGrbRevise.postApproveReject(this.completeDetails).subscribe((data: any) => {
      this.spinner.hide();
      this.openSnackBar(data.status);
    });
  }

  openSnackBar(status: any) {

    if (status == 'SUCCESS') {
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

  close() {
    this.dialogRef.close(false);

  }
}
