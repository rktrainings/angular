import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common-service.service';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { CostCaseReportComponent } from '../../cost-case-report/cost-case-report.component';

@Component({
  selector: 'app-cost-case-report-dialog',
  templateUrl: './cost-case-report-dialog.component.html',
  styleUrls: ['./cost-case-report-dialog.component.scss']
})
export class CostCaseReportDialogComponent implements OnInit {

  enableButton: boolean = true;
  years=[];
  selectedYear:any;
  constructor(public router: Router, private commonService: CommonService,   @Optional() @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CostCaseReportComponent>, private reports: ReportsService) { 

    //console.log(data);
    this.years=data
    
  }

  ngOnInit() {
    // this.yeardropdown();
  }
  goToMenu() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }

  // yeardropdown() {
  //   this.commonService.getServiceRequest(environment.CC_REPORT_YEARS_LIST).subscribe(data => {
  //     //console.log(data);

  //   })
  // }
  yearChange(event){
    this.selectedYear=event.value
    //console.log(event);
    
    this.enableButton=false;
  }
  onSubmit() {
    //console.log(this.selectedYear)
    let url = environment.CC_REPORT + this.selectedYear;
    this.reports.downloadReport(url, 'COST CASE');

  }
}
