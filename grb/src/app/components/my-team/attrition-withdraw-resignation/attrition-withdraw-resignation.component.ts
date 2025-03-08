import { Component, OnInit, Inject } from '@angular/core';
import { AttritionService } from 'src/app/services/attrition.service';
import { AttritionComponent } from '../attrition/attrition.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-attrition-withdraw-resignation',
  templateUrl: './attrition-withdraw-resignation.component.html',
  styleUrls: ['./attrition-withdraw-resignation.component.scss']
})
export class AttritionWithdrawResignationComponent implements OnInit {

  comment: string;
  obj: any;
  constructor(public dialogRef: MatDialogRef<AttritionComponent>, public service: AttritionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.obj = {
    //   empId: data.empid,
    //   empName: data.empName,
    //   withdrawComments: this.comment,
    //   supId: data.supId,
    //   supName: data.supName,
    //   managerMailId: data.managerMailId,
    //   deptCode: data.deptCode,
    //   deptName: data.deptName,
    //   lwd: data.lwd
    // }
    this.obj = this.data;
  }

  ngOnInit() {

  }
  onSubmit() {
    if (this.comment.length > 0) {
      // this.obj.dor = null;
      // this.obj.lwd = null;
      this.obj.withdrawComments = this.comment;
      this.service.postWithdrawResignation(this.obj).subscribe((data: any) => {
        //////////console.log(data);
        this.data = data;
        this.dialogRef.close(data);
      });
      // location.reload();
      // //////////console.log(this.obj);

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
