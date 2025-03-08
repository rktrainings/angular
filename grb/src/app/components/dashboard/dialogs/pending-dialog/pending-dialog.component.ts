import { Component, OnInit, Inject, ViewChild, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommentsDialogComponent } from '../comments-dialog/comments-dialog.component';
import HiringStatusJSON from "../../../../../assets/data/dashboard/hiring-status.json";
import MetroDataJSON from "../../../../../assets/data/dashboard/metro-data.json";
import { DashboardProperties } from "../../../../../assets/data/dashboard/dashboard-properties";
import { DashboardService } from 'src/app/services/dashboard.service';
import { HiringStatus } from 'src/app/tsclasses/hiring-status.model';
import { TollInfo } from 'src/app/tsclasses/toll-info.model';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';
import { OnBoardedEmployee } from 'src/app/tsclasses/onboarded-employee.model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CompleteGRBTemplateExternal } from 'src/app/tsclasses/complete-grb-template-external';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { CompleteGrbTemplateInternal } from 'src/app/tsclasses/complete-grb-template-Internal';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { Router } from '@angular/router';
import { ConvertToInternalComponent } from '../convert-to-internal/convert-to-internal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pending-dialog',
  templateUrl: './pending-dialog.component.html',
  styleUrls: ['./pending-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PendingDialogComponent implements OnInit {

  hiddenFlag: boolean = true;
  ELEMENT_DATA = [];
  //dataSource: any = [];
  name: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  metroFields = [];
  metroFieldLabels: any;
  isApprovedRequest: boolean = true;
  displayedColumns: string[] = ['grbNumber', 'reqId', 'reqStatus', 'icon'];
  hiringDisplayedColumns: string[] = ['GRB', 'ReqID', 'Status', 'Icon'];
  allMetroFields: any;
  bizOpsStatus: string;
  metroDetails: any;
  ute_STATUS: boolean = false;
  orp_STATUS: boolean = false;
  costcase_STATUS: boolean = false;
  bandmix_STATUS: boolean = false;
  uteEnabledMoreInfo: boolean = false;
  oprEnabledMoreInfo: boolean = false;
  ccEnabledMoreInfo: boolean = false;
  bmEnabledMoreInfo: boolean = false;
  bmEnabledResubmit: boolean = false;
  ccEnabledResubmit: boolean = false;
  oprEnabledResubmit: boolean = false;
  uteEnabledResubmit: boolean = false;

  dataSource = new MatTableDataSource<HiringStatus>();
  expandedElement: RequestDashboard | null;
  onBoardEmployee = [];
  onBoarEmployeeLabels = ['cNum', 'FirstName', 'LastName', 'DOJ'];
  enabledNoDataMsg: boolean = false;
  tollNames = ['CC', 'BM', 'UTE', 'ORP', 'SOC'];
  // allTolls = ['costcase','bandmix','ute','orp','soc'];
  tollDetails = [
    {
      "toll": "costcase",
      "iconName": "assignment"
    },
    {
      "toll": "bandmix",
      "iconName": "description"
    },
    {
      "toll": "ute",
      "iconName": "announcement"
    },
    {
      "toll": "orp",
      "iconName": "assessment"
    },
    {
      "toll": "soc",
      "iconName": "assignment_late"
    }

  ]
  enabledReSubmit: boolean = false;
  showInternalConversionButton: boolean = false;

  constructor(public dialogRef: MatDialogRef<PendingDialogComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private dashboardService: DashboardService,
    private approvalCenterService: ApprovalCenterService,
    private hiringFormService: HiringFormService, private spinner: NgxSpinnerService) {
    this.metroDetails = data.metroDetails;
    this.isApprovedRequest = data.isApprovedRequest;
  }

  ngOnInit(): void {
    // converting json object to array
    localStorage.removeItem('maxTotalQty')
    localStorage.removeItem('empStatus')
    this.allMetroFields = Object.entries(this.metroDetails).map(([key, value]) => { return { 'name': key, 'value': value } });
    this.metroDataFormation();
    this.checkBizOpsStatus();
    this.tollIconsColorStatus();

    this.showInternalConversion(this.metroDetails);
    
  }

  showInternalConversion(data) {
    if (data.hireType.toLowerCase() == 'external'){
      if(data.hiringAs.toLowerCase().includes('subk') || data.hiringAs.toLowerCase().includes('conversion')){
        this.showInternalConversionButton = false;
      }else{
       this.showInternalConversionButton = true;
      }
    }
     
  }

  // To find the toll icon color status ("REVIEWED == GREEN" , "NOT_REVIEWED == RED",  "MORE_INFORMATION == ORANGE")  
  tollIconsColorStatus() {
    this.allMetroFields.filter((toll => {

      //      if (!this.bmEnabledResubmit) {
      if (toll.name === 'bandmix_STATUS')
        if (toll.name === 'bandmix_STATUS' && toll.value === 'REVIEWED') {
          this.bandmix_STATUS = true;
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'MORE_INFORMATION') {
          this.bmEnabledMoreInfo = true;
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      //      }
      //      if (!this.ccEnabledResubmit) {
      if (toll.name === 'costcase_STATUS')
        if (toll.name === 'costcase_STATUS' && toll.value === 'REVIEWED') {
          this.costcase_STATUS = true;
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'MORE_INFORMATION') {
          //////console.log(toll)
          this.ccEnabledMoreInfo = true;
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      //      }
      //      if (!this.oprEnabledResubmit) {
      if (toll.name === 'orp_STATUS')
        if (toll.name === 'orp_STATUS' && toll.value === 'REVIEWED') {
          this.orp_STATUS = true;
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'MORE_INFORMATION') {
          this.oprEnabledMoreInfo = true;
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      //      }
      //      if (!this.uteEnabledResubmit) {
      if (toll.name === 'ute_STATUS')
        if (toll.name === 'ute_STATUS' && toll.value === 'REVIEWED') {
          this.ute_STATUS = true;
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'MORE_INFORMATION') {
          this.uteEnabledMoreInfo = true;
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'RESUBMIT') {
          this.uteEnabledMoreInfo = true;
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      //      }

    }));

  }

  hideModifyButtons: boolean = false;
  checkBizOpsStatus() {
    this.allMetroFields.filter((res => {
      if (res.name === 'bizopsStatus') {
        this.bizOpsStatus = res.value;
      }
    }));

    if (this.bizOpsStatus !== null) {
      if (this.bizOpsStatus.toLowerCase() === 'approved') {
        this.hideModifyButtons = true;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  metroDataFormation() {

    this.metroFieldLabels = ['Metro Number', 'Band', 'Total Quantity', 'Dept Name', 'Hiring As'];
    const viewFields = ['metroNumber', 'band', 'totalQunatity', 'deptName', 'hiringAs']

    // filter actual api response data to metro dialog view response. 
    this.allMetroFields.filter((response => {
      viewFields.filter((field => {
        if (field === response.name) {
          this.metroFields.push(response);
        }
      }))
    }));
  }

  applyCommentsDialog(element: any) {
    //    if (!this.enabledReSubmit) {
    switch (element) {
      case "ute": {
        if (!this.uteEnabledResubmit) {
          if (this.ute_STATUS) {
            this.fetchApprovalComments(element);
          } else if (this.uteEnabledMoreInfo) {
            this.fetchMoreInfoForToll(element);
          }
        }
        break;
      }
      case "orp": {
        if (!this.oprEnabledResubmit) {
          if (this.orp_STATUS) {
            this.fetchApprovalComments(element);
          } else if (this.oprEnabledMoreInfo) {
            this.fetchMoreInfoForToll(element);
          }
        }
        break;
      }
      case "costcase": {
        if (!this.ccEnabledResubmit) {
          if (this.costcase_STATUS) {
            this.fetchApprovalComments(element);
          } else if (this.ccEnabledMoreInfo) {
            this.fetchMoreInfoForToll(element);
          }
        }
        break;
      }
      case "bandmix": {
        if (!this.bmEnabledResubmit) {
          if (this.bandmix_STATUS) {
            this.fetchApprovalComments(element);
          } else if (this.bmEnabledMoreInfo) {
            this.fetchMoreInfoForToll(element);
          }
        }
        break;
      }
    }

    //    }
  }

  fetchMoreInfoForToll(toll: any) {
    let color = 'Orange';
    this.dashboardService.getMoreInfoForToll<TollInfo[]>(toll, this.metroDetails.metroNumber).subscribe((data: TollInfo[]) => {
      this.openCommentsDialog(toll, data, color);
    });
  }

  fetchApprovalComments(toll: any) {
    let color = 'Green';
    this.dashboardService.getApprovalComments<TollInfo[]>(toll, this.metroDetails.metroNumber).subscribe((data: TollInfo[]) => {
      this.openCommentsDialog(toll, data, color);
    });
  }


  openCommentsDialog(toll: any, responseData: any, color: any): void {
    const dialogRef = this.dialog.open(CommentsDialogComponent, {
      disableClose: true,
      width: '70vh',
      data: {
        "toll": toll,
        "responseData": responseData,
        "color": color,
        "metroFields": this.metroFields
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('Pending dialog closed', result);
      //this.dialogValue = result.data;
      //////////console.log('result.data', result.data);
      //////////console.log('result.toll', result.toll);
      //////////console.log('result.metro', result.metro);
      // comments: "sss"
      // metro: "98766789"
      // toll: "costcase"

      if (result.data == 'SUCCESS') {
        this.reSubmitStatus(result.toll);
      }
    });
  }



  reSubmitStatus(toll: any) {
    //////////console.log('reSubmitStatus', toll);
    this.enabledReSubmit = true;

    switch (toll) {
      case 'bandmix':
        this.bmEnabledResubmit = true;
        break;
      case 'costcase':
        this.ccEnabledResubmit = true;
        break;
      case 'orp':
        this.oprEnabledResubmit = true;
        break;
      case 'ute':
        this.uteEnabledResubmit = true;
        break;
    }
    document.getElementById(toll).style.color = DashboardProperties.Toll_COLOR_PURPLE;
  }




  onCancelClick(): void {
    // this.dialogRef.close();
    this.openConfirmationDialog();

    // On click of cancel Grb request is closed.
  }

  openConfirmationDialog(): void {
    let element = this.metroDetails;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '400px',
      data: {metroNumber:element.metroNumber}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // onModifyClick() {
  //   // On click of modify button ==> GRB Template should open
  // }


  onModifyClick() {
    // GRB Template
    //////////console.log("modify")
    //////////console.log(this.metroDetails)
    localStorage.setItem('empStatus', JSON.stringify(true))
    let element = this.metroDetails;
    //////////console.log('onActionClick', element);
    switch (element.hireType) {
      case 'INTERNAL':
        this.fetchGRBInternalDetails(element.metroNumber);
        break;
      case 'EXTERNAL':
        this.fetchGRBExternalDetails(element.metroNumber);
        break;
    }
    this.dialogRef.close();
  }

  fetchGRBInternalDetails(metroNo: string) {
    this.spinner.show()
    this.approvalCenterService.getGRBInternalDetails<CompleteGrbTemplateInternal[]>(metroNo).subscribe((data: CompleteGrbTemplateInternal[]) => {
      //////////console.log('iot-bizops-internal-data:', data);
      this.spinner.hide()

      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(data['grbTemplateEnh']);
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData',JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData',JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl('/dashboard/hireFormView?formName=' + 'edit-metro' + '&hireType=internal');
    });
  }

  fetchGRBExternalDetails(metroNo: string) {
    this.spinner.show()

    this.approvalCenterService.getGRBExternalDetails<CompleteGRBTemplateExternal[]>(metroNo).subscribe((data: CompleteGRBTemplateExternal[]) => {
      //////////console.log('iot-bizops-external-data:', data);
      this.spinner.hide()

      let obj = data['grbTemplateEnh']
      obj = Object.assign(obj, data['grbTemplateGom'])
      this.hiringFormService.setOrpData(data['grbTemplateTransfer']);
      this.hiringFormService.setBackFillData(data['grbTemplateBackfill']);
      this.hiringFormService.setTemplateData(obj);
      localStorage.setItem('templateData', JSON.stringify(data['grbTemplateEnh']))
      localStorage.setItem('backFillData',JSON.stringify(data['grbTemplateBackfill']))
      localStorage.setItem('orpData',JSON.stringify(data['grbTemplateTransfer']))
      this.router.navigateByUrl('/dashboard/hireFormView?formName=' + 'edit-metro' + '&hireType=external');
    });
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  //  Filter Function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPlusClick(element) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.dashboardService.getOnBoardedEmployee<OnBoardedEmployee[]>(element.reqStatus, element.reqId).subscribe((data: OnBoardedEmployee[]) => {
      if (data.length > 0) {
        data.filter((res => {
          this.onBoardEmployee.push({
            "cNum": res.cNum,
            "firstName": res.firstName,
            "lastName": res.lastName,
            "doj": res.doj
          }
          );
        }))
      } else {
        this.enabledNoDataMsg = true;
      }

    });

  }

  getFocalInfo(toll: any): string {
    switch (toll) {
      case 'costcase': {
        return 'Focal : Lakshmi V Narayan \n Email : lakshmi.narayan@in.ibm.com';
        break;
      }
      case 'bandmix': {
        return 'Focal : Darrel Ritesh Shaw \n Email : Darrel.Shaw@in.ibm.com';
        break;
      }
      case 'ute': {
        return 'Focal : Vijayalakshmi Kansal \n Email : viji.kansal@in.ibm.com';
        break;
      }
      case 'orp': {
        return 'Focal : Ashish Kr Bharti \n Email : ashish.bharti@in.ibm.com';
        break;
      }
      case 'soc': {
        return 'NO DATA AVAILABLE';
        break;
      }
    }
  }

  convertToInternal() {
    const dialogRef = this.dialog.open(ConvertToInternalComponent, {
      disableClose: true,
      width: '100vh',
      data: this.metroDetails
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
