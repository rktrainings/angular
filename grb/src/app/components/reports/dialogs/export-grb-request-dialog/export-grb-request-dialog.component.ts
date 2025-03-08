import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ReportsService } from 'src/app/services/reports.service';
import { ExportGrbRequestComponent } from '../../export-grb-request/export-grb-request.component';

@Component({
  selector: 'app-export-grb-request-dialog',
  templateUrl: './export-grb-request-dialog.component.html',
  styleUrls: ['./export-grb-request-dialog.component.scss']
})
export class ExportGrbRequestDialogComponent implements OnInit {
  options: string[] = ['APPROVED', 'UN APPROVED', 'SelectAll'];

  unapprovedlist: string[] = ['Reviewed Req', 'Resubmit Req'];
  checkedvalue: any;
  displayUnApproved: boolean;
  selected: string = "";
  constructor(public router: Router, public dialogRef: MatDialogRef<ExportGrbRequestComponent>, private reports: ReportsService) { }

  ngOnInit() {
  }
  checkhire($event: any) {



    this.checkedvalue = $event.value;
    ////console.log(this.checkedvalue)
    if (this.checkedvalue == 'UN APPROVED')
      this.displayUnApproved = true;
    else
      this.displayUnApproved = false;


  }
  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }
  goToMenu() {
    this.router.navigateByUrl('/main-menu')
  }
  onSubmit() {
    ////console.log(this.selected, environment.REPORTS_EXPORT_GRB)
    this.selected = this.selected.replace(/ /g, '_');
    ////console.log(this.selected, environment.REPORTS_EXPORT_GRB)

    let url = environment.REPORTS_EXPORT_GRB + this.selected;

    this.reports.downloadReport(url, 'EXPORT-GRB-REQUEST');

  }
}
