import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { GrbArchiveService } from 'src/app/services/grb-archive.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';

@Component({
  selector: 'app-grb-archive-delete-dialog',
  templateUrl: './grb-archive-delete-dialog.component.html',
  styleUrls: ['./grb-archive-delete-dialog.component.scss']
})
export class GrbArchiveDeleteDialogComponent implements OnInit {

  archiveDetails: ApprovalCenterDetails;
  constructor(public dialogRef: MatDialogRef<GrbArchiveDeleteDialogComponent>, private grbArchiveService: GrbArchiveService,
    @Inject(MAT_DIALOG_DATA) public data: any, private notification: NotificationService,private spinner: NgxSpinnerService) {
      this.archiveDetails = this.data;
     }

  ngOnInit() {
    console.log(this.archiveDetails);
    
  }

  delete() {  
    this.spinner.show();
    this.grbArchiveService.deleteMetro(this.archiveDetails).subscribe(data=>{
      console.log(data);
      this.spinner.hide();
      if(data['value'] == 'SUCCESS'){
        this.notification.showSnackBar('Successfully deleted the metro');
        this.dialogRef.close(this.archiveDetails);
      }else{
        this.notification.showSnackBar('Sorry!! Please try again after some time!!');
      }
      //this.dialogRef.close(true);
      
    })

  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
