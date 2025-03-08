import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BackfillDialogComponent } from '../backfill-dialog/backfill-dialog.component';
import { HiringFormService } from 'src/app/services/hiring-form.service';

import GRBDetails from 'src/assets/data/Hiring/Edit/GRB-Details.json';
import GOMDetails from 'src/assets/data/Hiring/Edit/GOM-Details.json';

import GRBDetailsView from 'src/assets/data/Hiring/View/GRB-Details.json';
import GOMDetailsView from 'src/assets/data/Hiring/View/GOM-Details.json';

@Component({
  selector: 'app-backfill',
  templateUrl: './backfill.component.html',
  styleUrls: ['./backfill.component.scss']
})
export class BackfillComponent implements OnInit {

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

    const dialogRef = this.dialog.open(BackfillDialogComponent, {
      width: '300px',
      // height: '307px',
      disableClose: true,
      data:true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.hiringForm.nullifyTemplateData();
    });
  }
}
