import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ReportsService } from 'src/app/services/reports.service';
import { BrHiringstatusComponent } from 'src/app/components/reports/br-hiringstatus/br-hiringstatus.component';

@Component({
  selector: 'app-br-hiringstatus-reports-dialog',
  templateUrl: './br-hiringstatus-reports-dialog.component.html',
  styleUrls: ['./br-hiringstatus-reports-dialog.component.scss']
})
export class BrHiringstatusReportsDialogComponent implements OnInit {
  enableRaodiorow: boolean;
  options: string[] = ['Closed', 'All', 'Offer In Progess'];
  fromDate: string;
  toDate: string;
  selected: string = "";
  constructor(public router: Router, public dialogRef: MatDialogRef<BrHiringstatusComponent>, private reports: ReportsService) { }

  ngOnInit() {
  }
  goToMenu() {
    this.router.navigateByUrl('/main-menu')
  }
  saveDate(key,val) {
    var date = this.formatDate(val);
    //////console.log(date);
    if (this.fromDate && key=='fromDate')
      this.fromDate = this.formatDate(val);
    if (this.toDate && key=='toDate')
      this.toDate = this.formatDate(val);

    if (this.fromDate && this.toDate) {
      this.enableRaodiorow = true;
    }
  }

  formatDate(date): any {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }

  onSubmit() {
    //////console.log(this.selected, environment.REPORTS_BR_HIRINGSTATUS)
    this.selected = this.selected.replace(/ /g, '_');

    let url = environment.REPORTS_BR_HIRINGSTATUS + this.fromDate + '/' + this.toDate + '/' + this.selected;

    this.reports.downloadReport(url, 'BR-HIRING-STATUS');

  }
}
