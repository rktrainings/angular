import { Component, OnInit } from '@angular/core';
import { CCNPCRComponent } from '../../ccn-pcr/ccn-pcr.component';
import { Router } from '@angular/router';
import { MatDialogRef, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { environment } from 'src/environments/environment';
import { ReportsService } from 'src/app/services/reports.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { CommonService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-ccn-pcr-reports-dialog',
  templateUrl: './ccn-pcr-reports-dialog.component.html',
  styleUrls: ['./ccn-pcr-reports-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class CcnPcrReportsDialogComponent implements OnInit {

  selected: string;
  options: string[] = ['APPROVED', 'ALL'];
  fromDate: Date;
  toDate = new Date();
  maxDate = new Date();
  constructor(public router: Router, private commonService: CommonService, public dialogRef: MatDialogRef<CCNPCRComponent>, private reports: ReportsService) { }

  ngOnInit() {
  }

  goToMenu() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }

  disableSubmit() {
    if (this.selected && this.fromDate && this.toDate) {
      return false;
    }
    return true;
  }

  onSubmit() {
    //////console.log(this.selected)
    let from = this.commonService.returnDate(this.fromDate)
    let to = this.commonService.returnDate(this.toDate)
    let url = environment.REPORTS_BR_CCN_PCR + from + '/' + to + '/' + this.selected;
    this.reports.downloadReport(url, 'CCN/PCR_' + this.selected + '_' + from + '_' + to);
  }

}
