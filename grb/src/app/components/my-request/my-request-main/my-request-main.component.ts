import { Component, OnInit } from '@angular/core';
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details';
import { UploadComponent } from '../../approval-center/dialogs/upload/upload.component';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MyRequestService } from 'src/app/services/my-request.service';
import { MyRequestDetails } from 'src/app/tsclasses/my-request-details';

import { ActivatedRoute } from '@angular/router';
import { MyRequestCostcaseDetails } from 'src/app/tsclasses/my-request-costcase-details';
import { MyRequestCiDetails } from 'src/app/tsclasses/my-request-ci-details';
import { UserDetailsService } from 'src/app/services/user-details.service';


@Component({
  selector: 'app-my-request-main',
  templateUrl: './my-request-main.component.html',
  styleUrls: ['./my-request-main.component.scss']
})
export class MyRequestMainComponent implements OnInit {

  displayHireRequest: string;
  displayEMEACount: string;
  displayAPACCount: string;
  displayINTERNALCount: string;

  isHireEnabled: string;
  isSwapEnabled: string;
  isBandChangeEnabled: string;
  isGRBReviseEnabled: string;
  isCostcaseEnabled: string;
  isCiEnabled: string;

  passHireRequestData: boolean;
  urlRouteEnabled: boolean = false;
  urlRouteActiveTab: any;
  pendingHireRequestStatus: boolean;
  pendingSwapStatus: boolean;
  hireDataSource: any = [];
  storageHireReqData = [];
  storageSwapData = [];
  storageGRbreviseData = [];
  storageBandChangeData = [];
  storageCostcaseData = [];
  storageCiData = [];
  hireReqCount: string;
  swapCount: string;
  bandChangeCount: string;
  GRBReviseCount: string;
  costcaseCount: string;
  ciCount: string;
  swapDataSource: any;
  bandChangeDataSource: any;
  grbreviseDataSource: any;
  costcaseDataSource: any;
  ciDataSource: any;
  pendingReviseStatus: boolean;
  pendingBandStatus: boolean;
  pendingCostcaseStatus: boolean;
  pendingCiStatus: boolean;
  tabIndex: any = 0;
  hireReqDataCount: number;
  swapDataCount: number;
  bandChangeDataCount: number;
  GRBReviseDataCount: number;
  costcaseDataCount: number;
  ciDataCount: number;
  roles = [];
  showCi: boolean = false;
  dataSource = new MatTableDataSource();

  constructor(private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog, private myrequestservice: MyRequestService, private userDetails: UserDetailsService, private activatedRoute: ActivatedRoute) {
    this.onTabChangeEvent(0);
    this.roles = userDetails.getRoles();
    if(this.roles.includes('ADMIN') || this.roles.includes('GRBEO') || this.roles.includes('CISPOC') || this.roles.includes('SDL') || this.roles.includes('DPE')){
      this.showCi = true;
    }
  }

  ngOnInit() {

  

  }

  getHireRequest() {
    this.myrequestservice.hireRequest$.subscribe(data => {
      let invoked = this.myrequestservice.getHireReqRequestCalled();
      invoked = false;
      // if (invoked) {
        this.isHireEnabled = 'Enabled';
      // }
      // this.pendingHireRequestStatus = invoked;
      const index = this.tabIndex
      this.hireDataSource = data;
      if (this.isHireEnabled === 'Enabled' && index === 2) {
        this.storageHireReqData = data;
      }
      this.hireReqDataCount = data.length;
      if (this.hireReqDataCount !== 0) {
        this.hireReqCount = "[ " + this.hireReqDataCount + " ]"
      }
    })
  }
  getSwap() {
    this.myrequestservice.swap$.subscribe(data => {
      let invoked = this.myrequestservice.getSwapCalled()
      invoked = false;
      // if (invoked) {
        this.isSwapEnabled = 'Enabled';
      // }
      // this.pendingSwapStatus = invoked;
      const index = this.tabIndex
      this.swapDataSource = data;
      if (this.isSwapEnabled === 'Enabled' && index === 2) {
        this.storageSwapData = data;
      }
      this.swapDataCount = data.length;
      if (this.swapDataCount !== 0) {
        this.swapCount = "[ " + this.swapDataCount + " ]"
      }
    })
  }
  getBandChange() {
    this.myrequestservice.bandChange$.subscribe(data => {
      let invoked=this.myrequestservice.getBandChangeCalled();
      // invoked=false;
      // if (invoked) {
        this.isBandChangeEnabled = 'Enabled';
      // }
      // this.pendingBandStatus = invoked;
      const index = this.tabIndex
      this.bandChangeDataSource = data;
      if (this.isBandChangeEnabled === 'Enabled' && index === 2) {
        this.storageBandChangeData = data;
      }
      this.bandChangeDataCount = data.length;
      if (this.bandChangeDataCount !== 0) {
        this.bandChangeCount = "[ " + this.bandChangeDataCount + " ]"
      }
    })
  }
  getGRBRevise() {
    this.myrequestservice.GRBRevise$.subscribe(data => {
      let invoked=this.myrequestservice.getGRBReviseCalled()
      invoked=false;
      // if (invoked) {
        this.isGRBReviseEnabled = 'Enabled';
      // }
      // this.pendingReviseStatus = invoked;
      const index = this.tabIndex
      this.grbreviseDataSource = data;
      if (this.isGRBReviseEnabled === 'Enabled' && index === 2) {
        this.storageGRbreviseData = data;
      }
      this.GRBReviseDataCount = data.length;
      if (this.GRBReviseDataCount !== 0) {
        this.GRBReviseCount = "[ " + this.GRBReviseDataCount + " ]"
      }
    })
  }

  getCostcase() {
    this.myrequestservice.costcase$.subscribe(data => {
      let invoked=this.myrequestservice.getCostcaseCalled()
      invoked=false;
      // if (invoked) {
        this.isCostcaseEnabled = 'Enabled';
      // }
      // this.costcaseStatus = invoked;
      const index = this.tabIndex
      this.costcaseDataSource = data;
      if (this.isCostcaseEnabled === 'Enabled' && index === 2) {
        this.storageCostcaseData = data;
      }
      this.costcaseDataCount = data.length;
      if (this.costcaseDataCount !== 0) {
        this.costcaseCount = "[ " + this.costcaseDataCount + " ]"
      }
    })
  }

  getCi() {
    this.myrequestservice.ci$.subscribe(data => {
      let invoked=this.myrequestservice.getCiCalled()
      invoked=false;
      // if (invoked) {
        this.isCiEnabled = 'Enabled';
      // }
      // this.costcaseStatus = invoked;
      const index = this.tabIndex
      this.ciDataSource = data;
      if (this.isCiEnabled === 'Enabled' && index === 2) {
        this.storageCiData = data;
      }
      this.ciDataCount = data.length;
      if (this.ciDataCount !== 0) {
        this.ciCount = "[ " + this.ciDataCount + " ]"
      }
    })
  }

  onTabChangeEvent(index: any) {
    this.tabIndex = index;

    if (this.isHireEnabled === 'Enabled' && index === 0) {
      this.hireDataSource = this.storageHireReqData;
      this.getHireRequest()
    } else if (this.isSwapEnabled === 'Enabled' && index === 1) {
      this.swapDataSource = this.storageSwapData;
      this.getSwap()
    } else if (this.isBandChangeEnabled === 'Enabled' && index === 2) {
      this.bandChangeDataSource = this.storageBandChangeData;
      this.getBandChange()
    }
    else if (this.isGRBReviseEnabled === 'Enabled' && index === 3) {
      this.grbreviseDataSource = this.storageGRbreviseData;
      this.getGRBRevise()
    } 
    else if (this.isCostcaseEnabled === 'Enabled' && index === 4) {
      this.costcaseDataSource = this.storageCostcaseData;
      this.getCostcase()
    }
    else if (this.isCiEnabled === 'Enabled' && index === 5) {
      this.ciDataSource = this.storageCiData;
      this.getCi()
    } else {
      if (index === 0) {
        this.fetchHireRequestDeatils(index);
      } else if (index === 1) {

        this.fetchSwapDeatils(index);
      } else if (index === 2) {


        this.fetchBandChangeDeatils(index);
      } else if (index === 3) {


        this.fetchGRBReviseDeatils(index);
      }else if (index === 4) {


        this.fetchCostcaseDeatils(index);
      }else if (index === 5) {


        this.fetchCiDetails(index);
      }
    }

  }

  fetchHireRequestDeatils(index: number) {
    this.pendingHireRequestStatus = false;
    this.myrequestservice.getHireReqTableDetails<MyRequestDetails[]>().subscribe((data: MyRequestDetails[]) => {
      this.pendingHireRequestStatus = true;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['lastUpdatedDate']).getTime() - new Date(a['lastUpdatedDate']).getTime();
        });
      }

      Object.keys(data).forEach(e => {

        var value = data[e].finalStatus;
        if (value != null) {
          var keyValue = value.replace(/_/g, ' ')

          data[e].finalStatus = keyValue;
        }


      })
      this.myrequestservice.setHireReqRequest(data)
      this.getHireRequest();
      this.fetchBandChangeDeatils(index);
      this.fetchSwapDeatils(index);
      this.fetchGRBReviseDeatils(index);
      this.fetchCostcaseDeatils(index);
      this.fetchCostcaseDeatils(index);
      this.fetchCiDetails(index);
    });
  }

  fetchSwapDeatils(index: number) {
    if(!this.pendingSwapStatus)
    this.pendingSwapStatus = false;

    this.myrequestservice.getSwapTableDetails<MyRequestDetails[]>().subscribe((data:[]) => {
      this.pendingSwapStatus = true;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['createdDate']).getTime() - new Date(a['createdDate']).getTime();
        });
      }
      this.myrequestservice.setSwap(data)
      this.getSwap();
    });

  }
  fetchBandChangeDeatils(index: number) {
    if(this.pendingBandStatus)
    this.pendingBandStatus = false;

    this.myrequestservice.getBandChangeTableDetails<MyRequestDetails[]>().subscribe((data: MyRequestDetails[]) => {
      this.pendingBandStatus = true;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['lastUpdatedDate']).getTime() - new Date(a['lastUpdatedDate']).getTime();
        });
      }
      this.myrequestservice.setBandChange(data)
      this.getBandChange();

    });

  }
  fetchGRBReviseDeatils(index: number) {
    if(this.pendingReviseStatus)
    this.pendingReviseStatus = false;

    this.myrequestservice.getGrbReviseTableDetails<MyRequestDetails[]>().subscribe((data: MyRequestDetails[]) => {
      this.pendingReviseStatus = true;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['lastUpdatedDate']).getTime() - new Date(a['lastUpdatedDate']).getTime();
        });
      }
      this.myrequestservice.setGRBRevise(data)
      this.getGRBRevise();

    });

  }

  fetchCostcaseDeatils(index: number) {
    if(this.pendingCostcaseStatus)
    this.pendingCostcaseStatus = false;

    this.myrequestservice.getCostcaseTableDetails<MyRequestCostcaseDetails[]>().subscribe((data: MyRequestCostcaseDetails[]) => {
      this.pendingCostcaseStatus = true;
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.myrequestservice.setCostcase(data)
      this.getCostcase();

    });

  }
  
  fetchCiDetails(index: number) {
    if(this.pendingCiStatus)
    this.pendingCiStatus = false;

    this.myrequestservice.getCiDetails<MyRequestCiDetails[]>().subscribe((data: MyRequestCiDetails[]) => {
      this.pendingCiStatus = true;
      if(data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['lastActionDate']?b['lastActionDate']:b['submitteddate']).getTime() - new Date(a['lastActionDate']?a['lastActionDate']:a['submitteddate']).getTime();
        });
      }

      this.myrequestservice.setCi(data)
      this.getCi();

    });

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches

  }



}
