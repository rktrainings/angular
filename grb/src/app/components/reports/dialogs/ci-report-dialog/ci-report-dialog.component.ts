import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { HeadCountComponent } from '../../head-count/head-count.component';

@Component({
  selector: 'app-ci-report-dialog',
  templateUrl: './ci-report-dialog.component.html',
  styleUrls: ['./ci-report-dialog.component.scss']
})
export class CiReportDialogComponent implements OnInit {

  selectionreport: string = "";
  selectionreportlists: string[] = [];
  enableButton: boolean = true;
  selectedFilter: number;
  constructor(public router: Router, public dialogRef: MatDialogRef<HeadCountComponent>, private reports: ReportsService) { }

  ngOnInit() {
    this.yeardropdown();
  }
  goToMenu() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }

  yeardropdown() {
    var max = new Date().getFullYear(),
      min = max - 2;
    // max = max + 1;
    this.selectedFilter = max;
    for (var i = min; i <= max; i++) {
      var year = i.toString;
      //////console.log(i);
      this.selectionreportlists.push(String(i));
    }
  }
  getreport(item) {
    this.selectionreport = item.value;
    this.enableButton = false;
  }
  onSubmit() {
    let url = environment.REPORTS_CI_EXPORT + this.selectionreport.toString();
    this.reports.downloadReport(url, 'CI REPORT');

  }

}
