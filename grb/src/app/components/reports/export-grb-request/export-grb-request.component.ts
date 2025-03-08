import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ExportGrbRequestDialogComponent } from 'src/app/components/reports/dialogs/export-grb-request-dialog/export-grb-request-dialog.component';

@Component({
  selector: 'app-export-grb-request',
  templateUrl: './export-grb-request.component.html',
  styleUrls: ['./export-grb-request.component.scss']
})
export class ExportGrbRequestComponent implements OnInit {

  constructor(public dialog: MatDialog) { 

  }
  
  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {
  
    const dialogRef = this.dialog.open(ExportGrbRequestDialogComponent, {
      width: '580px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
