import { Component, OnInit } from '@angular/core';
import { DialogCcnpcrComponent } from './dialog-ccnpcr/dialog-ccnpcr.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CCNPCRservice } from 'src/app/services/ccn-details.service';
import { TransitionLowcostComponent } from './transition-lowcost/transition-lowcost.component';
import { Router } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import GRBDetails from 'src/assets/data/Hiring/Edit/GRB-Details.json';
import GOMDetails from 'src/assets/data/Hiring/Edit/GOM-Details.json';

import GRBDetailsView from 'src/assets/data/Hiring/View/GRB-Details.json';
import GOMDetailsView from 'src/assets/data/Hiring/View/GOM-Details.json';

@Component({
  selector: 'app-new-growth',
  templateUrl: './new-growth.component.html',
  styleUrls: ['./new-growth.component.scss']
})
export class NewGrowthComponent implements OnInit {
  selected: string;

  CCNPCRdialog: boolean = false;
  newgrowthdialog: boolean;
  data: any;
  newgrowthlist: string[] = ['CCN/PCR', 'New Transition', 'Move to Low Cost'];

  constructor(private router: Router, public dialogRef: MatDialogRef<NewGrowthComponent>,
    public dialog: MatDialog, private ccnpcrservice: CCNPCRservice, private hiringForm: HiringFormService) { }

  ngOnInit() {
    this.nullifyTemplateData();
  }

  nullifyTemplateData() {
    this.hiringForm.nullifyTemplateData();
  }
  fetchccnlist() {
    this.ccnpcrservice.getccnlist().subscribe((data: []) => {
      //this.pushCCData(data);
      //this.showLoaderCC = false;
    });
  }

  disableSubmit() {
    if (!this.selected) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.selected == 'CCN/PCR') {
      this.openDialog(this.selected)

    }
    if (this.selected == 'New Transition' || this.selected == 'Move to Low Cost') {
      this.orpdialog(this.selected)
    }
    this.dialogRef.close();
  }


  orpdialog(valueselected): void {
    const dialogRef = this.dialog.open(TransitionLowcostComponent, {
      width: '780px',
      data: valueselected,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  openDialog(valueselected): void {
    const dialogRef = this.dialog.open(DialogCcnpcrComponent, {

      data: valueselected,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  close() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }
}
