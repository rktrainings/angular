import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TramExportReportDialogComponent } from '../dialogs/tram-export-report-dialog/tram-export-report-dialog.component';

@Component({
  selector: 'app-tram-export',
  templateUrl: './tram-export.component.html',
  styleUrls: ['./tram-export.component.scss']
})
export class TramExportComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {

    const dialogRef = this.dialog.open(TramExportReportDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
