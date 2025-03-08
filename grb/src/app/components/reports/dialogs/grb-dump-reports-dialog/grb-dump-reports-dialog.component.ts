import { Component, OnInit } from '@angular/core';
import { GrbDumpComponent } from '../../grb-dump/grb-dump.component';
import { Router } from '@angular/router';
import { MatDialogRef, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { CommonService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-grb-dump-reports-dialog',
  templateUrl: './grb-dump-reports-dialog.component.html',
  styleUrls: ['./grb-dump-reports-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class GrbDumpReportsDialogComponent implements OnInit {
  fromDate:Date;
  toDate = new Date();
  maxDate = new Date();
  constructor(public router: Router,
     public dialogRef: MatDialogRef<GrbDumpComponent>,
      private reports: ReportsService,private commonService:CommonService) { }

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
    let from=this.commonService.returnDate(this.fromDate)
    let to=this.commonService.returnDate(this.toDate)
    let url = environment.REPORTS_GRB_DUMP + from + '/' + to;
    this.reports.downloadReport(url, 'GRB RAW DUMP');

  }
}
