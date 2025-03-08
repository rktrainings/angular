import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog, MatSnackBar } from '@angular/material';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { Router } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { AuditLogComponent } from '../../dialogs/audit-log/audit-log.component';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import SwapData from '../../../../../assets/data/approval-center/swap-data.json';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApproveGrbDialogComponent } from '../approve-grb-dialog/approve-grb-dialog.component';
import { ApprovalCenterGrb } from 'src/app/tsclasses/approval-center-grb';
import { ApprovalCenterGrbService } from 'src/app/services/approval-center-grb.service';
import { ApprovalBandChangeDialogComponent } from '../approval-band-change-dialog/approval-band-change-dialog.component';
import { BandChangeAuditLogComponent } from '../band-change-audit-log/band-change-audit-log.component';
import { SwapAuditDialogComponent } from '../../dialogs/swap-audit-dialog/swap-audit-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-approval-grb',
  templateUrl: './approval-grb.component.html',
  styleUrls: ['./approval-grb.component.scss']
})
export class ApprovalGrbComponent implements OnInit {

  displayedColumns: string[] = ['metroNum', 'grbNum', 'band', 'reqBand', 'deptCode', 'deptName', 'requestedBy', 'requestedDate', 'newMetroNum', 'modifyType', 'action', 'auditLogs'];
  // displayedColumns: string[] = ['metroNum', 'grbNum', 'newMetroNum', 'band', 'deptCode', 'deptName', 'requestedBy', 'requestedDate', 'modifyType', 'action','auditLogs'];

  dataSource = new MatTableDataSource<ApprovalCenterGrb>();
  enabledNoDataMsg: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 7;

  showLoader = true;
  internalDetails: any;
  pendingGrbStatus: boolean;
  @Input() swapRequestData: any[];
  formName: string;
  count: number;

  constructor(public dialog: MatDialog,
    private approvalCenterGrbService: ApprovalCenterGrbService,
    private router: Router,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private approvalCenterService: ApprovalCenterService,
    private notification: NotificationService) {
  }

  ngOnInit() {

    this.getData();
  }

  getData() {
    this.pendingGrbStatus = false;
    this.spinner.show();
    this.approvalCenterGrbService.getGrbList().subscribe((data: any[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['requestedDate']).getTime() - new Date(a['requestedDate']).getTime();
        });
      }
      this.showLoader = false;
      this.spinner.hide();

      this.dataSource.data = data;
      this.pendingGrbStatus = true;
      this.count=this.dataSource.data.length;
      if (this.dataSource.data.length === 0) {


        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;
      }


    });

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

  openAuditDialog(element): void {
    if (element.modifyType == 'GRB Revise') {
      const dialogRef = this.dialog.open(AuditLogComponent, {
        width: '1370px',
        // height: '500px',

        data: element.grbNumber,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
    if (element.modifyType == 'Band Change') {
      const dialogRef = this.dialog.open(BandChangeAuditLogComponent, {
        width: '1350px',
        //height: '500px',

        data: element.grbNumber,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
    if (element.modifyType == 'Swap') {
      const dialogRef = this.dialog.open(SwapAuditDialogComponent, {
        width: '1350px',
        // height: '500px',

        data: element.grbNumber,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
      });
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





  onClickReview(element) {
    let modifyType;
    modifyType = element.modifyType.toUpperCase();

    if (modifyType == 'GRB REVISE') {
      this.spinner.show();
      this.approvalCenterGrbService.getEmpDetails(element.grbNumber).subscribe((data: any) => {
        this.spinner.hide();
        const dialogRef = this.dialog.open(ApproveGrbDialogComponent, {
          width: '650px',
          // height: '650px',
          data: { 'grbDetails': element, 'internalDetails': data },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result == true) {
            this.getData();
          }

        });
      });
    } else if (modifyType == 'BAND CHANGE') {
      const dialogRef = this.dialog.open(ApprovalBandChangeDialogComponent, {
        width: '650px',
        // height: '650px',
        disableClose: true,
        data: element
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.getData();
        }

      });
    } else if (modifyType === 'SWAP') {
      this.spinner.show();
      this.formName = element.modifyType.toLowerCase();
      this.routeToGRBTemplate(element);
    }

  }

  routeToGRBTemplate(element: any) {
    this.fetchGRBExternalDetails(element);
  }

  fetchGRBExternalDetails(element: any) {
    this.spinner.show();
    this.approvalCenterService.getGRBExternalDetails<CompleteGRBTemplateExternal[]>(element.newMetroNumber).subscribe((data: CompleteGRBTemplateExternal[]) => {
      this.spinner.hide();
      
      let obj = data['grbTemplateEnh']
      obj = Object.assign(obj, data['grbTemplateGom'])
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(obj);
      localStorage.setItem('templateData', JSON.stringify(obj))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=external' + '&oldMetroNumber=' + element.metroNumber + '&grbNumber=' + element.grbNumber);
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

}

