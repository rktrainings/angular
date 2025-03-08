import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hiredialog',
  templateUrl: './hiredialog.component.html',
  styleUrls: ['./hiredialog.component.scss']
})
export class HiredialogComponent implements OnInit {

  value :boolean;
  hirestatus:boolean=false;
  
  constructor(    public dialogRef: MatDialogRef<HiredialogComponent>,
    @Inject(MAT_DIALOG_DATA) public valueboolean: boolean,private router:Router) { }


  ngOnInit() {
   
    if(this.valueboolean){
      this.hirestatus=true;

    }
  }

  navigate(){
    this.router.navigateByUrl('/create-request/hiresubmit?hireType=external');
    this.dialogRef.close();
  }
}
