import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TabularViewComponent } from '../tabular-view/tabular-view.component';
import dropdown from 'src/assets/data/my-team/dropdown.json';
import { MySpanService } from 'src/app/services/my-span.service';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-my-team',
  templateUrl: './edit-my-team.component.html',
  styleUrls: ['./edit-my-team.component.scss']
})
export class EditMyTeamComponent implements OnInit {
  IOT = ['APAC', 'AG', 'EMEA', 'INTERNAL']
  dropdown = [];
  dropdownSubProcess = []
  empId: string;

  editRequest = {
    empid: "",
    empname: "",
    deptcode: "",
    oldIot: "",
    updatedIot: "",
    oldsubProcess: "",
    updatedsubProcess: "",
    oldtower: "",
    updatedtower: ""
  }

  constructor(
    public dialogRef: MatDialogRef<TabularViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private mySpanService: MySpanService, private notification: NotificationService) {
    //////////console.log(data)
    this.editRequest['empid'] = this.data['empId'];
    this.editRequest['empname'] = this.data['employeeName'];
    this.editRequest['deptcode'] = this.data['deptCode'];
    this.editRequest['oldIot'] = this.data['geo'];
    this.editRequest['oldsubProcess'] = this.data['subProcess'];
    this.editRequest['oldtower'] = this.data['tower'];


  }

  ngOnInit() {
    //////////console.log(this.data)
    this.dropdown = dropdown;
    this.dropdown.map(item => {
      if (item.tower == this.data.tower) {
        this.dropdownSubProcess = item.subProcess
      }
    })
    //////////console.log(this.dropdownSubProcess)
  }
  isDisable() {
    if (this.editRequest['updatedIot'].length > 0 &&
      this.editRequest['updatedsubProcess'].length > 0 &&
      this.editRequest['updatedtower'].length > 0) {
      return false;
    }
    return true;

  }

  onNoClick(): void {
    //////////console.log(this.data)
    this.dialogRef.close();
  }

  filterSubProcess(item) {
    this.dropdownSubProcess = item.subProcess;
    this.editRequest['updatedsubProcess'] = "";
  }

  onSubmit() {
    // //////////console.log(this.data)


    this.mySpanService.postEditedData(environment.EDIT_MY_SPAN, this.editRequest).subscribe(data => {
      //////////console.log(data)
      this.data.geo = this.editRequest['updatedIot'];
      this.data.subProcess = this.editRequest['updatedsubProcess'];
      this.data.tower = this.editRequest['updatedtower'];
      this.notification.showSnackBar('Data Updated Successfully !!')
    })
    this.dialogRef.close();
  }
}
