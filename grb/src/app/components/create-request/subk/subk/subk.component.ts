import { Component, OnInit } from '@angular/core';
import { SubkDialogComponent } from '../subk-dialog/subk-dialog.component';
import { MatDialog } from '@angular/material';
import { HiringFormService } from 'src/app/services/hiring-form.service';

@Component({
  selector: 'app-subk',
  templateUrl: './subk.component.html',
  styleUrls: ['./subk.component.scss']
})
export class SubkComponent implements OnInit {

  constructor(public dialog: MatDialog, private hiringForm: HiringFormService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.displayDialogbox();
    }, 0);
    this.nullifyTemplateData();
  }
   nullifyTemplateData() {
     this.hiringForm.nullifyTemplateData();
   }
  displayDialogbox() {

    const dialogRef = this.dialog.open(SubkDialogComponent, {
      width: '300px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.hiringForm.nullifyTemplateData();
    });
  }
}
