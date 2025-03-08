import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackfillComponent } from '../backfill/backfill.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-backfill-dialog',
  templateUrl: './backfill-dialog.component.html',
  styleUrls: ['./backfill-dialog.component.scss']
})
export class BackfillDialogComponent implements OnInit {
  selected: string = "";
  options: string[] = ['Attrition', 'Internal Movement', 'Promotion'];
  goToMainMenu:boolean;

  constructor(public router: Router, public dialogRef: MatDialogRef<BackfillComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.goToMainMenu=data;
   }

  ngOnInit() {
  }

  goToMenu() {
    this.dialogRef.close();
    if(this.goToMainMenu === true){
    this.router.navigateByUrl('/main-menu');
    }
  }

  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.selected == 'Attrition') {
      this.router.navigate(['create-request/backfill/attrition']);
    }
    if (this.selected == 'Internal Movement') {
      this.router.navigate(['create-request/backfill//internal-movement']);
    }
    if (this.selected == 'Promotion') {
      this.router.navigate(['create-request/backfill/promotion']);
    }
    this.dialogRef.close();
  }

}