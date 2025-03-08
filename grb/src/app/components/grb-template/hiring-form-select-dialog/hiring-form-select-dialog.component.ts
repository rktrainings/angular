import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-hiring-form-select-dialog',
  templateUrl: './hiring-form-select-dialog.component.html',
  styleUrls: ['./hiring-form-select-dialog.component.scss']
})
export class HiringFormSelectDialogComponent implements OnInit {

  selected:any="internal"
  constructor(private router:Router,   public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  submit(){
    if(this.selected=='internal'){
      this.router.navigateByUrl('/internal')
    }else{
      this.router.navigateByUrl('/external')
    }
    this.dialogRef.close();
  }
}
