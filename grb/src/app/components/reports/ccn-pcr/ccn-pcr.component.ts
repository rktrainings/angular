import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CcnPcrReportsDialogComponent } from '../dialogs/ccn-pcr-reports-dialog/ccn-pcr-reports-dialog.component';

@Component({
  selector: 'app-ccn-pcr',
  templateUrl: './ccn-pcr.component.html',
  styleUrls: ['./ccn-pcr.component.scss']
})
export class CCNPCRComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {

    const dialogRef = this.dialog.open(CcnPcrReportsDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
