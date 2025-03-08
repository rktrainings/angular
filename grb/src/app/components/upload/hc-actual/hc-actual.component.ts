import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogHcActualComponent } from '../Dialogs/dialog-hc-actual/dialog-hc-actual.component';

@Component({
  selector: 'app-hc-actual',
  templateUrl: './hc-actual.component.html',
  styleUrls: ['./hc-actual.component.scss']
})
export class HcActualComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(DialogHcActualComponent, {
      width: '400px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
