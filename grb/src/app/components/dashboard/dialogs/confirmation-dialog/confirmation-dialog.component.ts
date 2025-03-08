import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CommonService } from 'src/app/services/common-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  comments="";
  submitStatus = "";
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private notification: NotificationService, private spinner: NgxSpinnerService) {
    //////////console.log(data)
  }

  ngOnInit() {
  }

  onDelete() {
    //////////console.log(environment.CANCEL_GRB + this.data)
    this.spinner.show()
    let json={value:this.comments}
    this.commonService.postServiceRequest(environment.CANCEL_GRB + this.data.metroNumber,json).subscribe((data: any) => {
      this.spinner.hide()

      this.submitStatus = data.value;
      if (this.submitStatus == 'SUCCESS') {
        this.notification.showSnackBar('Request Deleted Successfully');
        window.location.reload();
      }
      else {
        this.notification.showSnackBar('Server Issue!! Please try again...');
      }
      this.dialogRef.close(this.data)

    })
  }
}
