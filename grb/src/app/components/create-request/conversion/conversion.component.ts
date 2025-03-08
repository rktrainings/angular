import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConversionEmpListComponent } from './conversion-emp-list/conversion-emp-list.component';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {
  conversionlist: string[] = ['Non Regular To Regular', 'Non Regular Promotion', 'Non Regular Extension'];
  selected: string;
  constructor(private router: Router, public dialogRef: MatDialogRef<ConversionComponent>,
    public dialog: MatDialog) { }

  ngOnInit() {
  }
  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }
  close() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }
  onSubmit() {
    if (this.selected == 'Non Regular To Regular') {


    }
    if (this.selected == 'Non Regular Promotion' || this.selected == 'Non Regular Extension') {

    }
    ////console.log(this.selected)
    this.orpdialog(this.selected);
    this.dialogRef.close();
  }
  
  orpdialog(valueselected): void {
    const dialogRef = this.dialog.open(ConversionEmpListComponent, {
      width: '1350px',
      // height: '75vh',
      data: valueselected,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
