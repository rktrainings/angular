import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  onClickStatus: any;

  constructor(public dialogRef: MatDialogRef<FileUploadComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

  }



  ngOnInit() {
  }

  onClickYes() {
    this.onClickStatus = 'Yes';
    this.dialogRef.close({
      event: 'close',
      data: this.onClickStatus,
    });


  }

  onClickNo() {
    this.onClickStatus = 'No';
    this.dialogRef.close({
      event: 'close',
      data: this.onClickStatus,
    });

  }

}
