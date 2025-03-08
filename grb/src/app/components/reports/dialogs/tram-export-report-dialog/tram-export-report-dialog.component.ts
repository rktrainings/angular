import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { CommonService } from 'src/app/services/common-service.service';
import { TramExportComponent } from '../../tram-export/tram-export.component';

@Component({
  selector: 'app-tram-export-report-dialog',
  templateUrl: './tram-export-report-dialog.component.html',
  styleUrls: ['./tram-export-report-dialog.component.scss']
})
export class TramExportReportDialogComponent implements OnInit {
  fromDate: Date;
  toDate = new Date();
  maxDate = new Date();
  constructor(public router: Router,
    public dialogRef: MatDialogRef<TramExportComponent>,
    private reports: ReportsService, private commonService: CommonService) { }

  ngOnInit() {
  }

  goToMenu() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }
  saveDate(key, val) {

  }

  // formatDate(date): any {
  //   var day = ('0' + date.getDate()).slice(-2);
  //   var month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   var year = date.getFullYear();
  //   return year + '-' + month + '-' + day;
  // }
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
    let url = environment.REPORTS_TRAM_EXPORT + from + '/' + to;
    this.reports.downloadReport(url, 'TRAM EXPORT' + '_' + from + '_' + to);

  }
}
