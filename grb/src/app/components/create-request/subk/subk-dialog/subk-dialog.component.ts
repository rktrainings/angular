import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubkComponent } from '../subk/subk.component';
import { NewHireComponent } from '../new-hire/new-hire.component';


@Component({
  selector: 'app-subk-dialog',
  templateUrl: './subk-dialog.component.html',
  styleUrls: ['./subk-dialog.component.scss']
})
export class SubkDialogComponent implements OnInit {

  selected: string = "";
  options: string[] = ['New Hire', 'Subk to Regular', 'Subk to Non Regular','Extension'];
  

  constructor(public router: Router, public dialog: MatDialog,public dialogRef: MatDialogRef<SubkComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
   
   }

  ngOnInit() {
  }

  goToMenu() {
    this.dialogRef.close();
    
    this.router.navigateByUrl('/main-menu');
    
  }

  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.selected == 'New Hire') {
      //this.router.navigate(['create-request/subk/new-hire']);
      const dialogRef = this.dialog.open(NewHireComponent, {
        width: '780px',
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }
    if (this.selected == 'Subk to Regular') {
      this.router.navigate(['create-request/subk/subk-regular']);
    }
    if (this.selected == 'Subk to Non Regular') {
      this.router.navigate(['create-request/subk/subk-non-regular']);
    }
    if (this.selected == 'Extension') {
      this.router.navigate(['create-request/subk/extension']);
    }
    this.dialogRef.close();
    
    //this.dialogRef.close();
  }

}
