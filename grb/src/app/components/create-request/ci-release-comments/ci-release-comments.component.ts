import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CiReleaseService } from 'src/app/services/ci-release.service';
import { CommonService } from 'src/app/services/common-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CiReleaseComponent } from '../ci-release/ci-release.component';

@Component({
  selector: 'app-ci-release-comments',
  templateUrl: './ci-release-comments.component.html',
  styleUrls: ['./ci-release-comments.component.scss']
})
export class CiReleaseCommentsComponent implements OnInit {

  comments: any = "";
  constructor(public dialogRef: MatDialogRef<CiReleaseComponent>,private spinner:NgxSpinnerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private ciReleaseService:CiReleaseService,
    private notification:NotificationService,private router:Router) {
      ////console.log(data);
      
     }


  ngOnInit() {
  }
  onSubmitClick(){
    this.data.comments=this.comments;
    this.spinner.show();
    this.ciReleaseService.submitCIRelease(this.data).subscribe(data=>{
      this.spinner.hide();
      ////console.log(data);
     this.dialogRef.close();
      if(data['value']=='SUCCESS'){
        this.notification.showSnackBar('Request Created !!');
        this.router.navigateByUrl('/main-menu')
      }
    })
  }
}
