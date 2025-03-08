import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import templatecardJSON from 'src/assets/data/grb-template/cardTemplate.json';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HiringFormSubmitComponent } from '../hiring-form-submit/hiring-form-submit.component';
import { HiringFormViewComponent } from '../hiring-form-view/hiring-form-view.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { CommonService } from 'src/app/services/common-service.service';
import { GrbTemplateCommentsComponent } from '../../approval-center/dialogs/grb-template-comments/grb-template-comments.component';
import { Subscription } from 'rxjs';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { MetroDetails } from 'src/app/tsclasses/metro-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-card-grb-template',
  templateUrl: './card-grb-template.component.html',
  styleUrls: ['./card-grb-template.component.scss']
})

export class CardGrbTemplateComponent implements OnInit {

  templatecard = [];

  private key: any;
  private hireType = ""
  private postServiceUrl: any;
  private backFillData: any;
  private backFillDataFields: any;
  private subscription: Subscription;
  showSubmit = true;
  showApprove = false;
  showInfo = false;
  showReject = false;
  private formType: string;
  private tollName: any;
  showUpdate: boolean = false;
  private activeTab: any;
  private submitStatus: string;
  private grbValidButton: boolean;
  private gomValidButton: boolean;
  private tramValidButton: boolean;
  private hiringAs: string;
  private hiringgaAs: string;
  private selectedIndex: number;
  private templateKeys: any = [];
  private grbTemplateBackfill: any;
  loadingText: string;
  private storedFile: any;
  subscribeRoute: Subscription;
  subscribeDept: Subscription;
  orpData: any;
  templateData: {};
  swapGRBNumber: any;
  // stepper code merge
  isExternalGRB: boolean;
  isInternalGRB: boolean;
  checkReturn: boolean = false;
  activeIndex: any;
  activeGRBDetails: boolean;
  activeGOMDetails: boolean;
  activeTRAMDetails: boolean;
  activeEmpDetails: boolean = false;
  activePreview: boolean;
  isGRBFilled: boolean;
  isGOMFilled: boolean;
  isTRAMFilled: boolean;
  isEmployeeFilled: boolean = true;
  formName: any;
  greenColor: string = 'green';
  baseColor: string = '$bg-aqua';
  geoName: any;
  requestType: any;
  inCompleteBackfill: boolean = true;
  showClose: boolean;
  displayArchive: boolean = false;
  hideTram: boolean = false;
  showGOM = true;
  roles = [];
  metroNumber: string;
  empStatus: any;

  constructor(private dialog: MatDialog, private hiringFormService: HiringFormService,
    private route: ActivatedRoute, private activatedRoute: ActivatedRoute, private location: Location,
    private notification: NotificationService, private dashboardService: DashboardService, private router: Router, private commonService: CommonService, private spinner: NgxSpinnerService,
    private userDetails: UserDetailsService) {

    this.postServiceUrl = environment.GRB_SUBMIT_API;

    //this.templateData = this.hiringFormService.getBackFillData();
    this.subscription = this.route.queryParams.subscribe(params => {
      //////////console.log('param', params);
      this.hireType = params.hireType;
      this.formName = params.formName;
      this.swapGRBNumber = params.swapGRBNumber;
      this.templatecard = templatecardJSON['card'].filter(e => e.type.includes(this.hireType));

      // ////console.log('formName', this.formName);
      //////////console.log(templatecardJSON['card']);
      //////console.log('swapGRBNumber:', this.swapGRBNumber);
      //////console.log(localStorage.getItem('backFillData'))

      // stepper code merge
      if (this.hireType === 'external') {
        this.isExternalGRB = true;
      } else if (this.hireType === 'internal') {
        this.isInternalGRB = true;
      }

    });
    this.subscription.unsubscribe();

  }

  ngOnInit() {
    this.getParams();
    this.getBackFillData();
    this.getORPData();
    this.getTemplateData();
    this.getDepts();
    this.showCard();
    this.getGRBandGOM();
    setTimeout(() => {
      this.validateCard();
    })
    this.setSelectedBackfillData();
    this.setSelectedORPData();
  }
  setSelectedBackfillData() {
    this.backFillData.map(e => {
      e.checked = true
    })
    localStorage.setItem('backFillData', JSON.stringify(this.backFillData))
  }
  setSelectedORPData() {
    this.orpData.map(e => {
      e.checked = true
    })
    localStorage.setItem('orpData', JSON.stringify(this.orpData))
  }

  fetchTollsDetails(metroNo) {
    console.log(metroNo);
    if (this.formName == 'tolls' && this.formName == 'iot' && this.formName == 'board') {
      this.spinner.show();
    }
    this.dashboardService.getMetroPendingDetails<MetroDetails[]>(metroNo).subscribe((data: MetroDetails[]) => {
      this.dashboardService.setTolls(data);
      if (this.formName == 'tolls' && this.formName == 'iot' && this.formName == 'board') {
        this.spinner.hide();
      }
    }, (() => {
    }));
  }
  validateCard() {

    if (this.formType) {
      if (this.formType == 'grbArchive') {
        this.displayArchive = true;
        ////console.log('arch', this.backFillData);
        this.templatecard = templatecardJSON['card'].filter(e => e.key == "Preview");
      }
      else {
        if (this.hireType == 'external') {
          // //console.log(this.backFillData);
          if (this.backFillData == 0) {
            this.templatecard = templatecardJSON['card'].filter(e => e.key !== "EMP");
            ////console.log(this.templatecard);
            this.templatecard.map(e => {
              if (e.key == "GRB") {
                e['filled'] = true;

                // //console.log(e['filled'])
              }

            })
          }
          else {
            // //console.log(this.templatecard);
            this.templatecard.map(e => {
              if (e.key == "GRB") {
                e['filled'] = true;


              }
              if (e.key == "GOM") {
                e['filled'] = true;

              }
              if (e.key == "TRAM") {
                e['filled'] = true;

              }
            })
            this.inCompleteBackfill = true;
            this.activeEmpDetails = true;

          }
        }
        else {
          this.templatecard = templatecardJSON['card'].filter(e => e.key !== "GOM" && e.key !== "TRAM");
          // //console.log('backfill', this.templatecard);
          this.templatecard.map(e => {
            if (e.key == "GRB") {
              e['filled'] = true;
              this.grbValidButton = true;
              //console.log(e['filled'])
            }
          })
          this.inCompleteBackfill = true;
          this.activeEmpDetails = true;

        }
      }
      this.grbValidButton = true;
      this.gomValidButton = true;
      this.tramValidButton = true;
      setTimeout(() => {
        this.navigateTemplate("Preview");
        // if (document.getElementById('Preview'))
        // document.getElementById('Preview').click()
      }, 0);
      this.templateKeys = this.templatecard.map((a) => a.key);
      localStorage.setItem('templateKeys', JSON.stringify(this.templateKeys))
    }
    else {
      ////////console.log("submit");
      this.templatecard.map((e) => {
        ///////console.log(e.key);
        if (e.key == "GRB") {
          this.hiringFormService.grbValid$.subscribe(bool => {
            e['filled'] = bool
            this.grbValidButton = bool;
            ////////console.log(bool, this.grbValidButton)
          })

        }
        if (e.key == "GOM") {
          this.hiringFormService.gomValid$.subscribe(bool => {
            e['filled'] = bool
            this.gomValidButton = bool;
            //////////console.log(bool, this.gomValidButton)
          })
        }

        if (e.key == "TRAM") {
          this.hiringFormService.tramValid$.subscribe(bool => {
            e['filled'] = bool
            this.tramValidButton = bool;
            //////////console.log(bool, this.gomValidButton)
          })
        }

        if (e.key == "EMP") {
          if (this.requestType == 'conversion' || this.requestType == 'subk') {

            this.activeEmpDetails = false;
            this.hiringFormService.empValid$.subscribe(bool => {
              this.inCompleteBackfill = bool;
              this.activeEmpDetails = bool;
              // this.isEmployeeFilled = bool;
              ////console.log(bool, this.inCompleteBackfill)
            })
            this.hiringAs = this.backFillDataFields['hiringAs'];
            if (this.hiringAs == "Subk-NewHire") {
              this.inCompleteBackfill = true;
            }
          }
          else {
            this.inCompleteBackfill = true;
            this.activeEmpDetails = true;
          }
        }

      })
      this.templateKeys = this.templatecard.map((a) => a.key);
      localStorage.setItem('templateKeys', JSON.stringify(this.templateKeys))
    }
  }
  showCard() {

    this.hiringAs = this.backFillDataFields['hiringAs'];
    console.log(this.backFillDataFields);
    if (!this.hiringAs) {
      if (this.templateData['hiringAs']) {
        this.hiringAs = this.templateData['hiringAs'];
      }
    }
    if (this.hiringAs) {
      if (this.hiringAs.toLowerCase().includes('new growth') && this.hireType == 'external') {
        this.templatecard = templatecardJSON['card'].filter(e => e.hiring.includes(this.hiringAs));

      }
      if (this.hiringAs.toLowerCase().includes('subk-newhire') && this.hireType == 'external') {
        this.templatecard = templatecardJSON['card'].filter(e => e.hiring.includes(this.hiringAs));

      }
      if (this.hiringAs.toLowerCase().includes('subk-newhire') && this.hireType == 'external') {
        this.templatecard = templatecardJSON['card'].filter(e => e.hiring.includes(this.hiringAs));
      }
      // console.log(this.hiringAs);

      if (this.hiringAs.toLowerCase().includes('conversion') && (this.hiringAs.toLowerCase().includes('extension') || this.hiringAs.toLowerCase().includes('promotion')) && this.hireType == 'external') {
        this.showGOM = false;
        this.templatecard = templatecardJSON['card'].filter(e => e.key != 'GOM');

      }
    }
    //else
    // this.templatecard = templatecardJSON['card'].filter(e => e.key !== "GOM");

    this.templateKeys = this.templatecard.map((a) => a.key);
    localStorage.setItem('templateKeys', JSON.stringify(this.templateKeys))
    //////////console.log(this.templateKeys)

  }
  onEnable() {
    this.empStatus = JSON.parse(localStorage.getItem('empStatus'));
    if (this.userDetails.getRoles().includes('GRBEORD')) {
      // console.log('rolesss:', this.userDetails.getRoles());
      return true;
    } else {
      if (this.hireType == 'internal') {
        if (JSON.parse(localStorage.getItem('checkedBackfill')) || JSON.parse(localStorage.getItem('checkedORP'))) {
          // console.log('activeEmpDetails:', this.activeEmpDetails);

          if (this.empStatus == true) {
            return false;
          } else {
            return true;
          }

        } else {
          if (this.grbValidButton == true) {
            return false;
          }
          else
            return true;
        }
      } else if (this.hireType == 'external') {
        if (JSON.parse(localStorage.getItem('checkedBackfill'))) {
          if (this.empStatus == true) {
            return false;
          } else {
            return true;
          }

        }
        
        // if (JSON.parse(localStorage.getItem('empStatus'))) {
        //   this.templateData = JSON.parse(localStorage.getItem('templateData'));
        //   if (this.templateData['hiringAs'])
        //     if (this.templateData['hiringAs'].toLowerCase().includes('conversion') || 
        //     this.templateData['hiringAs'].toLowerCase().includes('backfill')) {
        //       if (this.empStatus == true) {
        //         console.log('disable false');              
        //         return false;
        //       } else {
        //         console.log('disable true');
        //         return true;
        //       }
        //     }
        // } else {
        //   return false;
        // }
      } else {
        // //console.log(this.gomValidButton);
        // //console.log(this.grbValidButton);
        // //console.log(this.tramValidButton);
        if (this.templateKeys.includes('GOM')) {
          if (this.gomValidButton && this.grbValidButton && this.tramValidButton) {
            return false;
          } else
            return true;
        } else {
          if (this.grbValidButton && this.tramValidButton) {
            return false;
          } else
            return true;
        }
      }

    }
  }

  getBackFillData() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))
    }
    else {
      this.backFillData = this.hiringFormService.getBackFillData();
    }
    ////console.log('backFillData', this.backFillData);
  }

  getORPData() {
    if (localStorage.getItem('orpData')) {
      this.orpData = JSON.parse(localStorage.getItem('orpData'))
    }
    else {
      this.orpData = this.hiringFormService.getOrpData();
    }
  }

  getTemplateData() {
    this.templateData = this.hiringFormService.getTemplateData();
    localStorage.setItem('band', JSON.stringify(this.templateData['band']));
    console.log(this.templateData);
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (!path.includes('create-request')) {
      console.log(this.templateData['metro']);

      this.fetchTollsDetails(this.templateData['metro'])
    }

  }
  getDepts() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))
    }
    else {
      this.backFillData = this.hiringFormService.getBackFillData();
    }
    //////console.log(this.backFillData);

    this.backFillDataFields = this.backFillData.length > 0 ? this.backFillData[0] : {};
    let templateData = this.hiringFormService.getTemplateData();

    ////////console.log(templateData)

    if (!templateData['deptCode'])
      this.hiringFormService.setdept({})
    const deptCode = this.backFillDataFields['deptCode'] ? this.backFillDataFields['deptCode'] : templateData['deptCode']
    //////console.log(deptCode);


    if (deptCode) {
      this.loadingText = 'Loading';
      this.spinner.show()
      // this.subscribeDept =
      this.hiringAs = this.backFillDataFields['hiringAs'];

      if (this.formName !== 'tolls' && this.formName !== 'iot' && this.formName !== 'board') {
        if (this.hiringAs) {
          if (this.hiringAs.toLowerCase().includes('subk')) {
            this.hiringFormService.getDeptDetails(deptCode, environment.GET_DEPT_DETAILS_SUBK).subscribe(data => {
              this.geoName = data['iot'];
              //////console.log('geoName', this.geoName);
              this.hiringFormService.setdept(data)
              this.spinner.hide()

            })
          }
          else {
            this.hiringFormService.getDeptDetails(deptCode, environment.GET_DEPT_DETAILS).subscribe(data => {
              this.geoName = data['iot'];
              //////console.log('geoName', this.geoName);
              this.hiringFormService.setdept(data)
              this.spinner.hide()

            })
          }
        }
        else {
          console.log(environment.GET_JRSS);

          this.hiringFormService.getJRS(deptCode, environment.GET_JRSS).subscribe(data => {
            // this.geoName = data['iot'];
            let jrs = data['jrs'];
            //////console.log('geoName', this.geoName);
            let deptData = { ...data, ...this.templateData }
            deptData['jrs'] = jrs;
            console.log(deptData);

            this.hiringFormService.setdept(deptData)
            this.spinner.hide()

          })
        }
      } else {
        this.hiringFormService.setdept(this.templateData);
        this.spinner.hide()

      }
      // setTimeout(() => {
      //   this.subscribeDept.unsubscribe()
      // }, 1000);
    }
  }
  navigateTemplate(key) {
    this.key = key;
    //////////console.log(key);
    let component: any;
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    // if (path.includes('hiresubmit')) {
    //   component = HiringFormSubmitComponent;
    // } else {
    component = HiringFormSubmitComponent;
    // this.key='Preview'
    // }
    if (key == "Preview" || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
      component = HiringFormViewComponent
    }

    //////console.log(key);
    //////console.log("templateData-in card", this.templateData)
    //////console.log(JSON.parse(localStorage.getItem('templateData')))
    const dialogRef = this.dialog.open(component, {
      width: '168vh',
      height: '99vh',
      data: {
        name: this.key,
        postServiceUrl: environment.GRB_SUBMIT_API,
        backFillData: this.backFillData,
        orpData: this.orpData,
        templateData: this.templateData
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      //////////console.log('The dialog was closed');

    });
  }
  identifyFormType(formType: string) {
    switch (formType) {
      case 'iot':
        this.showApprove = true;
        this.showReject = true;
        this.showSubmit = false;
        // this.validateCard();
        break;
      case 'board':
        this.showApprove = true;
        this.showReject = true;
        this.showSubmit = false;
        // this.validateCard();
        break;
      case 'bizops':

        this.showApprove = true;
        this.showReject = true;
        this.showSubmit = false;
        this.showInfo = false;
        // this.validateCard();
        break;
      case 'tolls':
        this.showApprove = true;
        this.showInfo = true;
        this.showSubmit = false;
        // this.validateCard();
        break;
      case 'edit-metro':
        this.showApprove = false;
        this.showReject = false;
        this.showSubmit = false;
        this.showUpdate = true;
        this.showInfo = false;
        //this.inCompleteBackfill = true;
        // this.validateCard();
        break;
      case 'swap':
        this.showApprove = true;
        this.showReject = true;
        this.showSubmit = false;
        this.showInfo = false;
        // this.validateCard();
        break;
      case 'aod':
        this.showApprove = true;
        this.showReject = false;
        this.showSubmit = false;
        this.showInfo = false;
        this.hideTram = true;
        this.templatecard.splice(3, 1);
        // this.validateCard();
        break;
      case 'grbArchive':
        this.showClose = true;
        this.showApprove = false;
        this.showReject = false;
        this.showSubmit = false;
        this.showInfo = false;

    }
  }
  getParams() {
    this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
      this.formType = params.formName;
      this.tollName = params.tollName;
      this.activeTab = params.activeTab;
      this.requestType = params.requestType;
      this.identifyFormType(this.formType);
    });
    this.subscribeRoute.unsubscribe();

  }

  onSubmit() {
    let templateData = this.hiringFormService.getTemplateData();

    if (templateData['eob']) {
      templateData['eob'] = this.commonService.rectifyTimeStamp(new Date(templateData['eob'])).toString()
      //console.log(templateData['eob'])
    }
    if (templateData['goLiveDate']) {
      templateData['goLiveDate'] = this.commonService.rectifyTimeStamp(new Date(templateData['goLiveDate']))
    }
    //console.log(this.templateData)
    templateData['backfillEmployees'] = this.hiringFormService.getBackFillData();
    templateData['transferEmployees'] = this.hiringFormService.getOrpData();
    templateData['hiringAs'] = this.backFillDataFields.hiringAs;
    ////console.log('templateData:', templateData, this.backFillDataFields);
    if (this.backFillDataFields.hiringAs == "New Growth-CCN/PCR") {
      templateData['ccnPcrNumber'] = this.backFillDataFields.ccnNumber;
      templateData['ccnPcrMonth'] = this.backFillDataFields.month;
    }

    this.loadingText = "Submitting";

    ////////console.log('onSubmit');
    // this.hiringFormService.file$.subscribe(data => {
    //   ////////console.log('file:', data);
    //   this.storedFile = data;
    // });

    this.storedFile = this.hiringFormService.getUploadedFile();
    //////console.log('storedFile:', this.storedFile);
    ////////console.log('obj-length:', Object.keys(this.storedFile).length);


    // if (Object.keys(this.storedFile).length !== 0) {
    // this.spinner.show();
    // this.commonService.submitGRBWithAttachment(this.storedFile, templateData).subscribe((data: any) => {
    //   //////console.log('response-data', data);
    //   this.spinner.hide();
    //   this.openSnackBar(this.submitStatus);
    // });
    // } else {

    if (this.backFillDataFields.hiringAs === 'Swap') {
      this.postServiceUrl = environment.APPROVAL_CENTER_SWAP_GRB_SUBMIT_API + this.swapGRBNumber;
    }

    if (this.hiringAs.toLowerCase().includes('conversion') || this.hiringAs.toLowerCase().includes('subk')) {

      this.postServiceUrl = environment.SUBMIT_CONVERSION_REQUEST;
      ////console.log(this.postServiceUrl);
    }

    console.log('templateData: ',this.templateData);

    this.spinner.show();

    this.commonService.postServiceRequest(this.postServiceUrl, templateData).subscribe((data: any) => {
      this.submitStatus = data.value;
      this.spinner.hide();
      this.openSnackBar(this.submitStatus);
    });

    // }

  }

  openSnackBar(status: any) {

    if (status == 'SUCCESS') {
      //////console.log(localStorage.getItem('backFillData'))
      this.hiringFormService.nullifyTemplateData();
      this.notification.showSnackBar('Success...!!! Your form is submitted');
      setTimeout(() => {
        this.router.navigateByUrl('/main-menu');
      }, 500)
    } else {
      this.notification.showSnackBar('Failed...!!! Please re-submit the form');
    }
  }
  // nullifyTemplateData() {
  //   this.hiringFormService.setGRBDetails({});
  //   this.hiringFormService.setGOMDetails({});
  //   this.hiringFormService.setTemplateData({});
  //   this.hiringFormService.setGRBDetails({});
  //   this.hiringFormService.setGRBValid(false);
  //   this.hiringFormService.setGOMValid(false);
  //   this.hiringFormService.setDeptCode('')
  //   this.hiringFormService.setdept({});
  //   this.hiringFormService.setOrpData([]);
  //   this.hiringFormService.setBackFillData([]);
  //   localStorage.removeItem('backFillData');
  //   localStorage.removeItem('templateData');
  //   localStorage.removeItem('orpData');
  // }
  onUpdate() {
    let templateData = this.hiringFormService.getTemplateData();
    templateData['backfillEmployees'] = this.hiringFormService.getBackFillData();
    templateData['transferEmployees'] = this.hiringFormService.getOrpData();
    // templateData = { ...templateData, ...this.commonFieldsJSON };
    //templateData['hireType'] = 'INTERNAL';
    templateData['hireType'] = this.hireType;
    templateData['hiringAs'] = this.templateData['hiringAs'];

    this.loadingText = "Updating"
    this.spinner.show();
    console.log('templateData', templateData)
    this.commonService.putServiceRequest(environment.MODIFY_GRB, templateData).subscribe((data: any) => {
      this.submitStatus = data.status;
      this.spinner.hide();
      this.openSnackBar(this.submitStatus);

    })
    // this.nullifyTemplateData();
  }
  onClose() {
    this.router.navigateByUrl('/grb-archive');
  }


  commentsType: string;
  onApprove() {
    this.commentsType = 'Approved';
    this.loadingText = "Approving"
    this.openCommentsDialog();
  }
  onReject() {
    this.commentsType = 'Reject';
    this.loadingText = "Rejecting"
    this.openCommentsDialog();
  }

  onShowInfo() {
    this.commentsType = 'Moreinfo';
    this.loadingText = "Submitting"
    this.openCommentsDialog();
  }



  openCommentsDialog(): void {

    let templateData = this.hiringFormService.getTemplateData();
    templateData['backfillEmployees'] = this.hiringFormService.getBackFillData();
    templateData['transferEmployees'] = this.hiringFormService.getOrpData();
    // templateData = { ...templateData, ...this.commonFieldsJSON };
    //templateData['hireType'] = 'INTERNAL';
    if (templateData['eob']) {
      templateData['eob'] = this.commonService.rectifyTimeStamp(new Date(templateData['eob']))
    }
    if (templateData['goLiveDate']) {
      templateData['goLiveDate'] = this.commonService.rectifyTimeStamp(new Date(templateData['goLiveDate']));
    }
    console.log('mm:',templateData['totalQty']);
    
    const dialogRef = this.dialog.open(GrbTemplateCommentsComponent, {
      disableClose: true,
      // width: '56vh',
      data: {
        'commentsType': this.commentsType,
        'formType': this.formType,
        'metroNo': templateData['metro'],
        'tollName': this.tollName,
        'band': templateData['band'],
        'totalQty': templateData['totalQty'],
        'templateData': templateData,
        'activeTab': this.activeTab
      }
    });
    //this.nullifyTemplateData();
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  // stepper code merge
  getGRBandGOM() {

    this.hiringFormService.grbValid$.subscribe(bool => {
      this.isGRBFilled = bool;

      this.pickStepperStatus();
    });
    this.hiringFormService.gomValid$.subscribe(bool => {
      this.isGOMFilled = bool;
      this.pickStepperStatus();
    });
    this.hiringFormService.empValid$.subscribe(bool => {
      this.inCompleteBackfill = bool;
      this.activeEmpDetails = bool;
      if (this.backFillDataFields['hiringAs'])
        this.hiringAs = this.backFillDataFields['hiringAs'];

      if (this.hiringAs == "Subk-NewHire") {
        this.inCompleteBackfill = true;
      }
    })
    this.hiringFormService.tramValid$.subscribe(bool => {
      this.isTRAMFilled = bool;
      this.pickStepperStatus();
    });
  }

  pickStepperStatus() {
    if (this.formName === 'tolls' || this.formName === 'iot' || this.formName === 'bizops' || this.formName === 'board' ||
      this.formName === 'swap' || this.formName === 'edit-metro' || this.formName === 'aod' || this.formType === 'grbArchive') {
      this.inCompleteBackfill = true;

      if (this.isExternalGRB) {

        this.activeGRBDetails = true;

        this.backFillEmployeeData();
        this.activeGOMDetails = true;
        this.activeTRAMDetails = true;
        this.activePreview = true;
      } else if (this.isInternalGRB) {
        this.activeGRBDetails = true;
        this.backFillEmployeeData();
        this.activePreview = true;
      }
    } else {

      this.activeGRBDetails = this.isGRBFilled ? true : false;

      // this.activeEmpDetails = this.isEmployeeFilled ? true : false;
      this.backFillEmployeeData();
      if (this.isExternalGRB) {
        this.activeGOMDetails = this.isGOMFilled ? true : false;
        this.activeTRAMDetails = this.isTRAMFilled ? true : false;
        if (this.showGOM)
          this.activePreview = this.isGRBFilled && this.isGOMFilled && this.isTRAMFilled ? true : false;
        else
          this.activePreview = this.isGRBFilled && this.isTRAMFilled ? true : false;

      } else if (this.isInternalGRB) {
        this.activeGOMDetails = false;
        this.activeTRAMDetails = false;
        this.activePreview = this.isGRBFilled ? true : false;
      }

    }

  }

  backFillEmployeeData() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))
    }
    else {
      this.backFillData = this.hiringFormService.getBackFillData();
    }

    this.backFillDataFields = this.backFillData.length > 0 ? this.backFillData[0] : {};
    if (localStorage.getItem('orpData')) {
      this.orpData = JSON.parse(localStorage.getItem('orpData'))
    }
    else {
      this.orpData = this.hiringFormService.getOrpData();
    }

    // if (this.requestType == 'subk') {
    //   ////console.log(this.backFillData);
    //   this.backFillData.filter((res => {
    //     ////console.log('ced', res.ced);
    //     if (res.ced == '') { // is empty
    //       //this.inCompleteBackfill = true;
    //       this.activeEmpDetails = false;
    //     }

    //   }))
    //   // this.activeEmpDetails = false;
    // }
    // else if (this.requestType == 'conversion') {
    //   ////console.log(this.backFillData);
    //   this.backFillData.filter((res => {
    //     ////console.log('extensionPeriod', res.extensionPeriod);
    //     if (res.extensionPeriod == '') { // is empty
    //      // this.inCompleteBackfill = false;
    //       this.activeEmpDetails = false;
    //     }


    //   }))
    // }

    if (Object.keys(this.backFillDataFields).length === 0 && this.orpData.length === 0) {
      this.isEmployeeFilled = false;
    } else {
      this.hiringAs = this.backFillDataFields['hiringAs'];
      if (this.hiringAs)
        if (this.hiringAs.toLowerCase().includes('new growth') && this.hireType == 'external') {
          this.isEmployeeFilled = false;
        }
    }
    if (!(this.requestType == 'subk' || this.requestType == 'conversion'))
      this.activeEmpDetails = this.isEmployeeFilled;






  }



  getSvgPadding(value: any) {
    if (this.isInternalGRB) {
      switch (value) {
        case 'grb':
          return '125px';
        case 'employee':
          return '130px';
        case 'preview':
          return '125px';
      }
    } else if (this.isExternalGRB) {
      if (!this.activeEmpDetails) {
        switch (value) {
          case 'grb':
            return '125px';
          case 'gom':
            return '130px';
          case 'preview':
            return '125px';
        }
      } else {
        switch (value) {
          case 'grb':
            return '90px';
          case 'employee':
            return '96px';
          case 'gom':
            return '95px';
          case 'preview':
            return '88px';
        }
      }
    }
  }

  getIconPadding(value: any) {
    if (this.isInternalGRB) {
      switch (value) {
        case 'grb':
          return '98px';
        case 'employee':
          return '100px';
        case 'preview':
          return '100px';
      }
    } else if (this.isExternalGRB) {
      if (!this.activeEmpDetails) {
        switch (value) {
          case 'grb':
            return '95px';
          case 'gom':
            return '90px';
          case 'preview':
            return '100px';
        }
      } else {
        switch (value) {
          case 'grb':
            return '46px';
          case 'employee':
            return '52px';
          case 'gom':
            return '52px';
          case 'preview':
            return '50px';
        }
      }
    }
  }

  getIconLabelPadding(value: any) {
    if (this.isInternalGRB) {
      switch (value) {
        case 'grb':
          return '6px';
        case 'employee':
          return '0px';
        case 'preview':
          return '78px';
      }
    } else if (this.isExternalGRB) {
      if (!this.activeEmpDetails) {
        switch (value) {
          case 'grb':
            return '6px';
          case 'gom':
            return '0px';
          case 'preview':
            return '78px';
        }
      } else {
        switch (value) {
          case 'grb':
            return '6px';
          case 'employee':
            return '0px';
          case 'gom':
            return '0px';
          case 'preview':
            return '30px';
        }
      }
    }
  }


}
