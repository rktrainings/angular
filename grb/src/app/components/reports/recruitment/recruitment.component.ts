import { Component, OnInit } from '@angular/core';
import { RecruitmentReportsDialogComponent } from '../dialogs/recruitment-reports-dialog/recruitment-reports-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {

  
  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
  }
  displayDialogbox() {

    const dialogRef = this.dialog.open(RecruitmentReportsDialogComponent, {
      width: '550px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
