import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { BackfillDialogComponent } from '../backfill-dialog/backfill-dialog.component';
import { MatDialog } from '@angular/material';
import { RouterModule } from '@angular/router';
import { BackfillService } from 'src/app/services/backfill.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { BackfillAttrition } from 'src/app/tsclasses/backfill-attrition';
import { HireRequestORPComponent } from '../hire-request-orp/hire-request-orp.component';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { BackfillPromotion } from 'src/app/tsclasses/backfill-promotion';

@Component({
  selector: 'app-backfill-promotion',
  templateUrl: './backfill-promotion.component.html',
  styleUrls: ['./backfill-promotion.component.scss']
})
export class BackfillPromotionComponent implements OnInit {

  ELEMENT_DATA: BackfillPromotion[] = [];
  displayedColumns: string[] = ['select', 'empId', 'empName', 'status', 'deptName', 'band', 'lwd', 'tower', 'sup_name', 'empType'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //selection = new SelectionModel<PeriodicElement>(true, []);
  dataSource = new MatTableDataSource<BackfillPromotion>(this.ELEMENT_DATA);
  selection = new SelectionModel<BackfillPromotion>(true, []);

  checkobj: any = [];
  numSelected: boolean;
  select: boolean;
  data: any;
  showButtons: boolean;
  role: "";
  enabledNoDataMsg: boolean;
  showLoader = true;
  enableLoadingMsg: boolean = false;



  constructor(private hiringForm:HiringFormService,public dialog: MatDialog, public backfillService: BackfillService, public userdetailsService: UserDetailsService) {
    this.role = this.userdetailsService.getHighestRole();
    this.hiringForm.nullifyTemplate();

    if(!localStorage.getItem('backFillData')){
      this.back()
    }
  }

  
  ngOnInit() {
    this.role = this.userdetailsService.getHighestRole();
    //this.dataSource.data=this.ELEMENT_DATA;
    //this.numSelected=false;
   
    this.getData();
    this.numSelected = false;
  }

  selectedRow(event: any, row: any) {
    if (event.checked == true) {
  
   //   if (this.numSelected == false) {
        this.showButtons = true;
        var newArray = this.ELEMENT_DATA.filter(function (el) {
          return el.band == row.band &&
            el.tower == row.tower &&
            // el.geo == row.geo
             el.deptCode == row.deptCode &&
             el.subProcess == row.subProcess 
        });
        this.dataSource.data = newArray;
        this.numSelected = true;
     // }
      this.data = {

        empId: row.empid,
        empName: row.empname,
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
        employeeType: row.emptype,
        map: 'Attrition',
        hiringAs: 'Backfill-Promotion'

      }
      this.checkobj.push(this.data);

    }

    else if (event.checked == false) {
      this.data = {

        empId: row.empid,
        empName: row.empname,
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
        employeeType: row.emptype,
        map: 'Attrition',
        hiringAs: 'Backfill-Promotion'


      }
      this.checkobj = this.checkobj.filter(e => e.empId !== this.data.empId)
    }
  }

  getData() {
    this.enableLoadingMsg = true;
    this.backfillService.getBackfillPromotionList(this.role).subscribe((data: any[]) => {
      this.showLoader = false;
      this.hiringForm.nullifyTemplate();

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


  back() {
    this.showButtons = false;
    this.checkobj=[];
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
      width: '1350px',
      // height: '75vh',
      disableClose: true,
      data: this.checkobj

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
