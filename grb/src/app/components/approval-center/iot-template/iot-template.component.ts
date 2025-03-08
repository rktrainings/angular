import { Component, OnInit, Input } from '@angular/core';
import ApprovalCenter from '../../../../assets/data/approval-center/approval-center.json'
import { MatTableDataSource, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { Router } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-iot-template',
  templateUrl: './iot-template.component.html',
  styleUrls: ['./iot-template.component.scss']
})
export class IotTemplateComponent implements OnInit {

  displayedColumns: string[] = ['metroNo', 'deptName', 'hireType', 'hiringReason', 'totalQuantity', 'band', 'requestSubmmitedDate', 'requestSummitedBy', 'review'];

  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  enabledNoDataMsg: boolean = false;
  formName: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;

  @Input() storageAGData: any[];
  @Input() storageEMEAData: any[];
  @Input() storageAPACData: any[];
  @Input() storageINTERNALData: any[];
  @Input() activeTab: any;

  constructor(public dialog: MatDialog,
    private approvalCenterService: ApprovalCenterService,
    private router: Router,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) {
  }

  ngOnInit() {
    this.hiringFormService.nullifyTemplateData();

    this.formName = 'iot';
    switch (this.activeTab) {
      case 'AG':
        this.dataSource.data = this.storageAGData;
        break;
      case 'EU':
        this.dataSource.data = this.storageEMEAData;
        break;
      case 'APAC':
        this.dataSource.data = this.storageAPACData;
        break;
      case 'INTERNAL':
        this.dataSource.data = this.storageINTERNALData;
        break;
    }

    this.enabledNoDataMsg = this.dataSource.data.length === 0 ? true : false;
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

  onActionClick(element: any) {
    // GRB Template
    this.spinner.show();
    this.hiringFormService.setHiringAs(element.hiringgaAs);
    switch (element.hireType) {
      case 'INTERNAL':
        this.fetchGRBInternalDetails(element.metroNo);
        break;
      case 'EXTERNAL':
        this.fetchGRBExternalDetails(element.metroNo);
        break;
    }

  }

  fetchGRBInternalDetails(metroNo: string) {
    this.approvalCenterService.getGRBInternalDetails<CompleteGrbTemplateInternal[]>(metroNo).subscribe((data: CompleteGrbTemplateInternal[]) => {
      this.spinner.hide();
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(data['grbTemplateEnh']);
      localStorage.setItem('templateData',JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData',JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData',JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&activeTab=' + this.activeTab + '&hireType=internal');
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  fetchGRBExternalDetails(metroNo: string) {
    this.approvalCenterService.getGRBExternalDetails<CompleteGRBTemplateExternal[]>(metroNo).subscribe((data: CompleteGRBTemplateExternal[]) => {
      this.spinner.hide();
      let obj = data['grbTemplateEnh']
      obj = Object.assign(obj, data['grbTemplateGom'])
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(obj);
      localStorage.setItem('templateData',JSON.stringify(obj))
      localStorage.setItem('backFillData',JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData',JSON.stringify(data['grbTemplateTransfer']))
      localStorage.getItem('backFillData')
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&activeTab=' + this.activeTab + '&hireType=external');
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
