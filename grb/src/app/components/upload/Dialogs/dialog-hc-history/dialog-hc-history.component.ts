import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogCostCaseComponent } from '../dialog-cost-case/dialog-cost-case.component';
import { HttpClient } from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import SampleFormatDownload from '../../../../../assets/data/approval-center/sample-hc-history.json'

@Component({
  selector: 'app-dialog-hc-history',
  templateUrl: './dialog-hc-history.component.html',
  styleUrls: ['./dialog-hc-history.component.scss']
})
export class DialogHcHistoryComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<DialogCostCaseComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private uploadService: UploadService,private router:Router,
   // private excelServicesService: ExcelServicesService,
    private snackBar: MatSnackBar) {
   


  }

  ngOnInit() {
    this.sampleFormatDownload = SampleFormatDownload;
    this.subscription = this.uploadService.getStatusChangeEmitter().subscribe(status => {
      //////////console.log('status:', status);
      if (status === true) {
        this.uploadSuccess = status;
        setTimeout(()=>{ this.goToMenu()},1500)
      } else {
        this.uploadFailed = status;
      }
    });
    this.subscription = this.uploadService.getPercentChangeEmitter().subscribe(percent => {
      //////////console.log('percent:', percent);
      this.percentage = percent;
    });

  }

  fileUpload(files: File[]) {
    let url=environment.UPLOAD_HC_HISTORY
    for (let file of files) {
      this.fileName = file.name;
    }
    this.uploadService.basicUpload(files, url);
  }

  downloadSample() {
    //////////console.log('sampleFormatDownload', this.sampleFormatDownload);
    this.uploadService.exportDataToExcel(this.sampleFormatDownload, 'HEADCOUNT_HISTORY_TEMPLATE');
  }

  goToMenu()
  {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }

  // openSnackBar(status: any) {
  //   if (status == 'SUCCESS') {
  //     this.snackBar.open('Success...!!!', 'Close', {
  //       duration: this.durationInSeconds * 1000,
  //       panelClass: "my-snack-bar",
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //     });
  //   } else {
  //     this.snackBar.open('Failed...!!!', 'Close', {
  //       duration: this.durationInSeconds * 1000,
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition,
  //     });
  //   }

  // }

}
