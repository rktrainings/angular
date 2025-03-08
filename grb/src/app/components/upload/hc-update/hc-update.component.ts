import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogHcUpdateComponent } from '../Dialogs/dialog-hc-update/dialog-hc-update.component';

@Component({
  selector: 'app-hc-update',
  templateUrl: './hc-update.component.html',
  styleUrls: ['./hc-update.component.scss']
})
export class HcUpdateComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  

  ngOnInit() {

    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(DialogHcUpdateComponent, {
      width: '400px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
