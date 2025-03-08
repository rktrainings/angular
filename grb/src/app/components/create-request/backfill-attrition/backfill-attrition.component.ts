import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BackfillDialogComponent } from '../backfill-dialog/backfill-dialog.component';
import { MatDialog } from '@angular/material';
import { BackfillService } from 'src/app/services/backfill.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { BackfillAttrition } from 'src/app/tsclasses/backfill-attrition';
import { HireRequestORPComponent } from '../hire-request-orp/hire-request-orp.component';
import { element } from 'protractor';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import { HiringFormService } from 'src/app/services/hiring-form.service';


@Component({
  selector: 'app-backfill-attrition',
  templateUrl: './backfill-attrition.component.html',
  styleUrls: ['./backfill-attrition.component.scss']
})
export class BackfillAttritionComponent implements OnInit {
  ELEMENT_DATA: BackfillAttrition[] = [];
  displayedColumns: string[] = ['select', 'empId', 'empName', 'status', 'deptName', 'band', 'lwd', 'tower', 'sup_name', 'empType'];

  dataSource = new MatTableDataSource<BackfillAttrition>();
  selection = new SelectionModel<BackfillAttrition>(true, []);
  elements: BackfillAttrition[]
  checkobj: any = [];
  numSelected: boolean;
  numSelect: boolean;
  data: any;
  showButtons: boolean;
  role: "";
  enabledNoDataMsg: boolean = false;
  showLoader = true;
  enableLoadingMsg: boolean = false;
  storeData = [];
  refresh = false;

  constructor(private hiringForm: HiringFormService, public dialog: MatDialog, public backfillService: BackfillService, public userdetailsService: UserDetailsService) {
    this.role = this.userdetailsService.getHighestRole();
  }

  ngOnInit() {
    console.log("in init");
    


    this.role = this.userdetailsService.getHighestRole();
    //this.dataSource.data=this.ELEMENT_DATA;
    //this.numSelected=false;
    this.getData();
    this.numSelected = false;
    this.getBackFillData()
  }


  getBackFillData() {
    this.backfillService.backFill$.subscribe((data: any[]) => {
      this.hiringForm.nullifyTemplate();
      let checked = false;

      // let invoked=this.backfillService.getBackFillInvoked()
      let invoked = false;
      if (invoked) {
        this.showLoader = false
      }

      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      // if (!localStorage.getItem('backFillData')) {
      //   checked = false;
      //   data.map(e => {
      //     e['checked'] = checked;
      //   })
      // } else {
      //   checked = true
      // }

      if (data.length === 0) {
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;
      }
      // if (localStorage.getItem('backFillData')) {
      //   this.refresh = true;
      //   data.map(e => {
      //     let backfillData = JSON.parse(localStorage.getItem('backFillData'));
      //     backfillData.forEach(each => {
      //       if (e['empId'] == each['empId']) {
      //         e['checked'] = checked;
      //         let event = { checked: checked }
      //         this.selectedRow(event, each)
      //       }
      //     })
      //   })
      // }
    })
  }
  refreshChange() {
    this.refresh = false;
  }
  selectedRow(event: any, row: BackfillAttrition) {
    if (event.checked == true) {
      const json = {
        map: 'Attrition',
        hiringAs: 'Backfill-Attrition'
      }
      this.storeData.push({ ...row, ...json })
      // if (this.numSelected == false) {
      this.showButtons = true;

      var newArray = this.ELEMENT_DATA.filter((el) => {
        return el.band == row.band &&
          el.tower == row.tower &&
          el.deptCode == row.deptCode &&
          el.subProcess == row.subProcess
      });
      this.dataSource.data = newArray;
      this.numSelected = true;
      // }
      this.data = {

        empId: row.empId,
        empName: row.employeeName,
        status: row.status,
        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        dor: row.dor,
        lwd: row.lwd,
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        employeeType: row.employeeType,
        map: 'Attrition',
        hiringAs: 'Backfill-Attrition'

      }
      this.checkobj.push(this.data);
      // this.elements.push(row)

    }

    else if (event.checked == false) {
      this.data = {

        empId: row.empId,
        empName: row.employeeName,
        status: row.status,
        deptCode: row.deptCode,
        deptName: row.deptName,
        band: row.band,
        dor: row.dor,
        lwd: row.lwd,
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        employeeType: row.employeeType,
        map: 'Attrition',
        hiringAs: 'Backfill-Attrition'



      }
      this.checkobj = this.checkobj.filter(e => e.empId !== this.data.empId)
      this.storeData = this.storeData.filter(e => e.empId !== this.data.empId)

      // this.elements = this.elements.filter(e => e.empId !== e.empId)

    }
    if (!this.refresh)
      localStorage.setItem('backFillData', JSON.stringify(this.storeData))
  }

  getData() {
    // this.enableLoadingMsg = true;
    this.showLoader = true;
    this.backfillService.getBackfillAttritionList(this.role).subscribe((data: any[]) => {
      this.showLoader = false;
      this.backfillService.setBackFillData(data)

      // this.ELEMENT_DATA = data;
      // this.dataSource.data = data;


      // // if (this.dataSource.data !== null) {
      // //   this.enableLoadingMsg = false;
      // // }
      // if (this.dataSource.data.length === 0) {
      //   // this.enableLoadingMsg = false;
      //   this.enabledNoDataMsg = true;
      // } else {
      //   this.enabledNoDataMsg = false;
      // }


    });


  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.numSelected = false;
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
  }


  back() {
    if (localStorage.getItem('backFillData')) {
      this.refresh = false;
      this.ELEMENT_DATA.map(e => {
        let backfillData = JSON.parse(localStorage.getItem('backFillData'));
        backfillData.forEach(each => {
          if (e['empId'] == each['empId']) {
            e['checked'] = false;
            let event = { checked: false }
            this.selectedRow(event, each)
          }
        })
      })
    }
    localStorage.removeItem('backFillData')


    this.showButtons = false;
    // this.getData();
    this.checkobj = [];
    this.dataSource.data = this.ELEMENT_DATA;
    this.numSelected = false;
  }

  displayDialogbox() {

    const dialogRef = this.dialog.open(BackfillDialogComponent, {
      width: '300px',
      // height: '300px',
      disableClose: true,
      data: false
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  OPRDialog() {


    const dialogRef = this.dialog.open(HireRequestORPComponent, {
      width: '1450px',
      // height: '75vh',
      disableClose: true,
      data: this.checkobj

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}


