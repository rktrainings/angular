import { Component, OnInit } from '@angular/core'
import { ApprovalCenterService } from '../../../services/approval-center.service'
import { ApprovalCenterDetails } from 'src/app/tsclasses/approval-center-details'
import { MatTableDataSource, MatDialog } from '@angular/material'
import { UploadComponent } from '../dialogs/upload/upload.component'
import { ActivatedRoute } from '@angular/router'
import { UserDetailsService } from 'src/app/services/user-details.service'
import { HiringFormService } from 'src/app/services/hiring-form.service'

@Component({
  selector: 'app-iot-base',
  templateUrl: './iot-base.component.html',
  styleUrls: ['./iot-base.component.scss']
})
export class IotBaseComponent implements OnInit {

  fileToUpload: File = null;
  percentDone: number;
  uploadSuccess: boolean;
  sampleJSON = [];
  sampleFormatDownload = [];
  dataSource = new MatTableDataSource<ApprovalCenterDetails>();
  isAGEnabled: string;
  isEMEAEnabled: string;
  isAPACEnabled: string;
  isINTERNALEnabled: string;
  storageAGData: any = [];
  storageEMEAData: any = [];
  storageAPACData: any = [];
  storageINTERNALData: any = [];
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  totalCountAG: number;
  displayAGCount: string;
  totalCountEMEA: number;
  displayEMEACount: string;
  totalCountAPAC: number;
  displayAPACCount: string;
  totalCountINTERNAL: number;
  displayINTERNALCount: string;
  role: string = 'iot';
  activeTabIndex: number = 0;
  activeTab: any;
  urlRouteEnabled: boolean = false;
  urlRouteActiveTab: any;
  geoNameList = ['AG', 'EMEA', 'APAC', 'INTERNAL'];
  passAGData: boolean = false;
  passEMEAData: boolean = false;
  passAPACData: boolean = false;
  passINTERNALData: boolean = false;
  enableAG: boolean
  enableEMEA: boolean
  enableAPAC: boolean
  enableINT: boolean

  constructor(private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog, private userDetails: UserDetailsService,
    private activatedRoute: ActivatedRoute,private hiringFormService:HiringFormService) {
    this.dialog.closeAll()
    this.activatedRoute.queryParams.subscribe(params => {
      this.urlRouteActiveTab = params.activeTab;
      if (params.activeTab) {
        this.urlRouteEnabled = true;
        // this.pickActiveTabIndex(this.urlRouteActiveTab);
      }
    });

  }

  ngOnInit() {
    //     if (this.urlRouteEnabled) {
    //       this.pickActiveTabIndex(this.urlRouteActiveTab);
    //     } else {
    // //      this.onTabChangeEvent(0);
    //     }
    // this.urlRouteEnabled = true;
    // this.urlRouteActiveTab = 'APAC';
    // setTimeout(() => {
    this.hiringFormService.nullifyTemplateData();
    this.getIOTData()

    this.loadIOTData();
    // }, 0);
    let roles = this.userDetails.getRoles();
    if (roles.includes('ADMIN')) {
      roles.push('IOTAG')
      roles.push('IOTEMEA')
      roles.push('IOTINT')
      roles.push('IOTAPAC')
    }

    this.showTabs(roles)
  }

  showTabs(roles) {

    if (roles.includes('IOTAG')) {
      this.enableAG = true;
      this.onTabChangeEvent("AG");
      if (roles.includes('IOTEMEA')) {
        this.enableEMEA = true;
      }
      if (roles.includes('IOTAPAC')) {
        this.enableAPAC = true
      }
      if (roles.includes('IOTINT')) {
        this.enableINT = true
      }
    }
    else if (roles.includes('IOTEMEA') && !roles.includes('IOTAG')) {
      this.enableEMEA = true;
      this.onTabChangeEvent('EMEA');
      if (roles.includes('IOTAPAC')) {
        this.enableAPAC = true
      }
      if (roles.includes('IOTINT')) {
        this.enableINT = true
      }
    }
    else if (roles.includes('IOTAPAC') && !roles.includes('IOTEMEA')) {
      this.enableAPAC = true;
      this.onTabChangeEvent("APAC");
      if (roles.includes('IOTINT')) {
        this.enableINT = true
      }
    }
    else if (roles.includes('IOTINT')) {
      this.enableINT = true
      this.onTabChangeEvent("INTERNAL");

    }
  }

  getIOTData() {
    this.approvalCenterService.iot$.subscribe((data: any[]) => {
      // let invoked = this.approvalCenterService.getIOTInvoked();
      // let invoked = false;
      // if (invoked) {
      //   this.iotAPICallEnabled = true;
      //   this.enableLoadingMsg = false;
      // } else {
      //   this.enableLoadingMsg = true;
      // }
     

      if (data.length > 0) {
        if (this.urlRouteEnabled) {
          // this.onTabChangeEvent(this.activeTabIndex);
        } else {
          this.onTabChangeEvent(0);
        }

        this.storageAGData = data[0];
        this.totalCountAG = data[0].length;
        if (this.storageAGData)
        if (this.storageAGData.length > 0) {
          this.storageAGData.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
        if (this.storageAGData !== 0) {
          this.displayAGCount = "[ " + this.totalCountAG + " ]"
        }

        this.storageEMEAData = data[1];
        this.totalCountEMEA = data[1].length;
        if (this.storageEMEAData)
        if (this.storageEMEAData.length > 0) {
          this.storageEMEAData.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
        if (this.storageEMEAData !== 0) {
          this.displayEMEACount = "[ " + this.totalCountEMEA + " ]"
        }

        this.storageAPACData = data[2];
        this.totalCountAPAC = data[2].length;
        if (this.storageAPACData)
        if (this.storageAPACData.length > 0) {
          this.storageAPACData.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
        if (this.storageAPACData !== 0) {
          this.displayAPACCount = "[ " + this.totalCountAPAC + " ]"
        }

        this.storageINTERNALData = data[3];
        this.totalCountINTERNAL = data[3].length;
        if (this.storageINTERNALData)
        if (this.storageINTERNALData.length > 0) {
          this.storageINTERNALData.sort((a, b) => {
            return new Date(b['requestSubmmitedDate']).getTime() - new Date(a['requestSubmmitedDate']).getTime();
          });
        }
        if (this.storageINTERNALData !== 0) {
          this.displayINTERNALCount = "[ " + this.totalCountINTERNAL + " ]"
        }
      }
    })

  }

  pickActiveTabIndex(activeTab: any) {
    switch (activeTab) {
      case 'AG':
        this.activeTabIndex = 0;
        break;
      case 'EU':
        this.activeTabIndex = 1;
        break;
      case 'APAC':
        this.activeTabIndex = 2;
        break;
      case 'INTERNAL':
        this.activeTabIndex = 3;
        break;
    }
    //  window.location.reload();
    //  this.onTabChangeEvent(this.activeTabIndex);
  }


  onClickUpload() {
    ////console.log('test1')
    this.openUploadActionDialog();
  }

  openUploadActionDialog(): void {
    ////console.log('test2')
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '420px',
      data: this.role,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
  // onTabChangeEvent(index) {
  //   // console.log(tabLabel)
  //   // let label = ""
  //   // if (tabLabel){
  //   //   if (tabLabel.tab) {
  //   //     if (tabLabel.tab.textLabel) {
  //   //       label = tabLabel.tab.textLabel
  //   //     }
  //   //   } else {
  //   //     label = tabLabel
  //   //   }
  //   // }

  //   if (index === 0) {
  //     this.isAGEnabled = 'Enabled';
  //     this.activeTab = 'AG';
  //     this.passAGData = true;
  //     //      this.fetchIOTDetails('AG', tabLabel);
  //   } else if (index === 1) {
  //     this.isEMEAEnabled = 'Enabled';
  //     this.activeTab = 'EU';
  //     this.passEMEAData = true;
  //     //      this.fetchIOTDetails('EMEA', tabLabel);
  //   } else if (index === 2) {
  //     this.isAPACEnabled = 'Enabled';
  //     this.activeTab = 'APAC';
  //     this.passAPACData = true;
  //     //      this.fetchIOTDetails('APAC', tabLabel);
  //   } else if (index === 3) {
  //     this.isINTERNALEnabled = 'Enabled';
  //     this.activeTab = 'INTERNAL';
  //     this.passINTERNALData = true;
  //     //      this.fetchIOTDetails('INTERNAL', tabLabel);
  //   }

  // }

  onTabChangeEvent(tabLabel: any) {
    console.log(tabLabel)
    let label = ""
    if (tabLabel) {
      if (tabLabel.tab) {
        if (tabLabel.tab.textLabel) {
          label = tabLabel.tab.textLabel
        }
      } else {
        label = tabLabel
      }
    }

    if (label.includes('AG')) {
      this.isAGEnabled = 'Enabled';
      this.activeTab = 'AG';
      this.passAGData = true;
      //      this.fetchIOTDetails('AG', tabLabel);
    } else if (label.includes('EMEA')) {
      this.isEMEAEnabled = 'Enabled';
      this.activeTab = 'EU';
      this.passEMEAData = true;
      //      this.fetchIOTDetails('EMEA', tabLabel);
    } else if (label.includes('APAC')) {
      this.isAPACEnabled = 'Enabled';
      this.activeTab = 'APAC';
      this.passAPACData = true;
      //      this.fetchIOTDetails('APAC', tabLabel);
    } else if (label.includes('INTERNAL')) {
      this.isINTERNALEnabled = 'Enabled';
      this.activeTab = 'INTERNAL';
      this.passINTERNALData = true;
      //      this.fetchIOTDetails('INTERNAL', tabLabel);
    }

  }

  // fetchIOTDetails(geoName: string, index: number) {
  //   this.enableLoadingMsg = true;
  //   this.iotAPICallEnabled = false;
  //   this.approvalCenterService.getIOTDetails<ApprovalCenterDetails[]>(geoName).subscribe((data: ApprovalCenterDetails[]) => {
  //     this.iotAPICallEnabled = true;
  //     if (this.dataSource.data !== null) {
  //       this.enableLoadingMsg = false;
  //     }

  //     if (this.isAGEnabled === 'Enabled' && index === 0) {
  //       this.storageAGData = data;
  //       //        this.totalCountAG = data.length;
  //       // if (this.storageAGData !== 0) {
  //       //   this.displayAGCount = "[ " + this.totalCountAG + " ]"
  //       // }
  //     } else if (this.isEMEAEnabled === 'Enabled' && index === 1) {
  //       this.storageEMEAData = data;
  //       // this.totalCountEMEA = data.length;
  //       // if (this.storageEMEAData !== 0) {
  //       //   this.displayEMEACount = "[ " + this.totalCountEMEA + " ]"
  //       // }
  //     } else if (this.isAPACEnabled === 'Enabled' && index === 2) {
  //       this.storageAPACData = data;
  //       // this.totalCountAPAC = data.length;
  //       // if (this.storageAPACData !== 0) {
  //       //   this.displayAPACCount = "[ " + this.totalCountAPAC + " ]"
  //       // }
  //     } else if (this.isINTERNALEnabled === 'Enabled' && index === 3) {
  //       this.storageINTERNALData = data;
  //       // this.totalCountINTERNAL = data.length;
  //       // if (this.storageINTERNALData !== 0) {
  //       //   this.displayINTERNALCount = "[ " + this.totalCountINTERNAL + " ]"
  //       // }
  //     }
  //   });

  // }



  loadIOTData() {
    this.enableLoadingMsg = true;
    this.iotAPICallEnabled = false;
    this.approvalCenterService.requestDataFromMultipleSources().subscribe((data: any[]) => {
      this.iotAPICallEnabled = true;
      this.enableLoadingMsg = false;

      this.approvalCenterService.setIOTData(data)
      // this.urlRouteEnabled = true;
      // this.urlRouteActiveTab = 'APAC';


      //    this.onTabChangeEvent(0);


      // this.iotAPICallEnabled = true;
      // if (this.dataSource.data !== null) {
      //   this.enableLoadingMsg = false;
      // }
      // //        if (geoName === 'AG') {
      // this.storageAGData = data[0];
      // this.totalCountAG = data[0].length;
      // if (this.storageAGData !== 0) {
      //   this.displayAGCount = "[ " + this.totalCountAG + " ]"
      // }
      // //        } else if (geoName === 'EMEA') {
      // this.storageEMEAData = data[1];
      // this.totalCountEMEA = data[1].length;
      // if (this.storageEMEAData !== 0) {
      //   this.displayEMEACount = "[ " + this.totalCountEMEA + " ]"
      // }
      // //        } else if (geoName === 'APAC') {
      // this.storageAPACData = data[2];
      // this.totalCountAPAC = data[2].length;
      // if (this.storageAPACData !== 0) {
      //   this.displayAPACCount = "[ " + this.totalCountAPAC + " ]"
      // }
      // //        } else if (geoName === 'INTERNAL') {
      // this.storageINTERNALData = data[3];
      // this.totalCountINTERNAL = data[3].length;
      // if (this.storageINTERNALData !== 0) {
      //   this.displayINTERNALCount = "[ " + this.totalCountINTERNAL + " ]"
      // }
      // //       }

    });

  }


}