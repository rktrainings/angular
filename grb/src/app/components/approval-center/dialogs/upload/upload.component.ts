import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import SampleFormatDownload from '../../../../../assets/data/approval-center/sample-format.json'
import { ExcelService } from 'src/app/services/excel.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  sampleFormatDownload = [];
  subscription: any;
  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;
  percentage: number;
  fileName: string;
  durationInSeconds: number = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  role: any;

  constructor(public dialogRef: MatDialogRef<UploadComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private approvalCenterService: ApprovalCenterService,
    private excelService: ExcelService,
    private notification: NotificationService) {
    this.role = data;

  }

  ngOnInit() {
    //console.log('upload component')
    this.sampleFormatDownload = SampleFormatDownload;
    // this.subscription = this.approvalCenterService.getStatusChangeEmitter().subscribe(status => {
    //   //console.log('upload:', status)
    //   if (status === true) {
    //     this.uploadSuccess = status;
    //   } else {
    //     this.uploadFailed = status;
    //   }
    // });
    // this.subscription = this.approvalCenterService.getPercentChangeEmitter().subscribe(percent => {
    //   this.percentage = percent;
    // });

  }

  showProgressBar: boolean = false;
  fileUpload(files: File[]) {
    for (let file of files) {
      this.fileName = file.name;
    }
    // this.approvalCenterService.basicUpload(files, this.role);

    this.uploadSuccess = false;
    this.showProgressBar = true;
    this.approvalCenterService.updatedFileUpload(files, this.role).subscribe((data: any) => {
      setTimeout(() => {
        //console.log('upload-res', data); 
        // if (data.message === 'SUCCESS') {
          this.uploadSuccess = true;
          this.uploadFailed = false;
          this.showProgressBar = false;
          this.notification.showSnackBar('File Uploaded Successfully ...!!!');
          this.dialogRef.close();
          location.reload();
        // }
      }, 0);
    });

    this.subscription = this.approvalCenterService.getStatusChangeEmitter().subscribe(response => {
      this.showProgressBar = false;
      this.uploadSuccess = false;
      this.uploadFailed = true;
      this.notification.showSnackBar(response.error.message); 
    });

  }

  downloadSample() {
    this.excelService.exportDataToExcel(this.sampleFormatDownload, 'Bulk_Upload_Template');
  }

}
