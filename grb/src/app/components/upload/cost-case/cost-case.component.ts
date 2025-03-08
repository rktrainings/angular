import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogCostCaseComponent } from '../Dialogs/dialog-cost-case/dialog-cost-case.component';

@Component({
  selector: 'app-cost-case',
  templateUrl: './cost-case.component.html',
  styleUrls: ['./cost-case.component.scss']
})
export class CostCaseComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit() {
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(DialogCostCaseComponent, {
      width: '400px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
