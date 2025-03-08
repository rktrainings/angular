import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogHcHistoryComponent } from '../Dialogs/dialog-hc-history/dialog-hc-history.component';

@Component({
  selector: 'app-hc-history',
  templateUrl: './hc-history.component.html',
  styleUrls: ['./hc-history.component.scss']
})
export class HcHistoryComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(DialogHcHistoryComponent, {
      width: '400px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
