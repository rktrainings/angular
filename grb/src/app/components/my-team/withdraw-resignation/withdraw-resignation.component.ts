import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TabularViewComponent } from '../tabular-view/tabular-view.component';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-withdraw-resignation',
  templateUrl: './withdraw-resignation.component.html',
  styleUrls: ['./withdraw-resignation.component.scss']
})

export class WithdrawResignationComponent implements OnInit {

  withdrawReason = { empId: '', employeeName: '', comments: '', lwd: null }
  comments: string = '';
  constructor(public dialogRef: MatDialogRef<TabularViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    private userDetails: UserDetailsService,
    private notification: NotificationService) {
    if (this.data.comments) {
      this.comments = this.data.comments;
    }
  }

  ngOnInit() {
  }
  onSubmit() {
    this.comments = this.data.comments
    
  
    this.withdrawReason = {
      empId: this.data['empId'],
      employeeName: this.data['employeeName'],
      comments: this.comments,
      lwd: this.data['lwd']
    }
    this.dialogRef.close();
    this.commonService.postServiceRequest(environment.WITHDRAW_RESIGNATION, this.withdrawReason).subscribe(data => {
      //////////console.log(data)
      this.data.lwd = null;
      this.notification.showSnackBar('Resignation Withdrawal Successful !!')

    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
