import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CurrentCostcase } from 'src/app/models/CurrentCostcase';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccdialogComponent } from '../../dialogs/accdialog/accdialog.component';

@Component({
  selector: 'app-currentcc',
  templateUrl: './currentcc.component.html',
  styleUrls: ['./currentcc.component.scss']
})
export class CurrentccComponent implements OnInit {
  AELEMENT_DATA: any;
  //ccDataSource = new MatTableDataSource<CurrentCostcase>();
  pendingRequest: any;
  columnsToDisplay = ['deptCode', 'deptname', 'sdl', 'geo', 'iot'];
  columnsToDisplay2 = ['description', 'band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  pendingDataSource: any = [];
  approvedDataSources: any = [];
  //enabledCCView: any;
  enabledPending: any;
  enabledApproved: any;
  pendingRequestStatus: boolean = false;
  approvedRequestStatus: boolean = false;
  costCaseRequestStatus: boolean = false;
  showLoader: boolean = true;
  showLoaderCC: boolean;
  enableLoadingMsg: boolean = false;
  enabledNoDataMsg = false;
  tabIndex: any = 0;
  pendingDataCount: number;
  approvedDataCount: number;
  ccviewDataCount: number;
  storageCCViewData = [];
  storagePendingData = [];
  storageApprovedData = [];
  pendingCount: string;
  approvedCount: string;
  ccviewCount: string;
  dataSource = new MatTableDataSource();
  @Input() ccDataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  step = 0;


  @Input() enabledCCView: any;
  constructor(public dialog: MatDialog,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    if (this.enabledCCView === 'Enabled') {
      this.dataSource.data = this.ccDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  dataTransfer(data: any) {
    this.pendingRequest = data;
  }

  setStep(index: number) {
    this.step = index;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }

  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(AccdialogComponent, {
      width: '1050px',
      data: {
        deptCode: element.deptCode,
        deptname: element.deptname
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // fetchCurrentCostCase() {
  //   this.enabledNoDataMsg = false;
  //   this.costCaseRequestStatus = false;;
  //   this.enableLoadingMsg = true;
  //   this.dashboardService.getCurrentCostCase<CurrentCostcase[]>().subscribe((data: any[]) => {
  //     this.ccDataSource.data = data;
  //     this.ccviewDataCount = data.length;
  //     // if (this.enabledCCView === 'Enabled' && index === 0) {
  //     //   this.storageCCViewData = data;
  //     // } 
  //     if (this.ccviewDataCount !== 0) {
  //       this.ccviewCount = "[ " + this.ccviewDataCount + " ]"
  //     }
  //     if (this.ccDataSource.data !== null) {
  //       this.enableLoadingMsg = false;
  //     }
  //     this.costCaseRequestStatus = true;
  //   });
  //   this.showLoader = false;
  // }
}
