import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { GrbTemplateBackfill } from 'src/app/tsclasses/grb-template-backfill';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { UploadComponent } from '../dialogs/upload/upload.component';

@Component({
  selector: 'app-early-attrition',
  templateUrl: './early-attrition.component.html',
  styleUrls: ['./early-attrition.component.scss']
})
export class EarlyAttritionComponent implements OnInit {
  displayedColumns: string[] = ['metroNo', 'deptName', 'hireType', 'hiringReason', 'totalQuantity', 'band',
    'requestSubmmitedDate', 'requestSummitedBy', 'review'];

  fileToUpload: File = null;
  percentDone: number;
  uploadSuccess: boolean;
  sampleJSON = [];
  sampleFormatDownload = [];
  JSON_Data = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  enabledNoDataMsg: boolean = false;
  aodDataSource: any = [];
  enableLoadingMsg: boolean = true;
  formName: string;
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
    setTimeout(() => {
      this.formName = 'aod';
      this.fetchAodDetails();
      this.sampleFormatDownload = this.sampleFormatDownload;
      this.getAodDetails();
    }, 0);
    this.nullifyTemplateData();
  }
    nullifyTemplateData() {
      this.hiringFormService.nullifyTemplateData();
    
    
  }
  getAodDetails() {
    this.approvalCenterService.aod$.subscribe(data => {
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

      this.aodDataSource = data;
      this.dataSource.data = data;
      if (this.dataSource.data.length === 0) {
        this.enabledNoDataMsg = true;
      } else {
        this.enabledNoDataMsg = false;

      }
     this.count=this.dataSource.data.length 
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
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
    this.count=this.dataSource.filteredData.length 
  }

  fetchAodDetails() {
    this.enableLoadingMsg = true;
    this.approvalCenterService.getAodDetails<ApprovalCenterDetails[]>().subscribe((data: ApprovalCenterDetails[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
        });
      }
      this.approvalCenterService.setAodDetails(data);
      ////console.log(data);
      this.enableLoadingMsg = false;

    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
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
      ////console.log(data);
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
     
      this.hiringFormService.setTemplateData(data['grbTemplateEnh']);
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))

      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      this.fetchBackfillEmp(metroNo);
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  fetchBackfillEmp(metroNo: string) {
    this.spinner.show();
    this.approvalCenterService.getBackfillEmp(metroNo).subscribe((data: GrbTemplateBackfill[]) => {
      this.spinner.hide();
      //console.log(data);
      
      this.hiringFormService.setBackFillData(data);
      localStorage.setItem('backFillData', JSON.stringify(data))
     
      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=external');
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }
  fetchGRBExternalDetails(metroNo: string) {
    this.approvalCenterService.getGRBExternalDetails<CompleteGRBTemplateExternal[]>(metroNo).subscribe((data: CompleteGRBTemplateExternal[]) => {
      this.fetchBackfillEmp(metroNo);
      //this.spinner.hide();
      let obj = data['grbTemplateEnh']
      obj = Object.assign(obj, data['grbTemplateGom'])
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      
      this.hiringFormService.setTemplateData(obj);
      localStorage.setItem('templateData', JSON.stringify(obj))
    
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      ////console.log("data", data['grbTemplateBackfill'], obj);
     
      //this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=external');
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
