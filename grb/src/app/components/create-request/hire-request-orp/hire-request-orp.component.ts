import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';

import { MatSort, MatDialog, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { HireORPService } from "src/app/services/hire-request-ORP";

import { SelectionModel } from '@angular/cdk/collections';

import { HiringFormService } from 'src/app/services/hiring-form.service';

import { Router } from '@angular/router';

import { HireRequest } from 'src/app/models/hirerequest';

import { HiredialogComponent } from './dialog-hireORP/hiredialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { NewGrowthComponent } from '../new-growth/new-growth.component';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';


@Component({

  selector: 'app-hire-request-orp',

  templateUrl: './hire-request-orp.component.html',

  styleUrls: ['./hire-request-orp.component.scss']

})

export class HireRequestORPComponent implements OnInit {





  checkedvalue = "";

  hirestatus: boolean;

  numSelected: boolean = false;



  hireradio: string;

  disabled: boolean;

  numSelect: boolean;

  jobForm: boolean = true;

  checkobj = [];

  hireORParray: any = [];

  enableLoadingMsg: boolean = false;

  geodata: any;

  banddata: any;

  towerdata: any;

  hostName: any;

  httpOptions: any;

  dataSource = new MatTableDataSource();

  enabledNoDataMsg = false;

  backfillarray = [];
  bacfilldata: boolean;
  displaymesg: boolean = false;
  checkIfOthersAreSelected: boolean;
  amt = 0;
  maxNo = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  maxSelected: any;
  ccndata: boolean;





  @ViewChild(MatSort) sort: MatSort;
  deptCode: any;



  // constructor(public dialog: MatDialog,) { }

  constructor(private router: Router, private location: Location,

    public dialogRef: MatDialogRef<HireRequestORPComponent>,

    public dialog: MatDialog,

    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private hireORPService: HireORPService,
    public hiringForm: HiringFormService, private notification: NotificationService) {



    ////console.log(data);
    this.hiringForm.setHiringAs(data[0].hiringAs);
    this.hiringForm.setBackFillData(data);
    localStorage.setItem('backFillData', JSON.stringify(data));


    if (data[0].hiringAs.toLowerCase().includes('backfill')) {

      this.backfillarray = data;
      this.bacfilldata = true;
    }
    else if (data[0].hiringAs == 'New Growth-CCN/PCR') {
      this.ccndata = true;
      this.bacfilldata = false;
      this.backfillarray.length = data[0].quantity;
    }
    else {

      this.bacfilldata = false;

    }

    this.geodata = data[0].geo;
    this.banddata = data[0].band;
    this.towerdata = data[0].tower;
    this.deptCode = data[0].deptCode;

  }

  ngOnInit() {
    if (this.bacfilldata == true) {
      this.fetchORPBackfillDetails(this.banddata, this.towerdata,this.deptCode);
    }
    if (this.bacfilldata == false) {
      this.fetchORPNewGrowthDetails(this.banddata,this.deptCode);
    }
  }



  fetchORPBackfillDetails(band: any, tower: any,deptCode:any) {



    this.enabledNoDataMsg = false;

    this.enableLoadingMsg = false;



    this.hireORPService.getORPBackfillTableDetails<HireRequest[]>(band, tower,deptCode).subscribe((data: HireRequest[]) => {

      this.dataSource.data = data;

      if (this.dataSource.data !== null) {

        this.enableLoadingMsg = true;

      }

      if (this.dataSource.data.length === 0) {

        this.enabledNoDataMsg = true;

      }

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }
  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);

    // this.snackBar.open(CommonMessageProperties.SERVER_ERROR_MESSAGE, 'Close', {
    //   duration: this.durationInSeconds * 1000,
    //   panelClass: ['mat-snackbar'],
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }
  fetchORPNewGrowthDetails(band: any,deptCode:any) {



    this.enabledNoDataMsg = false;

    this.enableLoadingMsg = false;



    this.hireORPService.getORPNewGrowthTableDetails<HireRequest[]>(band,deptCode).subscribe((data: HireRequest[]) => {

      this.dataSource.data = data;


      if (this.dataSource.data !== null) {

        this.enableLoadingMsg = true;

      }

      if (this.dataSource.data.length === 0) {

        this.enabledNoDataMsg = true;

      }

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }



  checkhire($event: any) {

    this.jobForm = false;

    this.checkedvalue = $event.value;

    if (this.bacfilldata == true && this.checkedvalue == 'Match_in_skill_found')
      this.amt === this.backfillarray.length ? this.jobForm = false : this.jobForm = true;


  }



  openDialog1(valueboolean): void {

    const dialogRef = this.dialog.open(HiredialogComponent, {
      disableClose: true,
      data: valueboolean

    });

  }





  displayedColumns: string[] = ['select', 'empId', 'employeeName', 'band', 'DeptCode', 'deptName', 'supMailId', 'supName', 'SubProcess'];

  selection = new SelectionModel<HireRequest>(true, []);





  updateCheckedList(event, index, data) {

    if (event.checked == true) {
      this.amt++
      this.disabled = true;
      this.hireradio = null;
      this.jobForm = true;
      this.hireORParray.push(data);
      this.hireORParray.map(e => {
        e['empName'] = e['employeeName'];
        e['map'] = "ORP"
      })

      if (this.bacfilldata == true || this.ccndata == true)
        this.amt === this.backfillarray.length ? this.maxNo = true : this.maxNo = false;

      this.numSelected = true;
    }

    else if (event.checked == false) {
      this.amt--;
      this.disabled = true;

      this.hireradio = null;

      this.jobForm = true;

      var hindex = this.hireORParray.indexOf(data)
      this.hireORParray.splice(hindex, 1);

      if (this.bacfilldata == true || this.ccndata == true)
        this.amt === this.backfillarray.length ? this.maxNo = true : this.maxNo = false;

      if (this.hireORParray.length != 0) {
        this.numSelected = true;

        this.disabled = true;

      }

      else {

        this.numSelected = false;


        this.disabled = false;

      }

    }

    localStorage.setItem('orpData', JSON.stringify(this.hireORParray))

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  navigateGRB() {

    if (this.numSelected == true && this.checkedvalue == "Suitable_skill_not_found") {

      this.hirestatus = true;

      this.hireradio = null;

      this.openDialog1(this.hirestatus)

    }

    else if (this.numSelected == false && this.checkedvalue == "Suitable_skill_not_found") {

      //send suyogs json object

      //send both json object

      this.dialogRef.close();



      this.hiringForm.setOrpData([]);

      this.router.navigateByUrl('/create-request/hiresubmit?hireType=external');





    }

    else if (this.numSelected == true && this.checkedvalue == "Assessment_WIP") {

      this.hirestatus = true;

      this.dialogRef.close();

      this.hiringForm.setOrpData([]);

      this.openDialog1(this.hirestatus)

    }

    else if (this.checkedvalue == "Assessment_WIP" && this.numSelected == false) {

      this.hirestatus = false;

      this.hireradio = null;

      this.openDialog1(this.hirestatus)

      this.dialogRef.close();

    }

    else if (this.checkedvalue == "Match_in_skill_found" && this.numSelected == true) {

      //send both json object

      this.dialogRef.close();

      this.hiringForm.setOrpData(this.hireORParray);


      this.router.navigateByUrl('/create-request/hiresubmit?hireType=internal');




    }



  }
  close() {
    this.dialogRef.close();
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (path.includes('new-growth')) {
      window.location.reload();
    }
  }

}