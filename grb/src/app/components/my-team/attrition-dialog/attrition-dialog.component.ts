import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  MatDialog } from '@angular/material';
import { AttritionComponent } from '../attrition/attrition.component';


@Component({
  selector: 'app-attrition-dialog',
  templateUrl: './attrition-dialog.component.html',
  styleUrls: ['./attrition-dialog.component.scss']
})
export class AttritionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AttritionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    //////////console.log(data)
  }

  ngOnInit() {
    //////////console.log(this.data)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  }


