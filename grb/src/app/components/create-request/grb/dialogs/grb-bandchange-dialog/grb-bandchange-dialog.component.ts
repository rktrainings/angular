import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GrbComponent } from 'src/app/components/create-request/grb/grb.component';
import { CreateRequestGrbService } from 'src/app/services/create-request-grb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-grb-bandchange-dialog',
  templateUrl: './grb-bandchange-dialog.component.html',
  styleUrls: ['./grb-bandchange-dialog.component.scss']
})
export class GrbBandchangeDialogComponent implements OnInit {
  registerForm: FormGroup;
  deptCode: string;
  deptName: string;
  metroNum: string;
  grbNum: string
  currentBand: string;
  grbDetails: any;
  bandchangeData: any;
  nextbutton: boolean;
  actionlists: string[];
  private hideFileAction: boolean;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GrbComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private spinner: NgxSpinnerService,
    public bandChangeService: CreateRequestGrbService, private notification: NotificationService) {
    this.grbDetails = data;
    this.bandChangeService.setGrbDetails(data);
    this.deptCode = this.data.deptCode;
    this.deptName = this.data.deptName;
    this.metroNum = this.data.metroNumber;
    this.grbNum = this.data.grbNumber;
    this.currentBand = this.data.band;
    if (this.currentBand == '3') {
      this.actionlists = ['upgrade'];
    }
    else if (this.currentBand == 'C') {
      this.actionlists = ['downgrade'];
    }
    else {
      this.actionlists = ['upgrade', 'downgrade'];
    }

  }
  //actionlists = ['upgrade', 'downgrade'];
  resourceTypelists: string[] = ['Regular', 'Non Regular', ' Sub K']

  displayUpgrade: boolean;
  displayDowngrade: boolean;
  hManagerComments: string;
  reqBand: string;
  resourceType: string;
  fileName: string = '';
  storedFile: any;
  reqBandlists: string[];
  action: any;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      deptCode: [{ value: '', disabled: true },],
      metroNum: [{ value: '', disabled: true },],
      deptName: [{ value: '', disabled: true },],
      grbNum: [{ value: '', disabled: true },],
      currentBand: [{ value: '', disabled: true },],
      action: ['', Validators.required],
      reqBand: ['', Validators.required],
      resourceType: ['', Validators.required],
      hManagerComments: ['', Validators.required],
      // downgradeComments: ['', Validators.required],
      bandChangeFile: ['', Validators.required]



    });



  }
  getBandlist(band, action) {
    this.spinner.show();
    this.bandChangeService.getgreaterBandlist(band, action).subscribe((data: any) => {
      this.reqBandlists = data;
      this.spinner.hide();

    });
  }
  fileUpload(files: File[]) {
    if (files) {
      this.storedFile = files;
      this.bandChangeService.setUploadedFile(this.storedFile);
      for (let file of files) {
        this.fileName = file.name;
        this.hideFileAction = true;
      }
    }
  }
  close() {

    this.dialogRef.close();
  }
  getData(): any {

    let data = {
      deptCode: this.deptCode,
      deptName: this.data.deptName,
      metroNum: this.data.metroNumber,
      grbNum: this.data.grbNumber,
      currentBand: this.data.band,
      reqBand: this.reqBand,
      resourceType: this.resourceType,
      hManagerComments: this.hManagerComments,


    }
    this.bandChangeService.setGrbDetails(data);
    //return data;


  }


  getAction(item) {
    if (item.value == 'upgrade') {
      this.checkEnable();
      this.resourceType = "";
      this.hManagerComments = '';
      this.displayUpgrade = true;
      this.displayDowngrade = false;
      this.getBandlist(this.data.band, item.value);
    }
    else {
      this.checkEnable();
      this.resourceType = "";
      this.hManagerComments = '';
      this.displayUpgrade = false;
      this.displayDowngrade = true;
      this.getBandlist(this.data.band, item.value);
    }
  }
  onSubmit() {
    this.getData();
    this.bandchangeData = this.bandChangeService.getGrbDetails();
    this.storedFile = this.bandChangeService.getUploadedFile();

    if (this.action == 'upgrade') {
      this.spinner.show();
      this.bandChangeService.submitBandChangeWithAttachment(this.storedFile, this.bandchangeData).subscribe((data: any) => {

        this.openSnackBar(data.message);
        this.spinner.hide();
      });
    } else {
      this.spinner.show();
      this.bandChangeService.submitDowngradeRequest(this.bandchangeData).subscribe((data: any) => {
        this.openSnackBar(data.jsonStatus);
        this.spinner.hide();

      });

    }
  }
  openSnackBar(status: any) {

    if (status == 'SUCCESS') {
      //this.hiringFormService.nullifyTemplateData();
      this.notification.showSnackBar('SUCCESS..!! Band Change Submitted');

    } else {
      this.notification.showSnackBar('Failed..!! ');

    }
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 500)
  }
  
  checkEnable() {
    if (this.action == 'upgrade') {
      if (this.reqBand && this.resourceType && this.hManagerComments && this.fileName.length > 0) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if (this.reqBand && this.resourceType && this.hManagerComments) {
        return true;
      }
      else {
        return false;
      }

    }
  }
}
