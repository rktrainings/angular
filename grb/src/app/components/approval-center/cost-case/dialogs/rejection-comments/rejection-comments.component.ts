import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from 'src/app/services/common-service.service';
import { CostCaseService } from 'src/app/services/cost-case.service';
import { CostCaseApprovalComponent } from '../../cost-case-approval/cost-case-approval.component';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejection-comments',
  templateUrl: './rejection-comments.component.html',
  styleUrls: ['./rejection-comments.component.scss']
})
export class RejectionCommentsComponent implements OnInit {

  comments:any="";
  constructor(private router:Router,private notification:NotificationService,private ngxSpinner:NgxSpinnerService,public dialogRef: MatDialogRef<CostCaseApprovalComponent>, private _location: Location,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private costCaseService:CostCaseService,private commonService:CommonService) { }

  ngOnInit() {
  }
  onSubmitClick(){
    ////console.log(this.comments);
    ////console.log(this.data);
    let costCaseData=this.data['data'];
      costCaseData['year']= new Date().getFullYear();
      costCaseData['bizopsActionDate']=this.commonService.formatDate(new Date());
      costCaseData['bizopsActionComments']=this.comments;
    this.ngxSpinner.show();
    ////console.log(costCaseData);
    

    this.costCaseService.rejectCostCaseRequest(costCaseData).subscribe((data)=>{
      ////console.log(data);
      if(data['success']){
        this.notification.showSnackBar(data['msg'])
      }else{
        this.notification.showSnackBar(data['msg'])
      }
      this.ngxSpinner.hide();
      this.dialogRef.close();
      this.router.navigateByUrl('/approval-center/cost-case')
    })
  }
}
