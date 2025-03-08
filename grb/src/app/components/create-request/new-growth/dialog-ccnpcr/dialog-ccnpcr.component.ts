import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatDialog, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { HireRequestORPComponent } from 'src/app/components/create-request/hire-request-orp/hire-request-orp.component';

import { DeptRequest } from 'src/app/tsclasses/DeptRequest';
import { CCNPCRservice } from 'src/app/services/ccn-details.service';
import { ccndetials } from 'src/app/tsclasses/ccn-details';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-dialog-ccnpcr',
  templateUrl: './dialog-ccnpcr.component.html',
  styleUrls: ['./dialog-ccnpcr.component.scss']
})
export class DialogCcnpcrComponent implements OnInit {


  monthLists = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  monthList: string;
  month: string;
  columnsToDisplay2 = ['band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  commonFieldsJSON = [{
    deptCode: 'D06',
    deptName: 'D06',
    totalFteCount: 3,
    totalFteUtilized: 10,
    tcv: 10,
    band3: 2,
    band4: 3,
    band5: 3, band6: 3, band7: 3, band8: 3, band9: 3, band10: 12, total: 12,
  }]
  enabledNoDataMsg: boolean;

  ccnpcrlist: string;
  ccnpcrlists: string[];
  deptCode: string;
  deptname: string;
  ftecount: string;
  fteutlized: string;
  tcv: DoubleRange;
  temparray = [];
  ccnorparray: any;
  ccnpcrband: any;
  ccnarray: any;
  data: any;
  ccnnumber: any;
  enableLoadingMsg: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;

  dataSource = new MatTableDataSource<ccndetials[]>();
  showTable: boolean;

  constructor(private router: Router, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogCcnpcrComponent>,
    private hiringForm: HiringFormService, private ccnpcrservice: CCNPCRservice, private spinner: NgxSpinnerService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.fetchccnDropdown();
    this.hiringForm.nullifyTemplateData();
  }

  fetchccnDropdown() {
    this.spinner.show()
    this.ccnpcrservice.getccnlist().subscribe((data: any) => {


      this.ccnpcrlists = data;
      this.spinner.hide()
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));


  }

  fetchccnlist(item) {

    if (this.ccnpcrlist != null && this.monthList != null) {
      this.spinner.show()
      this.ccnpcrservice.getccnDetails<ccndetials[]>(this.ccnpcrlist, this.monthList).subscribe((data: ccndetials[]) => {
        this.dataSource = new MatTableDataSource([data]);
        this.displaydata(data);
        this.ftecount=data['totalFteCount'];
        this.spinner.hide()
        this.showTable = true;

      }, ((httpError: HttpErrorResponse) => {
        this.openErrorSnackBar();
      }));
    }

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
  displaydata(data) {

    //this.ccnDataSource = new MatTableDataSource(this.commonFieldsJSON);

    ////console.log(data)

    this.deptCode = data.deptCode;
    this.deptname = data.deptName;

    this.ftecount = data.totalFteCount;

    if (this.ftecount == null) {

      this.ftecount = 'NA';
    }
    this.fteutlized = data.totalFteUtilized;
    if (this.fteutlized == null) {
      this.fteutlized = 'NA';
    }
    this.tcv = data.tcv;
  }

  fetchband(element, band, quantity) {
    this.ccnpcrservice.setCcnAndMonth(this.ccnpcrlist, this.month);

    if (this.deptCode.length == 3) {
      this.enableLoadingMsg = true;
      this.deptCode = element.deptCode;
      this.spinner.show()
      this.ccnpcrservice.getdeptDetails<DeptRequest[]>(this.deptCode).subscribe((data: any) => {
        this.data = [{
          deptCode: element.deptCode,
          tcv: element.tcv,
          band: band,
          hiringAs: 'New Growth-CCN/PCR',
          geo: data.geo,
          tower: data.tower,
          toDate: element.toDate,
          fromDate: element.fromDate,
          ccnNumber: this.ccnpcrlist,
          month: this.monthList,
          quantity: quantity,
          fteCount:this.ftecount
        }]

        //console.log(this.data);
        
        this.orpdialog(this.data);


      }, ((httpError: HttpErrorResponse) => {
        this.openErrorSnackBar();
      }));
    }
  }

  orpdialog(dataccn) {

    this.spinner.hide()
    const dialogRef = this.dialog.open(HireRequestORPComponent, {
      width: '1350px',
      // height: '75vh',
      data: dataccn,
      disableClose: true,

    });

    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
    this.router.navigateByUrl('/main-menu');
  }
}
