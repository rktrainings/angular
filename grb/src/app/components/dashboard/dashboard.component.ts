import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatPaginator, MatTabChangeEvent, mixinColor } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';

import CurrentCCBandJSONSample from "../../../assets/data/dashboard/costcase-calc.json";
import { CurrentCostcase } from "src/app/models/CurrentCostcase";
import { costcasecal } from 'src/app/models/costcasecal';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';
import { ActivatedRoute } from '@angular/router';
import { CiDashboard } from 'src/app/tsclasses/ci-dashboard';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('2ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DashboardComponent implements OnInit {

  step = 0;
  name: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ELEMENT_DATA = [];
  AELEMENT_DATA: any;
  ccDataSource: any = [];
  pendingRequest: any;
  columnsToDisplay = ['deptCode', 'deptname', 'sdl', 'geo', 'iot'];
  columnsToDisplay2 = ['description', 'band3', 'band4', 'band5', 'band6', 'band7', 'band8', 'band9', 'band10', 'total'];
  pendingDataSource: any = [];
  approvedDataSources: any = [];
  ciDataSources: any = [];
  enabledCCView: any;
  enabledPending: any;
  enabledApproved: any;
  enabledCi: any;
  pendingRequestStatus: boolean = false;
  approvedRequestStatus: boolean = false;
  costCaseRequestStatus: boolean = false;
  ciRequestStatus: boolean = false;
  showLoader: boolean = true;
  showLoaderCC: boolean;
  enableLoadingMsg: boolean = false;
  enabledNoDataMsg = false;
  tabIndex: any = 0;
  pendingDataCount: number;
  approvedDataCount: number;
  ccviewDataCount: number;
  ciDataCount: number;
  storageCCViewData = [];
  storagePendingData = [];
  storageApprovedData = [];
  storageCiData = [];
  pendingCount: string;
  approvedCount: string;
  ccviewCount: string;
  ciCount: string;
  roles = [];
  showCi: boolean = false;
  isCISPOC: boolean = false;
  constructor(public dialog: MatDialog,
    private dashboardService: DashboardService,
    private userDetails: UserDetailsService,
    private activatedRoute: ActivatedRoute, private hiringFormService: HiringFormService, private ngxSpinner: NgxSpinnerService) {
    this.dashboardService.setCalledFunc();
    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (params['active']) {
        this.onTabChangeEvent(Number(params['active']));
        this.tabIndex = Number(params['active']);
      }
      else {
        this.onTabChangeEvent(0);

      }
    });

    this.roles = userDetails.getRoles();
    if (this.roles.includes('ADMIN') || this.roles.includes('GRBEO') || this.roles.includes('CISPOC') || this.roles.includes('SDL') || this.roles.includes('DPE')) {
      this.showCi = true;
    }
    if (this.roles.includes('CISPOC') && !this.showCi) {
      this.isCISPOC = true;
      this.tabIndex = 3;
    }
  }

  ngOnInit() {
    this.hiringFormService.nullifyTemplateData();
    this.dialog.closeAll()
    this.ngxSpinner.hide();
    if (!this.isCISPOC) {
      this.getCCData();
      this.getPendingData();
      this.getApprovedData();
    }
    this.getCiData();


  }

  getApprovedData() {
    this.dashboardService.approved$.subscribe(data => {

      if (this.dashboardService.getApprovedCalled()) {
        this.enabledApproved = 'Enabled';
      }
      this.approvedRequestStatus = this.dashboardService.getApprovedCalled();
      if (this.approvedRequestStatus) {
        const index = this.tabIndex
        this.approvedDataSources = data;
        if (this.enabledApproved === 'Enabled' && index === 2) {
          this.storageApprovedData = data;
        }
        this.approvedDataCount = data.length;
        // if (this.approvedDataCount !== 0) {
        this.approvedCount = "[ " + this.approvedDataCount + " ]"
        // }
      }
    })
  }
  getCCData() {
    //this.enableLoadingMsg = false;
    this.dashboardService.cc$.subscribe(data => {
      if (this.dashboardService.getCCCalled()) {
        this.enabledCCView = 'Enabled';
      }
      this.costCaseRequestStatus = this.dashboardService.getCCCalled();
      if (this.costCaseRequestStatus) {
        const index = this.tabIndex
        this.ccDataSource = data;
        if (this.enabledCCView === 'Enabled' && index === 0) {
          this.storageCCViewData = data;
        }
        this.ccviewDataCount = data.length;
        // if (this.ccviewDataCount !== 0) {
        this.ccviewCount = "[ " + this.ccviewDataCount + " ]"
        // }
      }
    })

  }

  getPendingData() {
    this.dashboardService.pending$.subscribe(data => {
      if (this.dashboardService.getPendingCalled()) {
        this.enabledPending = 'Enabled';
        //   // this.pendingRequestStatus = false;
      } else {
      }

      this.pendingRequestStatus = this.dashboardService.getPendingCalled();
      const index = this.tabIndex
      if (this.pendingRequestStatus) {
        this.pendingDataSource = data;
        if (this.enabledPending === 'Enabled' && index === 1) {
          this.storagePendingData = data;
        }
        this.pendingDataCount = data.length;
        // if (this.pendingDataCount !== 0) {
        this.pendingCount = "[ " + this.pendingDataCount + " ]"
        // }
      }
    })

  }

  getCiData() {
    this.dashboardService.ci$.subscribe(data => {

      if (this.dashboardService.getCiCalled()) {
        this.enabledCi = 'Enabled';
      }
      this.ciRequestStatus = this.dashboardService.getCiCalled();
      if (this.ciRequestStatus) {
        const index = this.tabIndex
        this.ciDataSources = data;
        if (this.enabledCi === 'Enabled' && index === 3) {
          this.storageCiData = data;
        }
        this.ciDataCount = data.length;
        // if (this.approvedDataCount !== 0) {
        this.ciCount = "[ " + this.ciDataCount + " ]"
        // }
      }
    })
  }

  dataTransfer(data: any) {
    this.pendingRequest = data;
  }


  setStep(index: number) {
    this.step = index;
  }


  onTabChangeEvent(index: any) {
    this.tabIndex = index;
    if (index === 0) {
      this.enabledCCView = 'Enabled'
      // this.fetchCurrentCostCase();
    } else if (index === 1) {
      this.enabledPending = 'Enabled';
      // this.fetchPendingRequest();
    } else if (index === 2) {
      this.enabledApproved = 'Enabled';
      // this.fetchApprovedRequest();
    } else if (index === 3) {
      this.enabledCi = 'Enabled';
      // this.fetchCiRequest();
    }

    if (this.enabledCCView === 'Enabled' && index === 0) {
      this.ccDataSource = this.storageCCViewData;
      this.fetchCurrentCostCase(index);
      this.getCCData();
    } else if (this.enabledPending === 'Enabled' && index === 1) {
      this.pendingDataSource = this.storagePendingData;
      this.fetchPendingRequest(index);
      this.getPendingData();
    } else if (this.enabledApproved === 'Enabled' && index === 2) {
      this.approvedDataSources = this.storageApprovedData;
      this.fetchApprovedRequest(index);
      this.getApprovedData();
    } else if (this.enabledCi === 'Enabled' && index === 3) {
      this.ciDataSources = this.storageCiData;
      this.fetchCiRequest(index);
      this.getCiData();
    } else {
      if (index === 0) {
      } else if (index === 1) {
        // this.approvedRequestStatus=false;
      } else if (index === 2) {
        // this.approvedRequestStatus=false;

      } else if (index === 3) {
        // this.approvedRequestStatus=false;

      }
    }

  }

  //Dashboard service for fetch current costcase
  fetchCurrentCostCase(index: number) {
    // this.enabledNoDataMsg = false;
    this.costCaseRequestStatus = false;
    this.dashboardService.getCurrentCostCase<CurrentCostcase[]>().subscribe((data: any[]) => {
      this.costCaseRequestStatus = true;

      this.dashboardService.setCC(data);
      if (!this.dashboardService.getPendingCalled()) {
        this.fetchPendingRequest(index);
      }
      if (!this.dashboardService.getApprovedCalled()) {
        this.fetchApprovedRequest(index);
      }
      if (!this.dashboardService.getCiCalled()) {
        this.fetchCiRequest(index);
      }

    });
  }

  // Dashboard Service call to fetch pending request
  fetchPendingRequest(index: number) {
    this.pendingRequestStatus = false
    this.dashboardService.getPendingRequest<RequestDashboard[]>().subscribe((data: RequestDashboard[]) => {
      this.pendingRequestStatus = true;

      this.dashboardService.setPendingRequest(data);

      if (!this.dashboardService.getCCCalled()) {
        this.fetchCurrentCostCase(index);
      }
      if (!this.dashboardService.getApprovedCalled()) {
        this.fetchApprovedRequest(index);
      }
      if (!this.dashboardService.getCiCalled()) {
        this.fetchCiRequest(index);
      }


    });
  }

  //Dashboard Service call to fetch approved request
  fetchApprovedRequest(index: number) {
    this.approvedRequestStatus = false;

    this.dashboardService.getApprovedRequest<RequestDashboard[]>().subscribe((data: RequestDashboard[]) => {
      this.dashboardService.setApproved(data);
      this.approvedRequestStatus = true;

      if (!this.dashboardService.getCCCalled()) {
        this.fetchCurrentCostCase(index);
      }
      if (!this.dashboardService.getPendingCalled()) {
        this.fetchPendingRequest(index);
      }
      if (!this.dashboardService.getCiCalled()) {
        this.fetchCiRequest(index);
      }


    });
  }

  fetchCiRequest(index: number) {
    this.ciRequestStatus = false
    this.dashboardService.getCiRequest<CiDashboard[]>().subscribe((data: CiDashboard[]) => {
      this.ciRequestStatus = true;

      this.dashboardService.setCi(data);

      if (!this.dashboardService.getCCCalled()) {
        this.fetchCurrentCostCase(index);
      }
      if (!this.dashboardService.getApprovedCalled()) {
        this.fetchApprovedRequest(index);
      }
      if (!this.dashboardService.getPendingCalled()) {
        this.fetchCiRequest(index);
      }


    });
  }

}