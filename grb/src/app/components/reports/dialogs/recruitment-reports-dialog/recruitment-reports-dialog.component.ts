import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDialogRef } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { Router } from '@angular/router';
import { GrbDumpComponent } from '../../grb-dump/grb-dump.component';
import { ReportsService } from 'src/app/services/reports.service';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recruitment-reports-dialog',
  templateUrl: './recruitment-reports-dialog.component.html',
  styleUrls: ['./recruitment-reports-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class RecruitmentReportsDialogComponent implements OnInit {

  fromDate: Date;
  toDate = new Date();
  maxDate = new Date();
  constructor(public router: Router,
    public dialogRef: MatDialogRef<GrbDumpComponent>,
    private reports: ReportsService, private commonService: CommonService) { }

  ngOnInit() {
  }

  goToMenu() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }

  disableSubmit() {
    if (!this.fromDate || !this.toDate) {
      //////console.log(this.fromDate)

      return true;
    }
    return false;
  }

  onSubmit() {
    let from = this.commonService.returnDate(this.fromDate)
    let to = this.commonService.returnDate(this.toDate)
    let url = environment.REPORTS_RECRUITMENT + from + '/' + to;
    this.reports.downloadReport(url, 'RECRUITMENT STATUS' + '_' + from + '_' + to);

  }

}
