import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bandmix',
  templateUrl: './bandmix.component.html',
  styleUrls: ['./bandmix.component.scss']
})
export class BandmixComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BandmixComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
