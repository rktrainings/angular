import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { ConversionComponent } from '../conversion.component';

@Component({
  selector: 'app-dialog-conversion',
  templateUrl: './dialog-conversion.component.html',
  styleUrls: ['./dialog-conversion.component.scss']
})
export class DialogConversionComponent implements OnInit {

  constructor(public dialog: MatDialog, private hiringForm: HiringFormService) { }

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

    const dialogRef = this.dialog.open(ConversionComponent, {
      width: '300px',
      // height: '307px',
      disableClose: true

      //height: '250px',


    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
