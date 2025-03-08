import { Component, OnInit, Input } from '@angular/core';
import ApprovalCenter from '../../../../../assets/data/approval-center/approval-center.json'
import { MatTableDataSource, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { ApprovalCenterTolls } from 'src/app/tsclasses/approval-center-tolls';
import { Router } from '@angular/router';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-toll-template',
  templateUrl: './toll-template.component.html',
  styleUrls: ['./toll-template.component.scss']
})
export class TollTemplateComponent implements OnInit {

  displayedColumns: string[] = ['metroNumber', 'deptName', 'hireType', 'hireRequest', 'totalQuantity', 'band', 'submittedDate', 'requesterName', 'tollStatus', 'commentsFromHiringManager', 'review'];
  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterTolls>();
  //dataSource = new MatTableDataSource<any>();
  hireType: string;
  enabledNoDataMsg: boolean = false;
  formName: string;
  tollName: string;
  isCCEnabled: string;
  isBMEnabled: string;
  isUTEEnabled: string;
  isORPEnabled: string;

  @Input() dataSourceBM: any[];
  @Input() dataSourceCC: any[];
  @Input() dataSourceORP: any[];
  @Input() dataSourceUTE: any[];

  @Input() enabledBM: any;
  @Input() enabledCC: any;
  @Input() enabledORP: any;
  @Input() enabledUTE: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  count: number;


  constructor(private router: Router,
    private approvalCenterService: ApprovalCenterService,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) { }

  ngOnInit() {
    this.formName = 'tolls';
    if (this.enabledBM) {
      this.tollName = 'BM';
      this.dataSource.data = this.dataSourceBM;
    } else if (this.enabledCC) {
      this.tollName = 'CC';
      this.dataSource.data = this.dataSourceCC;
    } else if (this.enabledORP) {
      this.tollName = 'ORP';
      this.dataSource.data = this.dataSourceORP;
    } else if (this.enabledUTE) {
      this.tollName = 'UTE';
      this.dataSource.data = this.dataSourceUTE;
    }
    this.count=this.dataSource.data.length

    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }

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
    this.count=this.dataSource.filteredData.length
  }


  // this.hiringForm.setOrpData([]);

  //    this.hiringForm.setBackFillData(data);
  //  this.hiringFormService.setTemplateData(this.hiringForm.value)


  onActionClick(element: any) {
    // GRB Template
    this.hiringFormService.setHiringAs(element.hireRequest);
    switch (element.hireType) {
      case 'INTERNAL':
        this.fetchGRBInternalDetails(element.metroNumber);
        break;
      case 'EXTERNAL':
        this.fetchGRBExternalDetails(element.metroNumber);
        break;
    }

  }

  fetchGRBInternalDetails(metroNo: string) {
    this.spinner.show();
    this.approvalCenterService.getGRBInternalDetails<CompleteGrbTemplateInternal[]>(metroNo).subscribe((data: CompleteGrbTemplateInternal[]) => {
      this.spinner.hide();

      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(data['grbTemplateEnh']);
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&tollName=' + this.tollName + '&hireType=internal');

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
      this.spinner.hide();

    }));

  }

  fetchGRBExternalDetails(metroNo: string) {
    this.spinner.show();

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

      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&tollName=' + this.tollName + '&hireType=external');
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
      this.spinner.hide();

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
