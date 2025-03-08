import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TabularViewComponent } from '../tabular-view/tabular-view.component';
import lossReasonJSON from 'src/assets/data/my-team/lossReason.json';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-add-resignation',
  templateUrl: './add-resignation.component.html',
  styleUrls: ['./add-resignation.component.scss']
})
export class AddResignationComponent implements OnInit {
  minDate = new Date();
  private maxDate = new Date();
  lossReason = lossReasonJSON;
  private dor: Date = new Date();
  private lwd = new Date();
  resignationData = {}
  private reason: string = "";
  serializedDate = new FormControl((new Date()).toISOString());
  LWDenabled: boolean = true;
  constructor(public dialogRef: MatDialogRef<TabularViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService,
    public userDetails: UserDetailsService,
    private notification: NotificationService) {


    this.minDate.setDate(this.dor.getDate());
  }

  ngOnInit() {
    if (this.data)
      this.data['comments'] = null
    this.data.dor = null;
    this.data.lwd = null;
    this.data.reason = null;
  }

  isDisable() {
    if (this.data.reason)
      if (this.data.reason.length > 0 && this.data.dor && this.data.lwd) {
        return false;
      }
    return true;
  }
  onSubmit() {
    this.dor = this.data.dor;
    this.lwd = this.data.lwd;

    let dorString = this.dor.getFullYear() + '-' +
      ('0' + (this.dor.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dor.getDate()).slice(-2);


    let lwdString = this.lwd.getFullYear() + '-'
      + ('0' + (this.lwd.getMonth() + 1)).slice(-2)
      + '-' + ('0' + this.lwd.getDate()).slice(-2)

    this.resignationData = {
      empId: this.data['empId'],
      employeeName: this.data['employeeName'],
      dor: dorString,
      lwd: lwdString,
      lossReason: this.data.reason
    }
    this.commonService.postServiceRequest(environment.ADD_RESIGNATION, this.resignationData).subscribe(data => {
      this.data.lwd = lwdString;
      this.notification.showSnackBar('Resignation Added Successfully !!')
    })
    this.dialogRef.close();
  }

  enableLWD(date) {
    this.LWDenabled = false;
    this.data.dor = date.value;
    this.minDate.setDate(date.value.getDate());
    this.minDate.setMonth(date.value.getMonth())
    this.minDate.setFullYear(date.value.getFullYear())
    this.data.lwd = date.value;
  }

  onChangeLWD(date) {
    this.data.lwd = date.value;
  }
  close(): void {

    this.data.dor = null;
    this.data.lwd = null;
    this.data.reason = null;
    this.dialogRef.close();
  }


}
