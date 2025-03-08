import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';
import { MetroDetails } from 'src/app/tsclasses/metro-details';
import { PendingDialogComponent } from '../../dialogs/pending-dialog/pending-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {

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
  rowHighlightEnabled: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;


  @Input() pendingDataSource: any;
  @Input() approvedDataSources: any[];
  @Input() enabledPending: any;
  @Input() enabledApproved: any;

  displayedColumns: string[] = ['metroNumber', 'band', 'totalQuantity', 'deptName', 'requestSubmittedBy', 'requestSubmittedDate',
    "hireType", "hiringAs", "submitted", 'bizopsStatus', 'iotStatus', 'boardStatus'];

  constructor(public dialog: MatDialog,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) {
  }


  ngOnInit() {
    if (this.enabledPending === 'Enabled') {
      this.dataSource.data = this.pendingDataSource;
    } else if (this.enabledApproved === 'Enabled') {
      this.dataSource.data = this.approvedDataSources;
      this.isApprovedRequest = true;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    this.dataSource.data.sort((a, b) => {
      return new Date(b['requestSubmittedDate']).getTime() - new Date(a['requestSubmittedDate']).getTime();
    });
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
    this.fetchMetroDetails(element.metroNumber);
  }

  //Dashboard Service call to fetch metroDetails
  fetchMetroDetails(metroNo: string) {
    this.spinner.show()
    this.dashboardService.getMetroPendingDetails<MetroDetails[]>(metroNo).subscribe((data: MetroDetails[]) => {
      this.spinner.hide();
      this.pushMetroDetails(data);
    }, (() => {
      this.spinner.hide();
      this.openErrorSnackBar();
    }));
  }

  pushMetroDetails(metroDetails: any) {
    this.openMetroDialog(metroDetails);
  }

  // Dialogbox for on metro no click
  openMetroDialog(data: any): void {
    this.metroDetails = data;
    const dialogRef = this.dialog.open(PendingDialogComponent, {
      disableClose: true,
      width: '70vh',
      data: {
        metroDetails: this.metroDetails,
        isApprovedRequest: this.isApprovedRequest
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pendingDataSource = this.pendingDataSource.filter(e => e.metroNumber != result);
      this.dataSource.data = this.pendingDataSource;
    });
  }

  getBoardColor(element: any) {
    switch (element.colour) {
      case 'default':
        if (element.boardStatus !== undefined) {
          if (element.boardStatus === 'APPROVED') {
            return 'green';
          } else if (element.boardStatus === 'NOT_REVIEWED') {
            return 'red';
          } else if (element.boardStatus === '') {
            return 'DARKORANGE';
          }
        }
      case 'Blue':
        return 'dodgerblue';
    }
  }

  getIOTColor(element: any) {
    switch (element.colour) {
      case 'default':
        if (element.iotStatus !== undefined) {
          if (element.iotStatus === 'APPROVED') {
            return 'green';
          } else if (element.iotStatus === 'NOT_REVIEWED') {
            return 'red';
          } else if (element.iotStatus === '') {
            return 'DARKORANGE';
          }
        }
      case 'Blue':
        return 'dodgerblue';
    }
  }

  getBizopsColor(element: any) {
    switch (element.colour) {
      case 'default':
        if (element.bizopsStatus !== undefined) {
          if (element.bizopsStatus === 'APPROVED') {
            return 'green';
          } else if (element.bizopsStatus === 'NOT_REVIEWED' || element.bizopsStatus === 'MORE_INFORMATION') {
            return 'red';
          } else if (element.bizopsStatus === '') {
            return 'DARKORANGE';
          }
        }

      case 'Blue':
        return 'dodgerblue';
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


}
