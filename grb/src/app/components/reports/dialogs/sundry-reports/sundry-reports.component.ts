import { Component, OnInit } from '@angular/core';
import { DateAdapter, MatDialogRef, MAT_DATE_FORMATS } from '@angular/material';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { CommonService } from 'src/app/services/common-service.service';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sundry-reports',
  templateUrl: './sundry-reports.component.html',
  styleUrls: ['./sundry-reports.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]

})
export class SundryReportsComponent implements OnInit {

  selected: string;
  typeVal:string;
  types: string[] = ['PENDING', 'APPROVED', 'ALL'];
  fromDate: Date;
  toDate = new Date();
  maxDate = new Date();

  constructor(public router: Router,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<SundryReportsComponent>,
    private reports: ReportsService) { }

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

  getTypes(types: any) {
    //console.log(types);
    //console.log(types.value);
    this.selected = types.value;
  }

  onSubmit() {
    console.log(this.fromDate)
    console.log(this.toDate)
    console.log(this.selected)

    let from = this.commonService.returnDate(this.fromDate)
    let to = this.commonService.returnDate(this.toDate)
    console.log('new', from, ' ', to)
    this.identifyAPICall(from, to);
    // let url = environment.REPORTS_BR_CCN_PCR + from + '/' + to + '/' + this.selected;
    // this.reports.downloadReport(url, 'CCN/PCR_' + this.selected + '_' + from + '_' + to);
  }

  identifyAPICall(from: any, to: any) {
    switch (this.selected) {
      case 'PENDING':
        this.reports.downloadReport(environment.REPORTS_SUNDRY_EXPORT_PENDING + from + '/' + to, this.selected + '_' + from + '_' + to);
        break;
      case 'APPROVED':
        this.reports.downloadReport(environment.REPORTS_SUNDRY_EXPORT_APPROVED + from + '/' + to, this.selected + '_' + from + '_' + to);
        break;
      case 'ALL':
        this.reports.downloadReport(environment.REPORTS_SUNDRY_EXPORT_ALL + from + '/' + to, this.selected + '_' + from + '_' + to);
        break;
    }
  }


  // downloadReport(){
  //   this.reports.downloadReport(environment.REPORTS_SUNDRY_EXPORT, 'childKey');
  // }

}
