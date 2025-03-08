import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CiReleaseService } from 'src/app/services/ci-release.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CiReleaseViewComponent } from '../ci-release-view/ci-release-view.component';

@Component({
  selector: 'app-ci-release-approver-comments',
  templateUrl: './ci-release-approver-comments.component.html',
  styleUrls: ['./ci-release-approver-comments.component.scss']
})
export class CiReleaseApproverCommentsComponent implements OnInit {
  comments = "";
  status = "";
  ciReleaseData = {}
  constructor(private router:Router,private spinner:NgxSpinnerService,public dialogRef: MatDialogRef<CiReleaseViewComponent>,private notification:NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private ciRelease: CiReleaseService) {
    ////console.log(data);
    this.ciReleaseData = data.ciReleaseData;
    this.status = data.status
  }

  ngOnInit() {
  }

  onSubmitClick() {
    let json = {
      reqId: this.data.ciReleaseData.requestId,
      comments: this.comments,
      status: this.status == 'Approve' ? 'APPROVED' : 'CANCELLED'
    }
    this.spinner.show();
    this.ciRelease.updateRequest(json).subscribe(data => {
    this.spinner.hide();
    this.dialogRef.close();
      if(data['value']=='SUCCESS'){
        if(json['status'].toLowerCase().includes('cancel')){
          json['status']='Rejected'
        }
        this.notification.showSnackBar('Request '+json['status'])
        this.router.navigateByUrl('/approval-center/ci-release')
      }
    })
  }

}
