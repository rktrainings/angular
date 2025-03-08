import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { GrbArchiveService } from 'src/app/services/grb-archive.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { RoutingPathProperties } from 'src/assets/data/common/routing-path-properties';
import { GrbNumberComponent } from '../dialogs/grb-number/grb-number.component';
import { GrbArchiveAuditDialogComponent } from '../grb-archive-audit-dialog/grb-archive-audit-dialog.component';
import { GrbArchiveDeleteDialogComponent } from '../grb-archive-delete-dialog/grb-archive-delete-dialog.component';

@Component({
  selector: 'app-grb-archive-main',
  templateUrl: './grb-archive-main.component.html',
  styleUrls: ['./grb-archive-main.component.scss']
})
export class GrbArchiveMainComponent implements OnInit {
  displayedColumns: string[] = ['metroNo', 'deptName', 'hireType', 'hiringReason', 'totalQuantity', 'band',
    'requestSubmmitedDate', 'requestSummitedBy', 'review'];
  selectionTypelist: string[] = ['Metro Number', 'GRB Number', 'Dept Code'];
  displayField: boolean = false;
  maxLength: number;
  selectionType: any;
  metroValid: boolean = true;
  enableLoadingMsg: boolean;
  selectionTypeValue: any;
  inputValue: any;
  enabledNoDataMsg: boolean = false;
  dataSource = new MatTableDataSource();
  displayMetro: boolean;
  enableloader: boolean;
  formName: any;
  constructor(private spinner: NgxSpinnerService, private grbArchiveService: GrbArchiveService,
    private dialog: MatDialog,
    private router: Router, private notification: NotificationService, private hiringFormService: HiringFormService, private approvalCenterService: ApprovalCenterService) { }

  ngOnInit() {
    this.formName = 'grbArchive';

  }
  fetchList(item) {
    this.dataSource.data = null;
    this.metroValid = true;
    this.inputValue = null;
    if (item.value == 'Metro Number') {
      this.displayMetro = true;
      this.maxLength = 8;
      // //console.log(this.maxLength);
    }
    else if (item.value == 'GRB Number') {
      this.maxLength = 24;
      this.displayMetro = false;
      ////console.log(this.maxLength);
    }
    else {
      this.displayMetro = false;
      this.maxLength = 3;
    }
    ////console.log(this.maxLength);

    this.displayField = true;
  }

  check() {
    // console.log(this.selectionType);
    if (this.selectionType == 'Metro Number') {
      ////console.log(this.selectionType)
      $('.textcss').on('change, keyup', function () {
        var currentInput = $(this).val();
        var fixedInput = currentInput.toString().replace(/[A-Za-z!@#$%^&*()]/g, '');
        if (fixedInput == "")
          $(this).val('');
        else {
          $(this).val(fixedInput)
        }
      });
      // //console.log(this.metroValid);
      if (this.inputValue.length == 8) {
        ////console.log(this.metroValid);
        this.metroValid = false;
        this.selectionTypeValue = 'metroNo'
        this.fetchGrbData(this.selectionTypeValue, this.inputValue);
      }
      else
        this.metroValid = true;
      ////console.log(this.metroValid);
    }
    else if (this.selectionType == 'GRB Number') {
      // console.log('length:', this.inputValue.length);
      if (this.inputValue.length == 24) {
        this.selectionTypeValue = 'grbNumber';
        // console.log(this.metroValid);
        this.metroValid = false;
        this.fetchGrbData(this.selectionTypeValue, this.inputValue);
      }
      else
        this.metroValid = true;
    }
    else {
      // //console.log(this.selectionType)
      if (this.inputValue.length == 3) {
        ////console.log(this.metroValid);
        this.selectionTypeValue = 'deptCode'
        this.metroValid = false;
        this.fetchGrbData(this.selectionTypeValue, this.inputValue);
      }
      else
        this.metroValid = true;
    }


  }
  openDialog(element) {
    const dialogRef = this.dialog.open(GrbArchiveAuditDialogComponent, {
      width: '1350px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: element.metroNo,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchGrbData(key, value) {
    this.dataSource.data = [];
    this.enableLoadingMsg = true;
    this.enabledNoDataMsg = false;

    this.grbArchiveService.getGrbArchiveDetails<ApprovalCenterDetails[]>(key, value).subscribe((data: ApprovalCenterDetails[]) => {
      // console.log('archive:', data);
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
        });
      }
      this.enableLoadingMsg = false;
      if (data.length === 0) {
        this.enabledNoDataMsg = true;
        this.notification.showSnackBar(CommonMessageProperties.INVALID_INPUT_EMPTY_RESULT);
        this.dataSource.data = data;
      } else if (data[0]['snackbarStatus'] == 'No Access') {
        this.notification.showSnackBar(CommonMessageProperties.NO_ACCESS + key + ' ' + value);
      } else {
        this.dataSource.data = data;
      }
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);
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

  openDeleteMetroDialog(element: any){
    const dialogRef = this.dialog.open(GrbArchiveDeleteDialogComponent, {
      width: '400px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {      
      if(result){        
        if(result['metroNo']){
          this.dataSource.data=this.dataSource.data.filter(e=>e['metroNo']!=result['metroNo']);
        }
      }
      ////////console.log('The dialog was closed');
    });

  }

  disableDelete(element: any){
    let hiringAs:string = element['hiringgaAs'];
    let hireType:string = element['hireType']
    // console.log(hiringAs);
    // console.log(hireType);
    
    if(hiringAs == 'Subk-Extension' || hiringAs == 'Backfill-InternalMovement'
     || hiringAs == 'Conversion-Non Regular Promotion' || 
     hiringAs == 'Conversion-Non Regular Extension' || hireType == 'INTERNAL' ){
      return true;
    }
    return false;    
  }

  fetchGRBInternalDetails(metroNo: string) {

    this.approvalCenterService.getGRBInternalDetails<CompleteGrbTemplateInternal[]>(metroNo).subscribe((data: CompleteGrbTemplateInternal[]) => {
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(data['grbTemplateEnh']);
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      //console.log("data", data['grbTemplateBackfill'], data);

      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=internal');
      this.enableloader = false;
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  fetchGRBExternalDetails(metroNo: string) {

    this.approvalCenterService.getGRBExternalDetails<CompleteGRBTemplateExternal[]>(metroNo).subscribe((data: CompleteGRBTemplateExternal[]) => {

      let obj = data['grbTemplateEnh']
      obj = Object.assign(obj, data['grbTemplateGom'])
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(obj);
      localStorage.setItem('templateData', JSON.stringify(obj))
      localStorage.setItem('backFillData', JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData', JSON.stringify(data['grbTemplateTransfer']))
      //console.log("data", data['grbTemplateBackfill'], obj);

      this.router.navigateByUrl(RoutingPathProperties.APPROVAL_CENTER_HIREFORM_VIEW + '?formName=' + this.formName + '&hireType=external');
      this.enableloader = false;
    }, ((httpError: HttpErrorResponse) => {
      this.openErrorSnackBar();
    }));
  }

  onMetroClick(element: any) {
    this.openMetroDialog(element.metroNo)
  }
  openMetroDialog(metroNumber: any): void {
    const dialogRef = this.dialog.open(GrbNumberComponent, {
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
