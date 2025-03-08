import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator, MatDialogConfig } from '@angular/material';
import { AttritionDialogComponent } from '../attrition-dialog/attrition-dialog.component';
import { WithdrawResignationComponent } from '../withdraw-resignation/withdraw-resignation.component';
import { AttritionCommentboxComponent } from '../attrition-commentbox/attrition-commentbox.component';
import { Attrition } from 'src/app/tsclasses/attrition';
import { AttritionService } from 'src/app/services/attrition.service';
import { AttritionApproveCommentboxComponent } from '../attrition-approve-commentbox/attrition-approve-commentbox.component';
import { DataSource } from '@angular/cdk/table';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AttritionWithdrawResignationComponent } from '../attrition-withdraw-resignation/attrition-withdraw-resignation.component';
import { environment } from 'src/environments/environment';
import { ExcelService } from 'src/app/services/excel.service';
import { ReportsService } from 'src/app/services/reports.service';




@Component({
  selector: 'app-attrition',
  templateUrl: './attrition.component.html',
  styleUrls: ['./attrition.component.scss']
})
export class AttritionComponent implements OnInit {

  ELEMENT_DATA: Attrition[];
  role: any;
  count: any;
  displayedColumns: string[] = ['empId', 'employeeName', 'band', 'deptCode', 'deptName', 'employeeType', 'tower', 'iot', 'subProcess', 'dor', 'lwd', 'seperationReason', 'action'];


  dataSource: MatTableDataSource<any>;
  roles: any=[];
;
  private paginator: MatPaginator;
  private sort: MatSort;
  // disableWithdraw:boolean;
  showLoader = true;
  enabledNoDataMsg: boolean = false;
  constructor(public dialog: MatDialog, private reports: ReportsService, private attritionservice: AttritionService, public userdetails: UserDetailsService, public excelService: ExcelService) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.role = userdetails.getHighestRole();
    this.roles = userdetails.getRoles();
  }



  ngOnInit() {

    this.getAttritionDetails();
    this.loadAttrition();
  }

  getAttritionDetails() {
    this.attritionservice.attrition$.subscribe(data => {
      let invoked = this.attritionservice.getFetchedAttrition();
      if (invoked) {
        this.showLoader = false
      } else {
        this.showLoader = true;
      }
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      this.count = this.dataSource.data.length;
      if (this.dataSource.data.length === 0) {
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;

      }
    })
  }
  loadAttrition() {
    this.attritionservice.getAttritionList(this.role).subscribe((data: any[]) => {
      this.showLoader = false;
      if(data)
      if(data.length>0)
      data.sort((a, b) => {
        return new Date(b['dor']).getTime() - new Date(a['dor']).getTime();
      });
      this.attritionservice.setattrition(data)

    });

  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
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

  checkBackfillApproval(backfillApproval): boolean {
    if (backfillApproval == 'InProgress') { return true; }
    return false;
  }

  checkBackfillRequest(backfillApproval): boolean {
    if (backfillApproval == null) { return true; }
    return false;
  }


  checkLWD(lwd): boolean {
    let date90 = new Date(lwd);
    date90.setDate(date90.getDate() + 90);
    let date180 = new Date(lwd);
    date180.setDate(date180.getDate() + 180);
    
    let currentDate = new Date();
    if (date90 <= currentDate && currentDate <= date180) {
      return true;
    }
    return false;

  }

  checkBackfillYesNo(backfillYesNo, backfillApproval): boolean {
    if (backfillYesNo == 'YES' || backfillApproval == 'Approved') {
      return true;
    }
    return false;
  }


  checkRole() {
    if (this.roles.includes('GRBEO') || this.roles.includes('ADMIN')  || this.roles.includes('IOTINT')) {
      return true;
    }
    return false;
  }


  checkBeforeWithdraw(lwd): boolean {
    let date = new Date(lwd);
    let currentDate = new Date();
    let checkDate = new Date(lwd)
    checkDate.setDate(checkDate.getDate() + 10);
    // //////////console.log("lwd: "+date);
    // //////////console.log("current: "+currentDate);
    // //////////console.log("lwd+10: "+checkDate);
    if (date < currentDate && currentDate <= checkDate) {
      return false;
    }
    return true;
  }


  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }


  checkBackfillApprovalApprove(backfillApproval): boolean {
    if (backfillApproval == "InProgress" || backfillApproval == 'Approved') { return true; }
    return false;
  }



  openDialog(element) {
    const dialogRef = this.dialog.open(AttritionDialogComponent, {
      width: '500px',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('The dialog was closed');

    });
  }

  withdrawResignation(element) {
    let date = new Date(element.lwd);
    let currentDate = new Date();
    let checkDate = new Date(element.lwd)
    checkDate.setDate(checkDate.getDate() + 10);
    if (date < currentDate && currentDate <= checkDate) {
      this.displayWithdrawIcon(element);
    }

  }

  displayWithdrawIcon(element) {
    const dialogRef = this.dialog.open(AttritionWithdrawResignationComponent, {
      width: '500px',
      height: '300px',
      data: element,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('The dialog was closed');
      let data = this.ELEMENT_DATA.filter(e => e.empId != result['empId'])
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
    });
  }

  displayRequestCommentbox(element) {

    const dialogRef = this.dialog.open(AttritionCommentboxComponent, {
      width: '500px',
      height: '300px',
      data: element,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('The dialog was closed');

    });
  }


  displayApproveCommentbox(element) {

    const dialogRef = this.dialog.open(AttritionApproveCommentboxComponent, {
      width: '500px',
      height: '300px',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('The dialog was closed');

    });
  }

  exportData() {


    let url = environment.EXPORT_ATTRITED_EMPLOYEES + this.role;
    this.reports.setDownloadingReport('ATTRITED EMPLOYEES');
    this.excelService.exportData(url).subscribe(data => {
      //////////console.log(data)
      this.reports.popDownloadingReport('ATTRITED EMPLOYEES');
      this.excelService.saveAsExcelFile(data['body'], 'ATTRITED_EMPLOYEES');

    })
  }


}
