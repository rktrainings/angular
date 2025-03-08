import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttritionComponent } from '../attrition/attrition.component';
import { AttritionService } from 'src/app/services/attrition.service';

@Component({
  selector: 'app-attrition-approve-commentbox',
  templateUrl: './attrition-approve-commentbox.component.html',
  styleUrls: ['./attrition-approve-commentbox.component.scss']
})
export class AttritionApproveCommentboxComponent implements OnInit {

  comment: string;
  obj: any;
  constructor(public dialogRef: MatDialogRef<AttritionComponent>, public attritionservice: AttritionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.obj = {
    //   empId: data.empid,
    //   empName: data.empName,
    //   approvalComments: this.comment,
    //   supId: data.supId,
    //   supName: data.supName,
    //   empMailId: data.empMailId,
    //   managerMailId: data.managerMailId
    // }
    this.obj = this.data;
  }

  ngOnInit() {

  }

  disableSubmit(){
    if(this.comment.length < 1){
      return true;
    }
    else{
      return false;
    }
  }
  onSubmit() {
    if (this.comment.length > 0) {
      this.obj.backfillApproval = 'Approved';
      this.obj.backfillApprovalComments = this.comment;
      // this.obj.approvalComments = this.comment;
      this.attritionservice.putServiceApproval(this.obj).subscribe((data: any) => {
        //////////console.log(data);
        this.data=data
      });
      // location.reload();
      this.dialogRef.close();


    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
