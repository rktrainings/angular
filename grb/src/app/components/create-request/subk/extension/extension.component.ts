import { Component, OnInit } from '@angular/core';
import { SubkEmployees } from 'src/app/tsclasses/subk-employees';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { SubkService } from 'src/app/services/subk.service';
import { Router } from '@angular/router';
import { SubkDialogComponent } from '../subk-dialog/subk-dialog.component';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.scss']
})
export class ExtensionComponent implements OnInit {

  ELEMENT_DATA: SubkEmployees[] = [];
  displayedColumns: string[] = ['select', 'empId', 'empName', 'status', 'deptName', 'band', 'lwd', 'tower', 'sup_name', 'empType'];

  dataSource = new MatTableDataSource<SubkEmployees>(this.ELEMENT_DATA);
  selection = new SelectionModel<SubkEmployees>(true, []);

  checkobj: any = [];
  numSelected: boolean;
  select: boolean;
  data: any;
  enabledNoDataMsg: boolean;
  showLoader = true;
  enableLoadingMsg: boolean = false;
  backfillarray = [];
  bacfilldata: boolean;
  geodata: any;
  banddata: any;
  towerdata: any;



  constructor(private hiringForm: HiringFormService,
    public dialog: MatDialog,
    public subkService: SubkService,
    private router: Router) {

  }


  ngOnInit() {

    this.getData();
    this.hiringForm.nullifyTemplateData()

  }

  selectedRow(event: any, row: any) {
    if (event.checked == true) {

      //   if (this.numSelected == false) {

      var newArray = this.ELEMENT_DATA.filter(function (el) {
        return el.band == row.band &&
          el.deptCode == row.deptCode && el.tower == row.tower
      });
      this.dataSource.data = newArray;
      this.numSelected = true;
      // }
      this.data = {

        empId: row.empId,
        empName: row.empName,
        status: row.status,
        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        lwd: '',
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        empType: row.empType,
        map: 'SUBK',
        hiringAs: 'Subk-Extension'

      }
      this.checkobj.push(this.data);

    }

    else if (event.checked == false) {
      this.data = {

        empId: row.empId,
        empName: row.empName,
        status: row.status,
        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        lwd: '',
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        empType: row.empType,
        map: 'SUBK',
        hiringAs: 'Subk-Extension'



      }
      this.checkobj = this.checkobj.filter(e => e.empId !== this.data.empId)
    }
    this.setGRBTempLoadData(this.checkobj);
  }

  getData() {
    this.enableLoadingMsg = true;
    this.subkService.getSubkEmployeesList().subscribe((data: any[]) => {
      if (data)
        if (data.length > 0) {
          data.sort((a, b) => {
            return new Date(b['lwd']).getTime() - new Date(a['lwd']).getTime();
          });
        }
      this.showLoader = false;
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
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
  }

  enableButton() {
    if (this.checkobj.length > 0)
      return true;
    else
      return false;
  }

  back() {
    this.ELEMENT_DATA.map(e => {
      this.checkobj.forEach(each => {
        if (e['empId'] == each['empId']) {
          e['checked'] = false;
          let event = { checked: false }
          this.selectedRow(event, each)
        }
      })
    })
    this.checkobj = [];
    this.dataSource.data = this.ELEMENT_DATA;
    this.numSelected = false;
  }

  onSubmit() {
    this.navigateInternalGRB();
  }

  navigateInternalGRB() {
    ////console.log('navigateGRB');
    this.hiringForm.setOrpData([]);
    this.router.navigateByUrl('/create-request/hiresubmit?hireType=external&requestType=subk');
  }

  setGRBTempLoadData(data: any) {
    this.hiringForm.setHiringAs(data[0].hiringAs);
    this.hiringForm.setBackFillData(data);
    localStorage.setItem('backFillData', JSON.stringify(data));
    if (data[0].hiringAs.toLowerCase().includes('backfill')) {
      this.backfillarray = data;
      this.bacfilldata = true;
    }
    else {
      this.bacfilldata = false;
    }
    this.geodata = data[0].geo;
    this.banddata = data[0].band;
    this.towerdata = data[0].tower;
  }

  displayDialogbox() {

    const dialogRef = this.dialog.open(SubkDialogComponent, {
      width: '300px',
      // height: '307px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
