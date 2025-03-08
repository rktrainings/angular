import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import ApprovalCenter from '../../../../assets/data/approval-center/approval-center.json';
import SampleFormatDownload from '../../../../assets/data/approval-center/sample-format.json';
import { UploadComponent } from '../dialogs/upload/upload.component';
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
  selector: 'app-bizops',
  templateUrl: './bizops.component.html',
  styleUrls: ['./bizops.component.scss']
})
export class BizopsComponent implements OnInit {

  displayedColumns: string[] = ['metroNo', 'deptName', 'hireType', 'hiringReason', 'totalQuantity', 'band', 'requestSubmmitedDate', 'requestSummitedBy', 'review'];

  fileToUpload: File = null;
  percentDone: number;
  uploadSuccess: boolean;
  sampleJSON = [];
  sampleFormatDownload = [];
  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  enabledNoDataMsg: boolean = false;
  bizopsDataSource: any = [];
  enableLoadingMsg: boolean = true;
  formName: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  count: number = 0;

  constructor(private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog,
    private router: Router,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) {

  }

  ngOnInit() {
    localStorage.removeItem('empStatus')
    this.formName = 'bizops';
    this.fetchBizopsDetails();
    this.sampleFormatDownload = SampleFormatDownload;
    this.getBizopsDetails();
  }
  getBizopsDetails() {
    this.approvalCenterService.bizops$.subscribe(data => {
      // let invoked = this.approvalCenterService.getBizopsInvoked();
      let invoked = false;
      if (invoked) {
        this.enableLoadingMsg = false;
        if (this.dataSource.data.length === 0) {
          this.enabledNoDataMsg = true;
        }
      } else {
        this.enableLoadingMsg = true;
      }

      this.bizopsDataSource = data;
      this.dataSource.data = data;
      if (this.dataSource.data.length === 0) {
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;

      }
      this.count = this.dataSource.data.length

    })
  }
  onClickUpload() {
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '400px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.count = this.dataSource.filteredData.length
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
  }

  fetchBizopsDetails() {
    this.enableLoadingMsg = true;
    this.approvalCenterService.getBizopsDetails<ApprovalCenterDetails[]>().subscribe((data: ApprovalCenterDetails[]) => {
      if (data)
        if (data.length > 0) {
          data.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
      this.approvalCenterService.setBizopsDetails(data);
      ////console.log(data);
      this.enableLoadingMsg = false;

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  onActionClick(element: any) {
    // GRB Template
    localStorage.setItem('empStatus', JSON.stringify(true))

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
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=internal');
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
      localStorage.setItem('templateData', JSON.stringify(obj))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      ////console.log("data", data['grbTemplateBackfill'], obj);

      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=external');
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
