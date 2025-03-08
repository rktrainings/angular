import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HeadCountReportsDialogComponent } from '../dialogs/head-count-reports-dialog/head-count-reports-dialog.component';

@Component({
  selector: 'app-head-count',
  templateUrl: './head-count.component.html',
  styleUrls: ['./head-count.component.scss']
})
export class HeadCountComponent implements OnInit {

  constructor(public dialog: MatDialog) { 

}

ngOnInit() {
  setTimeout(() => {
    this.displayDialogbox();
  }, 0);
}
displayDialogbox() {

  const dialogRef = this.dialog.open(HeadCountReportsDialogComponent, {
    width: '400px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(() => {
  });
}
}
