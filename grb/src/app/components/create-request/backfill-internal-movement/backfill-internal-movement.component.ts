import { Component, OnInit } from '@angular/core';
import { InternalMovement } from 'src/app/tsclasses/internal-movement';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { BackfillService } from 'src/app/services/backfill.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { BackfillDialogComponent } from '../backfill-dialog/backfill-dialog.component';
import { HireRequestORPComponent } from '../hire-request-orp/hire-request-orp.component';
import { HiringFormService } from 'src/app/services/hiring-form.service';

@Component({
  selector: 'app-backfill-internal-movement',
  templateUrl: './backfill-internal-movement.component.html',
  styleUrls: ['./backfill-internal-movement.component.scss']
})
export class BackfillInternalMovementComponent implements OnInit {

  ELEMENT_DATA: InternalMovement[] = [];
  displayedColumns: string[] = ['select', 'empId', 'empName', 'currentDeptName', 'newDeptName', 'band', 'tower', 'effectiveDate', 'empType'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource<InternalMovement>(this.ELEMENT_DATA);
  selection = new SelectionModel<InternalMovement>(true, []);

  checkobj: any = [];
  numSelected: boolean;
  select: boolean;
  data: any;
  showButtons: boolean;
  role: "";
  enabledNoDataMsg: boolean;
  showLoader = true;
  enableLoadingMsg: boolean = false;
  refresh: boolean;
  storeData: any = [];



  constructor(private hiringForm: HiringFormService, public dialog: MatDialog, public backfillService: BackfillService, public userdetailsService: UserDetailsService) {
    this.role = this.userdetailsService.getHighestRole();
    this.hiringForm.nullifyTemplate();


  }

  ngOnInit() {
    this.role = this.userdetailsService.getHighestRole();
    //this.dataSource.data=this.ELEMENT_DATA;
    //this.numSelected=false;
    this.getData();
    this.numSelected = false;
    this.getITTData()
  }

  getITTData() {
    // if (localStorage.getItem('backFillData')) {
    //   this.ELEMENT_DATA = JSON.parse(localStorage.getItem('backFillData'));
    //   // this.setSelection(this.ELEMENT_DATA)
    // }
    this.backfillService.ITT$.subscribe((data: any[]) => {
      // let invoked=this.backfillService.getITTInvoked();
      this.hiringForm.nullifyTemplate();

      let invoked = false;
      if (invoked) {
        this.showLoader = false
        //   setTimeout(() => {
        //     this.ELEMENT_DATA = data;
        //     this.dataSource.data = data;
        //   },100000)
        // } else {

      }
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      let checked = false;
      // if (!localStorage.getItem('backFillData')) {
      //   checked = false;
      //   data.map(e => {
      //     e['checked'] = checked;
      //   })
      // } else {
      //   checked = true
      // }
      if (this.dataSource.data !== null) {
        this.enableLoadingMsg = false;
      }
      if (this.dataSource.data.length === 0) {
        this.enableLoadingMsg = false;
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;
      }
      setTimeout(() => {
        this.setSelection(data);
      })

    })
  }

  setSelection(data) {
    if (localStorage.getItem('backFillData')) {
      this.refresh = true
      data.map(e => {
        let backfillData = JSON.parse(localStorage.getItem('backFillData'));
        backfillData.forEach(each => {
          if (e['empId'] == each['empId']) {
            e['checked'] = true;
            let event = { checked: true }
            this.selectedRow(event, each)
          }
        })
      })
    }
  }
  refreshChange() {
    this.refresh = false;
  }
  selectedRow(event: any, row: any) {
    
    if (event.checked == true) {
      const json = {
        map: 'ITT',
        hiringAs: 'Backfill-InternalMovement'
      }
      this.storeData.push({ ...row, ...json })
      //  if (this.numSelected == false) {
      this.showButtons = true;

      var newArray = this.ELEMENT_DATA.filter(function (el) {
        return el.band == row.band &&
          el.tower == row.tower &&
          el.currentDeptCode == row.currentDeptCode &&
          el.subProcess == row.subProcess
      });
      this.dataSource.data = newArray;
      this.numSelected = true;
      //  }
      this.data = {

        empId: row.empId,
        empName: row.employeeName,
        internalTransferId: row.internalTransferId,
  	    newDeptCode: row.newDeptCode,
	      newDeptName: row.newDeptName,
        deptCode: row.currentDeptCode,
        deptName: row.currentDeptName,
        band: row.band,
        dor: row.dor,
        lwd: row.lwd,
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        employeeType: row.employeeType,
        map: 'ITT',
        hiringAs: 'Backfill-InternalMovement'

      }
      //console.log('data:', this.data);
      
      this.checkobj.push(this.data);

    }

    else if (event.checked == false) {
      this.data = {

        empId: row.empId,
        empName: row.employeeName,
        internalTransferId: row.internalTransferId,
  	    newDeptCode: row.newDeptCode,
	      newDeptName: row.newDeptName,
        deptCode: row.currentDeptCode,
        deptName: row.currentDeptName,
        band: row.band,
        dor: row.dor,
        lwd: row.lwd,
        geo: row.geo,
        tower: row.tower,
        subProcess: row.subProcess,
        supId: row.supId,
        supName: row.supName,
        employeeType: row.employeeType,
        map: 'ITT',
        hiringAs: 'Backfill-InternalMovement'



      }
      this.checkobj = this.checkobj.filter(e => e.empId !== this.data.empId);
      this.storeData = this.storeData.filter(e => e.empId !== this.data.empId)

    }
    if (!this.refresh)
      localStorage.setItem('backFillData', JSON.stringify(this.storeData))
  }

  getData() {
    this.enableLoadingMsg = true;
    this.showLoader = true;
    this.backfillService.getITTList(this.role).subscribe((data: any[]) => {
      this.showLoader = false;
      this.backfillService.setITTData(data);

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
    //console.log('ORP-dialog:', this.checkobj);
    


    const dialogRef = this.dialog.open(HireRequestORPComponent, {
      width: '1350px',
      // height: '75vh',
      disableClose: true,
      data: this.checkobj

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
