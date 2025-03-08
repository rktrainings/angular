import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import ApprovalCenter from '../../../../assets/data/approval-center/approval-center.json'
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import SampleFormatDownload from '../../../../assets/data/approval-center/sample-format.json'
import { UploadComponent } from '../dialogs/upload/upload.component';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { Router } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { UploadForBoardComponent } from '../upload-for-board/upload-for-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  displayedColumns: string[] = ['metroNo', 'deptName', 'deptCode', 'hiringReason', 'totalQuantity', 'band', 'requestSubmmitedDate', 'requestSummitedBy', 'review'];
  fileToUpload: File = null;
  percentDone: number;
  uploadSuccess: boolean;
  sampleJSON = [];
  sampleFormatDownload = [];
  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  enabledNoDataMsg: boolean = false;
  boardDataSource: any = [];
  enableLoadingMsg: boolean = false;
  formName: string;
  role: string = 'board';
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  count: number;

  constructor(private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog,
    private router: Router,
    private hiringFormService: HiringFormService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) {
  }

  ngOnInit() {
    localStorage.removeItem('maxTotalQty')
    localStorage.removeItem('empStatus')
    this.hiringFormService.nullifyTemplateData();
    this.formName = 'board';
    this.fetchBoardDetails();
    this.sampleFormatDownload = SampleFormatDownload;
    this.getBoardDetails();
  }
  getBoardDetails() {
    this.approvalCenterService.board$.subscribe(data => {
      // let invoked = this.approvalCenterService.getBoardInvoked();
      let invoked = false;
      if (invoked) {
        this.enableLoadingMsg = false;
      } else {
        this.enableLoadingMsg = true;
      }

      this.boardDataSource = data;
      this.dataSource.data = data;
      if (data.length == 0) {
        this.enabledNoDataMsg = true
      } else {
        this.enabledNoDataMsg = false
      }
      this.count = this.dataSource.data.length

    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
    this.count = this.dataSource.filteredData.length
  }

  onClickUpload() {
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    const dialogRef = this.dialog.open(UploadForBoardComponent, {
      width: '400px',
      data: this.role,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  fetchBoardDetails() {
    this.enableLoadingMsg = true;
    this.approvalCenterService.getBoardDetails<ApprovalCenterDetails[]>().subscribe((data: ApprovalCenterDetails[]) => {
      if (data)
        if (data.length > 0) {
          data.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
      this.approvalCenterService.setBoardDetails(data)
      this.enableLoadingMsg = false;

      // if (this.dataSource.data !== null) {
      //   this.enableLoadingMsg = false;
      // }
      // if (this.dataSource.data.length === 0) {
      //   this.enabledNoDataMsg = true;
      // }

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));

  }

  onActionClick(element: any) {
    localStorage.setItem('empStatus', JSON.stringify(true))

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
