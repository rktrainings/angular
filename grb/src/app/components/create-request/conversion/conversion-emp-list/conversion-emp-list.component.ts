import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HireRequest } from 'src/app/models/hirerequest';
import { ConversionService } from 'src/app/services/conversion.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { data } from 'jquery';


@Component({
  selector: 'app-conversion-emp-list',
  templateUrl: './conversion-emp-list.component.html',
  styleUrls: ['./conversion-emp-list.component.scss']
})
export class ConversionEmpListComponent implements OnInit {
  enableLoadingMsg: boolean;
  displayedColumns: string[] = ['select', 'empId', 'employeeName', 'band', 'tower', 'DeptCode', 'deptName', 'contractEndDate'];
  dataSource = new MatTableDataSource();

  submitbutton: boolean = true;
  checkedvalue: any;
  refresh: boolean;
  selection = new SelectionModel<HireRequest>(true, []);
  storeData: any = [];
  checkobj: any = [];
  ELEMENT_DATA: any = [];
  enabledNoDataMsg: boolean;
  showLoader = true;
  hiringAs: String;
  amt = 0;

  constructor(private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConversionEmpListComponent>, public conversionService: ConversionService, public hiringForm: HiringFormService,) {
    ////console.log(data);
    this.checkedvalue = data;
    if (this.checkedvalue == "Non Regular To Regular") {
      this.getData();
      this.hiringAs = 'Conversion-Non Regular To Regular';
    }
    else if (this.checkedvalue == "Non Regular Promotion") {
      this.getData();

      this.hiringAs = 'Conversion-Non Regular Promotion';
    }
    else {
      this.hiringAs = 'Conversion-Non Regular Extension';
      this.getExtensionData();
    }
  }

  ngOnInit() {
    this.nullifyTemplateData();
  }
  nullifyTemplateData() {
    this.hiringForm.nullifyTemplateData();
  }
  
  getData() {
    this.enableLoadingMsg = true;
    this.conversionService.getConversionEmployeesList().subscribe((data: any[]) => {
      ////console.log(data);
      
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['contractEndDate']).getTime() - new Date(a['contractEndDate']).getTime();
        });
      }
      this.ELEMENT_DATA = data;

      this.dataSource.data = data;
      if (this.dataSource.data !== null) {
        this.enableLoadingMsg = false;
      }
      if (this.dataSource.data.length === 0) {
        this.enableLoadingMsg = false;
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;

      }
    });
  }
  getExtensionData() {
    this.enableLoadingMsg = true;
    this.conversionService.getConversionExtensionEmployeesList().subscribe((data: any[]) => {
      // this.showLoader = false;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['contractEndDate']).getTime() - new Date(a['contractEndDate']).getTime();
        });
      }
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      if (this.dataSource.data !== null) {
        this.enableLoadingMsg = false;
      }
      if (this.dataSource.data.length === 0) {
        this.enableLoadingMsg = false;
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;

      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  refreshChange() {
    this.refresh = false;
  }
  updateConversionList(event: any, index: any, row: any) {
    if (event.checked == true) {
      this.amt++;
      this.submitbutton = false;
      var newArray = this.ELEMENT_DATA.filter(function (el) {
        return el.band == row.band &&
          el.deptCode == row.deptCode && el.tower == row.tower
      });
      this.dataSource.data = newArray;

      this.data = {

        empId: row.empId,
        empName: row.empName,

        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        lwd: row.contractEndDate,
        geo: row.geo,
        tower: row.tower,
        supId: row.supId,
        supName: row.supName,
        extensionPeriod: '',
        employeeType: row.employeeType,
        map: 'CONVERSION',
        hiringAs: this.hiringAs,
        doj:row.doj,

      }
      this.checkobj.push(this.data);

    }

    else if (event.checked == false) {
      this.amt--;

      if (this.amt == 0) {
        this.dataSource.data = this.ELEMENT_DATA;
        this.submitbutton = true;
      }


      this.data = {

        empId: row.empId,
        empName: row.empName,
        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        lwd: row.contractEndDate,
        geo: row.geo,
        tower: row.tower,
        supId: row.supId,
        supName: row.supName,
        extensionPeriod: '',
        map: 'CONVERSION',
        hiringAs: this.hiringAs
      }
      this.checkobj = this.checkobj.filter(e => e.empId !== this.data.empId);


    }
    ////console.log('checkobj', this.checkobj);


  }
  setGRBTempLoadData(data: any) {
    this.hiringForm.setHiringAs(data[0].hiringAs);
    this.hiringForm.setBackFillData(data);
    localStorage.setItem('backFillData', JSON.stringify(data));
    // if (data[0].hiringAs.toLowerCase().includes('backfill')) {
    //   this.backfillarray = data;
    //   this.bacfilldata = true;
    // }
    // else {
    //   this.bacfilldata = false;
    // }
    // this.geodata = data[0].geo;
    // this.banddata = data[0].band;
    // this.towerdata = data[0].tower;
  }
  navigateGRBTemplate() {

    this.setGRBTempLoadData(this.checkobj);
    if (this.checkedvalue == "Non Regular To Regular" || this.checkedvalue == "Non Regular Promotion") {

      this.dialogRef.close();
      this.router.navigateByUrl('/create-request/hiresubmit?hireType=external');

    }

    else if (this.checkedvalue == "Non Regular Extension") {

      this.dialogRef.close();

      this.router.navigateByUrl('/create-request/hiresubmit?hireType=external&requestType=conversion');




    }

    // else if (this.checkedvalue == "Non Regular Promotion") {
    //   this.dialogRef.close();
    //   this.router.navigateByUrl('/create-request/hiresubmit?hireType=internal');
    // }



  }
  close() {
    // this.dialogRef.close();
    window.location.reload();
    // this.router.navigateByUrl('/create-request/conversion');
  }
}
