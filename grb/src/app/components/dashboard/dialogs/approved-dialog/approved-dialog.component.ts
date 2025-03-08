import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HiringStatus } from 'src/app/tsclasses/hiring-status.model';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { OnBoardedEmployee } from 'src/app/tsclasses/onboarded-employee.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-approved-dialog',
  templateUrl: './approved-dialog.component.html',
  styleUrls: ['./approved-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ApprovedDialogComponent implements OnInit {

  hiddenFlag: boolean = true;
  ELEMENT_DATA = [];
  name: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  metroFields = [];
  metroFieldLabels: any;
  isApprovedRequest: boolean = true;
  displayedColumns: string[] = ['metro', 'band', 'grb', 'reqid', 'reqstatus', 'icon'];
  hiringDisplayedColumns: string[] = ['GRB', 'ReqID', 'Status', 'Icon'];
  allMetroFields: any;
  bizOpsStatus: string;
  metroNumber: any;
  dataSource = new MatTableDataSource<HiringStatus>();
  expandedElement: RequestDashboard | null;
  onBoardEmployee = [];
  onBoarEmployeeLabels = ['cNum', 'FirstName', 'LastName', 'DOJ'];
  enabledNoDataMsg: boolean = false;
  enablePlusForCI: boolean = false;
  enablePlusForANOB: boolean = false;
  enablePlusForOB: boolean = false;
  enableLoadingMsg: boolean;
  enableLoadingMsgEmployee: boolean;
  enabledNoDataMsgEmp: boolean = false;

  constructor(public dialogRef: MatDialogRef<ApprovedDialogComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService) {
    this.metroNumber = data.metroNumber;
  }

  ngOnInit() {
    this.onLoad();
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
  //  Filter Function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // On Rec status click
  onLoad() {
    this.hiddenFlag = false;
    this.fetchHiringDetails(this.metroNumber);
  }

  //Dashboard Service call to fetch HiringStatus
  fetchHiringDetails(metroNo: string) {
    this.enableLoadingMsg = true;
    this.enabledNoDataMsg = false;
    this.dashboardService.getMetroApprovedDetails<HiringStatus[]>(metroNo).subscribe((data: HiringStatus[]) => {
      this.dataSource.data = data;
      if (data.length === 0) {
        this.enabledNoDataMsg = true;
      }
      if (this.dataSource.data !== null) {
        this.enableLoadingMsg = false;
      }
      this.dataSource.data.filter((res => {
        if (res.reqstatus === 'CI' || res.reqstatus === 'ANOB' || res.reqstatus === 'OB') {
          this.enablePlusForCI = true;
        }
      }));
    });
  }

  onPlusClick(element) {
    this.onBoardEmployee = [];
    this.expandedElement = this.expandedElement === element ? null : element;

    if (element.reqstatus !== undefined && element.reqid !== undefined) {
      this.enableLoadingMsg = false;
      this.enableLoadingMsgEmployee = true;
      this.enabledNoDataMsgEmp = false;
      this.dashboardService.getOnBoardedEmployee<OnBoardedEmployee[]>(element.reqstatus, element.reqid).subscribe((data: OnBoardedEmployee[]) => {
        this.onBoardEmployee = [];
        if (data.length > 0) {
          this.enableLoadingMsgEmployee = false;
          this.enabledNoDataMsgEmp = false;
          data.filter((res => {
            this.onBoardEmployee.push({
              cNum: res.cNum,
              firstName: res.firstName,
              lastName: res.lastName,
              doj: res.doj
            }
            );
          }))
        } else {
          this.enabledNoDataMsgEmp = true;
          this.enableLoadingMsgEmployee = false;
        }
      });
    }
  }

}
