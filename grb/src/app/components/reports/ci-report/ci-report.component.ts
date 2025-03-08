import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CiReportDialogComponent } from '../dialogs/ci-report-dialog/ci-report-dialog.component';

@Component({
  selector: 'app-ci-report',
  templateUrl: './ci-report.component.html',
  styleUrls: ['./ci-report.component.scss']
})
export class CiReportComponent implements OnInit {
  constructor(public dialog: MatDialog) { 

  }
  
  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {
  
    const dialogRef = this.dialog.open(CiReportDialogComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
