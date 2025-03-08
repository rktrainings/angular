import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewGrowthComponent } from '../new-growth.component';

@Component({
  selector: 'app-dialog-new-growth',
  templateUrl: './dialog-new-growth.component.html',
  styleUrls: ['./dialog-new-growth.component.scss']
})
export class DialogNewGrowthComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }

  displayDialogbox() {

    const dialogRef = this.dialog.open(NewGrowthComponent, {
      width: '300px',
      // height: '307px',
      disableClose: true

      //height: '250px',


    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
