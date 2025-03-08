import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatSnackBar } from '@angular/material';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { Router } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import SwapData from '../../../../../assets/data/approval-center/swap-data.json';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { AuditLogComponent } from '../../dialogs/audit-log/audit-log.component';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { SwapAuditComponent } from 'src/app/components/my-request/audit-dialogs/swap-audit/swap-audit.component';
import { SwapAuditDialogComponent } from '../../dialogs/swap-audit-dialog/swap-audit-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-swap-template',
  templateUrl: './swap-template.component.html',
  styleUrls: ['./swap-template.component.scss']
})
export class SwapTemplateComponent implements OnInit {

  displayedColumns: string[] = ['metroNumber', 'grbNumber', 'metroDeptName', 'metroband', 'nominatedEmpId', 'nominatedEmpName', 'empDeptName',
    'empBand', 'createdDate', 'createdBy', 'grbStatus', 'action','auditLogs'];
  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  enabledNoDataMsg: boolean = false;
  formName: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  @Input() swapRequestData: any[];
  enableLoadingMsg: boolean;
  tollName: string;
  backFillData: any;
  swapGRBNumber: any;
  count: number;

  constructor(public dialog: MatDialog,
    private approvalCenterService: ApprovalCenterService,
    private router: Router,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) {
  }

  ngOnInit() {
    // this.JSON_Data = SwapData;
    // this.dataSource.data = this.JSON_Data;
    this.fetchSwapDetails();

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
    this.count=this.dataSource.filteredData.length;
  }

  openSwapAuditDialog(element): void {
    this.swapGRBNumber = element.grbNumber;
    // this.fetchSwapAuditDetails(element.grbNumber);

    const dialogRef = this.dialog.open(SwapAuditDialogComponent, {
      width: '1350px',
      // height: '500px',
      data: element.grbNumber,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  fetchSwapDetails() {
    this.enableLoadingMsg = true;
    this.approvalCenterService.getSwapDetails().subscribe((data: any[]) => {
      // this.boardDataSource = data;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['createdDate']).getTime() - new Date(a['createdDate']).getTime();
        });
      }
      this.enableLoadingMsg = false;

      this.dataSource.data = data;
      // if (this.dataSource.data !== null) {
      //   this.enableLoadingMsg = false;
      // }
      if (this.dataSource.data.length === 0) {
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;
      }
      this.count=this.dataSource.data.length;

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));

  }

  onAcceptClick(element: any) {
    // GRB Template
    let type = 'EXTERNAL';
    this.fetchSwapEmployee(element);
  }

  fetchSwapEmployee(element: any) {
    this.swapGRBNumber = element.grbNumber;
    this.enableLoadingMsg = true;

    this.approvalCenterService.getSwapEmployee(element.nominatedEmpId).subscribe((data: any[]) => {
      // this.boardDataSource = data;
      this.enableLoadingMsg = false;

      this.backFillData = data;
      this.backFillData['hiringAs'] = 'Swap';
      this.hiringFormService.setHiringAs('Swap');
      localStorage.setItem('backFillData', JSON.stringify([this.backFillData]));
      this.hiringFormService.setBackFillData([this.backFillData]);
      this.router.navigateByUrl('/create-request/hiresubmit?hireType=external&requestType=swap&swapGRBNumber=' + this.swapGRBNumber);

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));

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
