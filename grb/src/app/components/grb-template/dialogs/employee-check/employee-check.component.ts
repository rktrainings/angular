import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-employee-check',
  templateUrl: './employee-check.component.html',
  styleUrls: ['./employee-check.component.scss']
})
export class EmployeeCheckComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeCheckComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    //////////console.log(data)
  }

  ngOnInit() {
  }

}
