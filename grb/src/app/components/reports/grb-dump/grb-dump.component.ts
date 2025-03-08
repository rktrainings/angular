import { Component, OnInit } from '@angular/core';
import { GrbDumpReportsDialogComponent } from '../dialogs/grb-dump-reports-dialog/grb-dump-reports-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-grb-dump',
  templateUrl: './grb-dump.component.html',
  styleUrls: ['./grb-dump.component.scss']
})
export class GrbDumpComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {

    const dialogRef = this.dialog.open(GrbDumpReportsDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
