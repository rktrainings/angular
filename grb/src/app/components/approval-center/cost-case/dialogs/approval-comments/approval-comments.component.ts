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
  selector: 'app-approval-comments',
  templateUrl: './approval-comments.component.html',
  styleUrls: ['./approval-comments.component.scss']
})
export class ApprovalCommentsComponent implements OnInit {

  comments:any="";
  constructor(private router:Router,private notification:NotificationService,
    private ngxSpinner:NgxSpinnerService,public dialogRef: MatDialogRef<CostCaseApprovalComponent>, 
    private _location: Location,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private costCaseService:CostCaseService,private commonService:CommonService) { }

  ngOnInit() {
  }
  onSubmitClick(){
    ////console.log(this.comments);
    ////console.log(this.data);
    let costCaseData=this.data['data'];
    costCaseData.map(e=>{
      e['year']= new Date().getFullYear();
      e['bizopsActionDate']=this.commonService.formatDate(new Date());
      e['bizopsActionComments']=this.comments;
      if(e['costCaseType'].includes('DEBAND')){
        e['costCaseType']='DEBAND'
      }
    })
    this.ngxSpinner.show();
    ////console.log(costCaseData);
    
    this.costCaseService.approveCostCaseRequest(costCaseData).subscribe((data)=>{
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
