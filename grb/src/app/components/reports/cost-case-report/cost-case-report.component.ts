import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { CostCaseReportDialogComponent } from '../dialogs/cost-case-report-dialog/cost-case-report-dialog.component';

@Component({
  selector: 'app-cost-case-report',
  templateUrl: './cost-case-report.component.html',
  styleUrls: ['./cost-case-report.component.scss']
})
export class CostCaseReportComponent implements OnInit {
  showSpinner: boolean;

  constructor(public dialog: MatDialog, private commonService: CommonService) {

  }


  ngOnInit() {
    this.yeardropdown();

   
  }

  yeardropdown() {
    this.showSpinner = true;
    this.commonService.getServiceRequest(environment.CC_REPORT_YEARS_LIST).subscribe((data:any[]) => {
      this.showSpinner = false;
      //console.log(data);
      let years=data.map(e=>e.year);
      setTimeout(() => {
        this.displayDialogbox(years);
      }, 0);
    })
  }
  displayDialogbox(years) {

    const dialogRef = this.dialog.open(CostCaseReportDialogComponent, {
      data:years,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
