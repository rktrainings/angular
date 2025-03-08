import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttritionComponent } from '../attrition/attrition.component';
import { AttritionService } from 'src/app/services/attrition.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-attrition-commentbox',
  templateUrl: './attrition-commentbox.component.html',
  styleUrls: ['./attrition-commentbox.component.scss']
})
export class AttritionCommentboxComponent implements OnInit {

  comment: string;
  obj: any;
  role: any;
  constructor(public dialogRef: MatDialogRef<AttritionComponent>, public attritionservice: AttritionService, public userdetails: UserDetailsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.obj={
    //   empid: data.empid,
    //   empname: data.empname,
    //   role:userdetails.getHighestRole(), 
    //   comments:this.comment,
    //   deptCode: data.deptCode,
    //   deptName: data.deptName,
    //   supId: data.supId,
    //   supName: data.supName,
    //   empMailId: data.empMailId,
    //   managerMailId: data.managerMailId
    // }
    this.obj = this.data;
    this.role = userdetails.getHighestRole()


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

      if (this.role == 'GRBEO' || this.role == 'ADMIN') {
        this.obj.backfillApproval = 'Approved'
        this.obj.backfillApprovalComments = this.comment;
      } else {
        this.obj.backfillApproval = 'InProgress'
        this.obj.backfillEnableComments = this.comment;
      }
      this.attritionservice.postServiceRequest(this.obj,this.role).subscribe((data: any) => {
        this.data = data;

        //////////console.log(data);
      });

      // location.reload();

      this.dialogRef.close();

    }
  }
  onNoClick(): void {
    this.dialogRef.close();

  }


}
