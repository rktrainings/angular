import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';
import { ApprovedDialogComponent } from '../../dialogs/approved-dialog/approved-dialog.component';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.scss']
})
export class ApprovedRequestComponent implements OnInit {

  step = 0;
  name: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tempArray = [];
  pendingRequest: any;
  isApprovedRequest: boolean = false;
  //private request: RequestDashboard[] = [];
  dataSource = new MatTableDataSource<RequestDashboard>();
  pendingData: any[];
  enabledNoDataMsg: boolean = false;

  @Input() pendingDataSource: any;
  @Input() approvedDataSources: any[];
  @Input() enabledPending: any;
  @Input() enabledApproved: any;

  displayedColumns: string[] = ['metroNumber', 'status', 'band', 'totalQuantity', 'deptName', 'requestSubmittedBy', 'requestSubmittedDate',
    'boardApprovalDate', 'hireType', 'hiringAs'];

  constructor(public dialog: MatDialog) {
  }


  ngOnInit() {
    if (this.enabledPending === 'Enabled') {
      this.dataSource.data = this.pendingDataSource;
    } else if (this.enabledApproved === 'Enabled') {
      this.dataSource.data = this.approvedDataSources;
      this.isApprovedRequest = true;
    }
    this.dataSource.data.sort((a, b) => {
      return new Date(b['requestSubmittedDate']).getTime() - new Date(a['requestSubmittedDate']).getTime();
    });
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

  metroDetails: any;
  onMetroClick(element: any) {
    this.openApprovedDialog(element.metroNumber)
  }

  pushMetroDetails(metroDetails: any) {
    this.openApprovedDialog(metroDetails);
  }

  // Dialogbox for on metro no click
  openApprovedDialog(metroNumber: any): void {
   // this.metroDetails = data;
    const dialogRef = this.dialog.open(ApprovedDialogComponent, {
      disableClose: true,
      width: '100vh',
      data: {
        metroNumber: metroNumber
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }


}
