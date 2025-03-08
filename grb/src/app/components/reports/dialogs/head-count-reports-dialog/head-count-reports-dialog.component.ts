import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material';
import { HeadCountComponent } from '../../head-count/head-count.component';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-head-count-reports-dialog',
  templateUrl: './head-count-reports-dialog.component.html',
  styleUrls: ['./head-count-reports-dialog.component.scss']
})
export class HeadCountReportsDialogComponent implements OnInit {
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
      min = max - 3;
    // max = max + 1;
    this.selectedFilter = max;
    for (var i = min; i <= max; i++) {
      var year = i.toString;
      //////console.log(i);
      this.selectionreportlists.push(String(i));
    }
    this.selectionreportlists.push('Current_Month')
    //////console.log(this.selectionreportlists);
  }
  getreport(item) {
    //////console.log(item.value);
    this.selectionreport = item.value;
    this.enableButton = false;
  }
  onSubmit() {
    //////console.log(this.selectionreport)
    let url = environment.REPORTS_HEADCOUNT + this.selectionreport;
    this.reports.downloadReport(url, 'HEAD COUNT');

  }
}
