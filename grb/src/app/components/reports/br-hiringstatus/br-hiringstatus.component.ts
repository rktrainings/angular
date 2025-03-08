import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BrHiringstatusReportsDialogComponent } from '../dialogs/br-hiringstatus-reports-dialog/br-hiringstatus-reports-dialog.component';

@Component({
  selector: 'app-br-hiringstatus',
  templateUrl: './br-hiringstatus.component.html',
  styleUrls: ['./br-hiringstatus.component.scss']
})
export class BrHiringstatusComponent implements OnInit {

  constructor(public dialog: MatDialog) { 

  }
  
  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {
  
    const dialogRef = this.dialog.open(BrHiringstatusReportsDialogComponent, {
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
