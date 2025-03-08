import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SundryReportsComponent } from '../dialogs/sundry-reports/sundry-reports.component';

@Component({
  selector: 'app-sundry',
  templateUrl: './sundry.component.html',
  styleUrls: ['./sundry.component.scss']
})
export class SundryComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {

    const dialogRef = this.dialog.open(SundryReportsComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
