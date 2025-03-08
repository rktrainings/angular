import { Component, OnInit } from '@angular/core';
import { CreateRequestGrb } from 'src/app/tsclasses/create-request-grb';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { CreateRequestGrbService } from 'src/app/services/create-request-grb.service';
import { GrbReviseDialogComponent } from './grb-revise-dialog/grb-revise-dialog.component';
import { BandChangeComponent } from '../../my-request/band-change/band-change.component';
import { GrbBandchangeDialogComponent } from './dialogs/grb-bandchange-dialog/grb-bandchange-dialog.component';
import { SwapComponent } from './dialogs/swap/swap.component';
import { ApprovalBandChangeDialogComponent } from '../../approval-center/grb/approval-band-change-dialog/approval-band-change-dialog.component';
import { AuditLogsComponent } from './dialogs/audit-logs/audit-logs.component';
import { GrbAuditLogsTabComponent } from './dialogs/grb-audit-logs-tab/grb-audit-logs-tab.component';

@Component({
  selector: 'app-grb',
  templateUrl: './grb.component.html',
  styleUrls: ['./grb.component.scss']
})
export class GrbComponent implements OnInit {
  ELEMENT_DATA: CreateRequestGrb[] = [];
  displayedColumns: string[] = ['metroNo', 'grbNo', 'band', 'totalQty', 'deptCode', 'deptName', 'action'];
  AllColumns: string[] = ['metroNo', 'grbNo', 'band', 'totalQty', 'deptCode', 'deptName', 'action'];

  dataSource = new MatTableDataSource<CreateRequestGrb>();
  enabledNoDataMsg: boolean;
  enableLoadingMsg: boolean;
  showLoader = true;

  constructor(private createRequestGrb: CreateRequestGrbService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.createRequestGrb.getCommonData().subscribe((data: any[]) => {
      this.showLoader = false;
      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      if (this.dataSource.data.length === 0) {
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

  onClickGrbRevise(element) {


    const dialogRef = this.dialog.open(GrbReviseDialogComponent, {
      width: '90vh',
      //height: '79vh',
      disableClose: true,
      data: element

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.getData();
      }

    });
  }

  onClickGrbBandchange(element) {
    const dialogRef = this.dialog.open(GrbBandchangeDialogComponent, {
      width: '90vh',
      //height: '79vh',
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==true)
      {
        this.getData();
      }

    });
  }


  onClickSwap(element: any) {
    const dialogRef = this.dialog.open(SwapComponent, {
      width: '90vh',
     // height: '79vh',
      disableClose: true,
      data: element

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.response == 'SUCCESS') {
        this.getData();
      }
    });


  }
  openAuditLogs(data) {
    const dialogRef = this.dialog.open(GrbAuditLogsTabComponent, {
      width: '1000px',
      // height: '600px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
