import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit, HostListener, OnDestroy, ElementRef } from '@angular/core';
import GRBDetails from 'src/assets/data/Hiring/Edit/GRB-Details.json';
import GOMDetails from 'src/assets/data/Hiring/Edit/GOM-Details.json';

import GRBDetailsView from 'src/assets/data/Hiring/View/GRB-Details.json';
import GOMDetailsView from 'src/assets/data/Hiring/View/GOM-Details.json';

import SubProcess from 'src/assets/data/Hiring/SubProcess.json';

import { FormGroup, FormBuilder } from '@angular/forms';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common-service.service';
import { MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { GrbTemplateCommentsComponent } from '../../approval-center/dialogs/grb-template-comments/grb-template-comments.component';
import { NotificationService } from 'src/app/services/notification.service';
import { HiringFormGrbComponent } from '../hiring-form-grb/hiring-form-grb.component';
import { HiringFormGomComponent } from '../hiring-form-gom/hiring-form-gom.component';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { template } from '@angular/core/src/render3';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { getJSON } from 'jquery';
import { debounce } from 'rxjs/operators';
import { DashboardProperties } from 'src/assets/data/dashboard/dashboard-properties';
import { DashboardService } from 'src/app/services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MetroDetails } from 'src/app/tsclasses/metro-details';
// import { GrbTemplateCommentsComponent } from '../approval-center/dialogs/grb-template-comments/grb-template-comments.component';
@Component({
  selector: 'app-external-hiring',
  templateUrl: './external-hiring.component.html',
  styleUrls: ['./external-hiring.component.scss'],
  host: { 'window:beforeunload': 'doSomething' }
})
export class ExternalHiringComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() private GRBfields = [];
  @Input() private GOMfields = [];
  @Input() private TRAMfields = [];

  @Input() templateCard = [];

  @Input() private backFillData = [];
  @Input() private orpData = [];
  @Input() private templateData = {};

  formName = "External Hiring";
  @Input() childFormName = "GRB"
  private formType: string;
  // commonFields = [];
  private commonHiringForm: FormGroup;
  private submitted: boolean;
  private disableTotalQty: boolean;
  commonFieldsJSON = {
    metro: '',
    band: '',
    totalQty: 0
  }
  private hiringDetails = {};
  private subProcess = SubProcess;
  // bands = ["C", "D", "10", "9", "8", "7B", "7A", "7", "6B", "6A", "6", "5G", "5", "4", "3",];
  private bands = ["C", "D", "10", "9", "8", "7", "6", "5", "4", "3"];

  private posting = {
    "3": "EARLY PROFESSIONALS",
    "4": "EARLY PROFESSIONALS",
    // "5G": "PROFESSIONALS",
    "5": "PROFESSIONALS",
    "7B": "PROFESSIONALS",
    "7A": "PROFESSIONALS",
    "7": "PROFESSIONALS",
    "6B": "PROFESSIONALS",
    "6A": "PROFESSIONALS",
    "6": "PROFESSIONALS",
    "9": "LEADERSHIP",
    "8": "LEADERSHIP",
    "C": "LEADERSHIP",
    "D": "LEADERSHIP",
    "10": "LEADERSHIP"
  }
  private requestType = {
    "3": "DELIVERY",
    "4": "DELIVERY",
    // "5G": "DELIVERY",
    "5": "DELIVERY",
    "7B": "DELIVERY",
    "7A": "DELIVERY",
    "7": "DELIVERY",
    "6B": "DELIVERY",
    "6A": "DELIVERY",
    "6": "DELIVERY",
    "9": "LEADERSHIP",
    "8": "LEADERSHIP",
    "C": "LEADERSHIP",
    "D": "LEADERSHIP",
    "10": "LEADERSHIP"
  }
  private bandIndex = -1;
  private filterBands = [];
  showSaveButton: boolean;
  // @ViewChild(HiringFormComponent) child: HiringFormComponent;
  @ViewChild(HiringFormGrbComponent) private childGRB: HiringFormGrbComponent;
  @ViewChild(HiringFormGomComponent) private childGOM: HiringFormGomComponent;

  private bandType = "";
  private backFillDataFields: any = {};
  private formValidate = {};
  private formFilled: boolean = false;
  private showSubmit = true;
  private showApprove = false;
  private showInfo = false;
  private showReject = false;
  private currentUrl = "";
  private roles: any[];
  private metroNo: string;
  private showMetro: boolean = false;
  private submitStatus: string;
  @Input() private postServiceUrl: any = "";
  private metroValid: boolean = true;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private tollName: any;
  private band: any;
  private totalQty: any;
  private showUpdate: boolean = false;
  private metroDisable: boolean = false;
  private totalQtyDisable = false;
  private commentsType: string;
  private hiringAs: string;
  private showBackfill: boolean;
  private activeTab: any;
  private maxtotalQty: number;
  @Output() private close = new EventEmitter<any>();
  private show: boolean = false;
  private templateKeys = []
  private browserRefresh: any;
  private allowNext: boolean;
  grbSubscribe: any;
  hireType: string;
  invokeInternal: boolean;
  invokeExt1: boolean;
  gomSubscribe: any;
  invokeExt2: boolean;
  invokeExternal: boolean;
  private subscribeRoute: Subscription;
  showSave: boolean = true;
  tramSubscribe: Subscription;
  marketDropdown: any;
  marketDropdownCalled: boolean = false;
  hideTram: boolean;
  showGOM: boolean = true;
  tollNames = ['CC', 'BM', 'UTE', 'ORP', 'SOC'];
  showTolls: boolean = false;
  metroText = "Please enter a valid metro number"
  empStatus: any;


  constructor(public hiringFormService: HiringFormService, private location: Location,
    private router: Router, private elementRef: ElementRef, private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog, private snackBar: MatSnackBar,
    private notification: NotificationService,
    private httpClient: HttpClient) {


  }
  getTemplateKeys() {
    this.templateKeys = JSON.parse(localStorage.getItem('templateKeys'))
    //console.log(this.templateKeys);
    if (this.templateKeys)
      if (!this.templateKeys.includes('GOM')) {
        this.showGOM = false;
      }

    setTimeout(() => {
      //console.log(this.templateKeys);

    }, 0);
  }

  ngOnInit() {
    // setTimeout(() => {
    //   let path = this.location['_platformStrategy']._platformLocation.location.href;
    //   if (path.includes('edit-metro')) {
    //     this.hiringFormService.setTemplateData(JSON.parse(localStorage.getItem('templateData')))
    //   }
    // }, 0)
    //////console.log(this.GRBfields);
    //console.log(this.backFillData);
    this.findActivatedRoute()
    this.assignValues();
    this.getCurrentURL();
    this.getParams();
    this.updateTotalQty();
    this.getTemplateKeys();

    this.updateForm();
    this.disableFields();
    this.verifyMetro();
    this.setValues();
    this.getConversion();
    setTimeout(() => {
      this.bandChange();
      let path = this.location['_platformStrategy']._platformLocation.location.href;
      if (path.includes('edit-metro')) {
        this.hiringFormService.setTemplateData(JSON.parse(localStorage.getItem('templateData')))
      }
    }, 0)

    this.getmarketDropdown().subscribe(data => {
      this.marketDropdown = data;

      if (this.templateData['geo'])
        if (this.templateData['iot'])
          if (this.templateData['market'])
            if (this.templateData['marketCountry']) {
              let geo = this.templateData['geo'];
              let iot = this.templateData['iot'];
              let market = this.templateData['market'];

              //console.log(this.marketDropdown[geo][iot][market]);
              if (this.marketDropdown)
                if (this.marketDropdown[geo])
                  if (this.marketDropdown[geo][iot])
                    if (this.marketDropdown[geo][iot][market])
                      localStorage.setItem('countries', JSON.stringify(this.marketDropdown[geo][iot][market]));
            }
      this.marketDropdownCalled = true
      //console.log("market", data);

    })
    // if (this.childFormName == 'Preview') {
    //   this.onPreview()
    // }
    ////console.log(this.backFillData, this.backFillDataFields)
  }

  getConversion() {
    if (this.backFillDataFields)
      if (this.backFillDataFields.hiringAs)
        if (this.backFillDataFields.hiringAs.toLowerCase() == 'conversion-non regular extension' || this.backFillDataFields.hiringAs.toLowerCase() == 'subk-regular' || this.backFillDataFields.hiringAs.toLowerCase() == 'subk-nonregular' || this.backFillDataFields.hiringAs.toLowerCase() == 'subk-extension') {

          this.showSaveButton = true;
        }

  }
  findActivatedRoute() {
    setTimeout(() => {
      let path = this.location['_platformStrategy']._platformLocation.location.href;
      ////console.log(path)
      if (path.toLowerCase().includes('edit-metro') || path.toLowerCase().includes('hiresubmit') || path.toLowerCase().includes('hireformview')) {
        this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
          this.formType = params.formName;
          //console.log(params.formName)
          if (this.formType == 'aod') {
            this.showBackfill = true
            this.templateData['totalQty'] = this.backFillData.length;
          }
          if (this.formType == 'tolls' || this.formType === 'iot') {
            this.showSave = false;
          } else {
            this.showSave = true;
          }

        });
        setTimeout(() => {
          this.subscribeRoute.unsubscribe();
        }, 100);
      }
    }, 0);

  }

  ngOnDestroy() {
    this.dialog.closeAll()
  }
  setValues() {
    let values = this.hiringFormService.getTemplateData();
    if (values['metro']) {
      this.commonFieldsJSON.metro = values['metro']
      this.verifyMetro();
    }
    if (values['band'])
      this.commonFieldsJSON.band = values['band']
    if (values['totalQty']) {
      this.commonFieldsJSON.totalQty = values['totalQty']
      this.hiringFormService.setQuantity(values['totalQty']);
    }
  }

  ngAfterViewInit() {
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (!path.includes('create-request')) {
      this.showTolls = true;
      setTimeout(() => {
        this.fetchMetroDetails(this.commonFieldsJSON.metro)
      }, 100);
    }
    // if (!path.includes('create-request'))
    // this.fetchMetroDetails(this.commonFieldsJSON.metro)
  }
  onNext() {

    this.saveAll(this.childFormName);
    if (this.allowNext) {
      let index = this.templateKeys.indexOf(this.childFormName);
      this.childFormName = this.templateKeys[index + 1];
    }
  }
  onBack() {
    let index = this.templateKeys.indexOf(this.childFormName);
    this.childFormName = this.templateKeys[index - 1];
  }
  onPreview() {
    this.childFormName = 'Preview';

    // this.bandType = "text";
    this.bandType = "text"

    // this.commonFieldsJSON.band = this.backFillDataFields.band;
    // this.GRBfields = [];
    // this.GOMfields = [];
    this.templateData = this.hiringFormService.getTemplateData();
    if (this.formType)
      if (this.formType == 'aod') {
        this.showBackfill = true;
        this.templateData['totalQty'] = this.backFillData.length;
      }
    this.getJSON();
    this.GRBfields.map((e, i) => {

      e['default'] = this.templateData[e['field_identifier']];
      if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
        e['field_type'] = "text"
      }
      if (e.field_type == 'upload') {
        e.field_type = 'span'
      }
      if (this.templateData['accountType'].includes("FTE BASED")
        || this.templateData['accountType'].includes("TIME AND MATERIAL")
        || this.templateData['hiringAs'].toLowerCase() == 'New Growth-Move to Low Cost') {
        if (e['field_identifier'] == 'slaPenalityPerMonth' || e['field_identifier'] == 'revenueLossPerMonth')
          this.GRBfields.splice(i, 1)
      }
      e['disabled'] = true;
    })
    //////console.log(this.GRBfields)
    this.GOMfields.map(e => {
      e['default'] = this.templateData[e['field_identifier']];
      if (e['field_type'] != "textarea") {
        e['field_type'] = "text"
      }
      e['disabled'] = true;
    })

    this.TRAMfields.map(e => {
      e['default'] = this.templateData[e['field_identifier']];
      if (e['field_type'] != "textarea" && e['field_type'] != "date") {
        e['field_type'] = "text"
      }
      e['disabled'] = true;
    })

    if (this.formType)
      if (this.formType.includes('grbArchive')) {
        this.GRBfields.map(e => {
          e.required = false;
        })
        this.GOMfields.map(e => {
          e.required = false;
        })
        this.TRAMfields.map(e => {
          e.required = false;
        })
      }
    this.updatefields();
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    console.log(path);
    setTimeout(() => {
      if (!path.includes('create-request')) {
        this.showTolls = true;
        this.fetchMetroDetails(this.commonFieldsJSON.metro)
      }
    }, 0);
  }
  previewDisable() {
    const grbValid = this.hiringFormService.getGRBValid();
    const gomValid = this.hiringFormService.getGOMValid();
    const tramValid = this.hiringFormService.getTRAMValid();
    //const empValid = this.hiringFormService.getEMPValid();
    ////console.log(grbValid)
    //////console.log(empValid)
    if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {

      if (!this.showSave) {
        return false;
      }
      if (!this.templateKeys.includes('gom')) {
        if (grbValid && tramValid) {
          return false;
        } else {

          return true;
        }
      } else {
        if (grbValid && gomValid && tramValid) {
          return false;
        }
        else {
          return true;
        }
      }

    } else {
      return false;
    }
  }
  closeDialog() {
    this.close.emit();
  }
  assignValues() {

    this.getBackFillData();
    this.getOrpData();
    this.getTemplateData()
    this.hiringFormService.setHiringType('EXTERNAL');
    this.hideOrShowBackFill()

    setTimeout(() => {
      this.setCommonFields();
    }, 0)
  }
  getmarketDropdown(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Market/marketDropdown.json');
  }
  getGRB(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Edit/GRB-Details.json');
  }
  getGOM(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Edit/GOM-Details.json');
  }
  getTRAM(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Edit/TRAM-Details.json');
  }
  getJSON() {
    if (this.GRBfields.length == 0) {
      this.grbSubscribe = this.getGRB().subscribe(data => {
        this.GRBfields = data
        let market =
        {

          "field_name": "Market",
          "field_type": "dropdown",
          "field_identifier": "market",
          "options": "",
          "default": "",
          "required": true,
          "disabled": false,
          "order": 3

        }
        let marketCountry =
        {

          "field_name": "Market Country",
          "field_type": "dropdown",
          "field_identifier": "marketCountry",
          "options": "",
          "default": this.templateData['marketCountry'] ? this.templateData['marketCountry'].toUpperCase() : "",
          "required": true,
          "disabled": false,
          "order": 3
        }


        let identifiers = this.GRBfields.map(e => e.field_identifier);
        let index = identifiers.indexOf('iot');
        this.GRBfields.splice(index + 1, 0, market)
        this.GRBfields.splice(index + 2, 0, marketCountry)
      });
    }
    if (this.GOMfields.length == 0) {
      this.gomSubscribe = this.getGOM().subscribe(data => {
        this.GOMfields = data
      });
    }
    if (this.TRAMfields.length == 0) {
      this.tramSubscribe = this.getTRAM().subscribe(data => {
        this.TRAMfields = data
      });
    }
    setTimeout(() => {
      this.grbSubscribe.unsubscribe()
      this.gomSubscribe.unsubscribe()
      this.tramSubscribe.unsubscribe()
    }, 10000);
  }

  hideOrShowBackFill() {

    this.hiringAs = this.backFillDataFields['hiringAs'];

    if (!this.hiringAs) {
      if (this.templateData['hiringAs']) {
        this.hiringAs = this.templateData['hiringAs']
      }
    }
    // this.formType = params.formName;
    //console.log(this.formType);

    if (this.formType)
      if (this.formType == 'aod') {
        this.showBackfill = true
      }

    if (this.hiringAs)
      if (this.hiringAs.toLowerCase().includes('new growth') || this.hiringAs.toLowerCase().includes('subk-newhire')) {
        this.showBackfill = false
      } else {
        this.showBackfill = true

      }
  }
  setCommonFields() {
    if (this.backFillDataFields['hiringAs'])
      if (this.formType !== 'board' && this.backFillDataFields['hiringAs'].toLowerCase().includes('backfill') || this.backFillDataFields['hiringAs'].toLowerCase().includes('swap') ||
        this.backFillDataFields['hiringAs'].toLowerCase().includes('subk') || this.backFillDataFields['hiringAs'].toLowerCase().includes('conversion')) {
        this.commonFieldsJSON.totalQty = this.backFillData.length;
      } else if (this.formType !== 'board' && this.backFillDataFields['hiringAs'].toLowerCase().includes('new growth')) {

        this.maxtotalQty = this.backFillDataFields.quantity;

        this.commonFieldsJSON.totalQty = this.orpData.length;
        this.hiringFormService.setBackFillData([]);
      } else {
        this.commonFieldsJSON.totalQty = this.templateData['totalQty'];
      }


    //console.log(this.formType);

    if (this.formType == 'aod') {
      this.showBackfill = true
      this.templateData['totalQty'] = this.backFillData.length;
    }
    this.commonFieldsJSON.metro = this.templateData['metro'];
    if (!this.commonFieldsJSON.totalQty || this.commonFieldsJSON.totalQty <= 0)
      this.commonFieldsJSON.totalQty = this.backFillData.length > 0 ? this.backFillData.length : this.templateData['totalQty'];

    if (this.formType == 'board' || this.formType == 'bizops' || this.formType == 'edit-metro') {
      this.hiringFormService.totalQty$.subscribe((data: number) => {
        if (data > 0)
          this.commonFieldsJSON.totalQty = data;
      })
    }

  }

  getBackFillData() {
    // if (localStorage.getItem('backFillData')) {
    //   this.backFillData = JSON.parse(localStorage.getItem('backFillData'))
    // }
    // else {
    //   this.backFillData = this.hiringFormService.getBackFillData();
    // }
    this.backFillDataFields = this.backFillData.length > 0 ? this.backFillData[0] : {};

  }

  getOrpData() {
    // if (localStorage.getItem('orpData')) {
    //   this.orpData = JSON.parse(localStorage.getItem('orpData'))
    // }
    // else {
    //   this.orpData = this.hiringFormService.getOrpData();
    // }
  }

  getTemplateData() {
    // this.templateData = this.hiringFormService.getTemplateData();
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (this.templateData['deptCode'] && !path.includes('hiresubmit')) {
      this.hiringFormService.setHiringAs(this.templateData['hiringAs']);
      this.backFillDataFields = this.templateData;
    }
    this.metroNo = this.templateData['metro'];
    this.band = this.templateData['band'];
    this.totalQty = this.templateData['totalQty'];
  }
  getCurrentURL() {
    this.router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url) {
          if (_.url.indexOf('?') >= -1) {
            this.currentUrl = _.url.split('?')[0];

          } else {
            this.currentUrl = _.url;
          }
        }
      }
    );
  }
  getParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.formType = params.formName;
      this.tollName = params.tollName;
      this.activeTab = params.activeTab;
      // this.requestType = params.requestType;
      if (this.formType == 'aod') {
        this.hideTram = true;
      }

    });
  }
  disableFields() {
    if (this.formType) {
      this.metroDisable = true;
      this.metroValid = true;

      if (this.formType == 'board' && parseInt(this.totalQty) > 0) {
        if (!localStorage.getItem('maxTotalQty')) {
          //console.log(this.templateData);

          localStorage.setItem('maxTotalQty', JSON.stringify(Number(this.templateData['totalQty'])))
        }
        this.maxtotalQty = JSON.parse(localStorage.getItem('maxTotalQty'));
        if (this.hiringAs.toLowerCase().includes('new growth')){
          this.disableTotalQty = false;
        } else {
          this.disableTotalQty = true;
        }
      } else if (this.formType == 'iot' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {

        if (this.hiringAs)
          if ((this.hiringAs.toLowerCase().includes('new growth') || this.hiringAs.toLowerCase().includes('subk-newhire')) && this.formType != 'aod') {
            this.disableTotalQty = false;
          } else if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap') || this.formType == 'aod' ||
            this.backFillDataFields.hiringAs.toLowerCase().includes('subk-nonregular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-regular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-extension')) {
            this.disableTotalQty = true;
          }
      } else {
        this.disableTotalQty = true;
      }
    } else {
      this.metroDisable = false;
    }
  }

  updateForm() {
    this.updateBand();
    this.updatefields();
    this.updateTotalQty();
  }

  updateTotalQty() {

    if (this.backFillDataFields.hiringAs) {
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap') ||
        this.backFillDataFields.hiringAs.toLowerCase().includes('subk-nonregular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-regular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-extension') || this.backFillDataFields.hiringAs.toLowerCase().includes('conversion')) {
        this.disableTotalQty = true;
        return this.backFillData.length;
      } else {
        return this.orpData.length;
      }
    } else {
      return this.orpData.length;
    }
  }
  updateBand() {
    let index = -1;
    let backFillband = "";
    if (this.backFillDataFields.band)
      backFillband = this.backFillDataFields.band.split('.')[0];
    if (localStorage.getItem('band')) {
      if (localStorage.getItem('band') !== 'undefined')
        backFillband = JSON.parse(localStorage.getItem('band'));
    }
    if (this.backFillDataFields.hiringAs)
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('subk') || this.backFillDataFields.hiringAs.toLowerCase().includes('conversion')) {
        this.filterBands = this.bands;
      } else {
        this.filterBands = this.bands.filter((band, i) => {
          if (band == backFillband) {
            index = i;
            this.bandIndex = i;
          }
          return (i >= index && index != -1)
        })

      }

    if (this.backFillDataFields.hiringAs) {
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap') ||
        this.backFillDataFields.hiringAs.toLowerCase().includes('subk-nonregular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-regular') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-extension') || this.backFillDataFields['hiringAs'].toLowerCase().includes('conversion')) {
        this.commonFieldsJSON.band = backFillband;
        this.bandType = "dropdown"
      } else {
        this.commonFieldsJSON.band = this.backFillDataFields.band;
        // this.bandType = "text";
        this.bandType = "dropdown"

      }
      if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
        // this.bandType = "text";
        this.bandType = "dropdown"

        this.commonFieldsJSON.band = this.backFillDataFields.band;
      }
    } else {
      this.commonFieldsJSON.band = this.backFillDataFields.band;
      this.bandType = "dropdown";
    }

    if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
      this.bandType = "text";
      // this.bandType = "dropdown"
      this.commonFieldsJSON.band = this.backFillDataFields.band;
    }
  }

  bandDisable() {
    // console.log('childFormName',this.childFormName);

    if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
      return true
    } else {
      return false
    }

  }
  updatefields() {
    if (this.backFillDataFields.hiringAs)
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap') || this.backFillDataFields.hiringAs.toLowerCase().includes('subk-newhire')) {
        this.GRBfields.map((e, i) => {
          if (e.field_identifier == 'subBand') {
            if (this.commonFieldsJSON['band'])
              if (this.commonFieldsJSON['band'].includes('5') || this.commonFieldsJSON['band'].includes('6') || this.commonFieldsJSON['band'].includes('7')) {
                e['disabled'] = false;
              }
          }
          if (e.field_identifier == 'deptCode') {
            e['default'] = this.backFillDataFields.deptCode;
          }
          if (e.field_identifier == 'deptName') {
            e['default'] = this.backFillDataFields.deptName;
          }

          if (e.field_identifier == 'tcv') {
            this.GRBfields.splice(i, 1);
          }

          if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
            e['disabled'] = true;
            if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
              e['field_type'] = "text"
            }
            if (e.field_type == 'upload') {
              e.field_type = 'span'
            }
          }

          // if(this.template)
        })

      } else {
        this.GRBfields.map((e, i) => {
          if (e.field_identifier == 'deptCode') {
            e['default'] = this.backFillDataFields.deptCode;
          }
          if (e.field_identifier == 'deptName') {
            e['default'] = this.backFillDataFields.deptName;
          }
          if (e.field_identifier == 'subBand') {
            if (this.commonFieldsJSON['band'])
              if (this.commonFieldsJSON['band'].includes('5') || this.commonFieldsJSON['band'].includes('6') || this.commonFieldsJSON['band'].includes('7')) {
                e['disabled'] = false;
              }
          }
          if (e.field_identifier == 'tcv') {
            if (this.backFillDataFields.hiringAs == "New Growth-CCN/PCR") {
              e['default'] = this.backFillDataFields.tcv;
              e['disabled'] = true;
            }
            else if (this.backFillDataFields.hiringAs == "New Growth-New Transition") {
              e['default'] = "";
              e['field_type'] = "text";
              e['disabled'] = false;
            } else {
              this.GRBfields.splice(i, 1);
            }
          }
          if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
            e['disabled'] = true;
            if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
              e['field_type'] = "text"
            }
            if (e.field_type == 'upload') {
              e.field_type = 'span'
            }
          }
        })

      }

    this.GOMfields.map(e => {
      if (e.field_identifier == 'posting') {
        if (this.commonFieldsJSON['band'])
          e['default'] = this.posting[this.commonFieldsJSON['band'].toString()];
      }
      if (e.field_identifier == 'requestType') {
        e['default'] = this.requestType[this.commonFieldsJSON['band']];
        e['options'] = ['DOMESTIC'];
        e['options'].push(this.requestType[this.commonFieldsJSON['band']])
      }

      if (e.field_identifier == 'idType') {
        if (this.commonFieldsJSON['band'])
          if (this.commonFieldsJSON['band'].includes('3') || this.commonFieldsJSON['band'].includes('4') || this.commonFieldsJSON['band'].includes('5')) {
            e['default'] = "BCO";
          }
          else {
            e['default'] = "SCO";
          }
      }
      if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
        e['disabled'] = true;
        if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
          e['field_type'] = "text"
        }
        if (e.field_type == 'upload') {
          e.field_type = 'span'
        }
      }
    })




    this.TRAMfields.map(e => {
      if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
        e['disabled'] = true;
        if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
          e['field_type'] = "text"
        }
      }
    })

  }


  check() {
    if (this.commonFieldsJSON.metro)
      this.commonFieldsJSON.metro = this.commonFieldsJSON.metro.replace(/\s/g, '')

    this.hiringFormService.setTemplateData(this.commonFieldsJSON)
    this.hiringFormService.setQuantity(this.commonFieldsJSON.totalQty)

    if (this.formType == 'board' && parseInt(this.totalQty) > 0) {
      if (this.commonFieldsJSON.totalQty > this.maxtotalQty) {
        this.commonFieldsJSON.totalQty = this.maxtotalQty;
      }
      this.hiringFormService.setQuantity(this.commonFieldsJSON.totalQty)
    }
    // $('.number').on('change, keyup', function () {
    //   var currentInput = $(this).val();

    //   // var fixedInput = currentInput.toString().replace(/[A-Za-z!@#$%^&*()]/g, '');
    //   // if (fixedInput == "")
    //   //   $(this).val('');
    //   // else {
    //     $(this).val(currentInput)
    //   // }
    // });


  }
  qtyChange(event) {
    //console.log(event);
    if (this.formType === 'board')
      if (parseInt(event.target.value) > this.commonFieldsJSON.totalQty) {
        let max = parseInt(localStorage.getItem('maxTotalQty'));
        this.commonFieldsJSON.totalQty = max;
        this.elementRef.nativeElement.children[0].children[1].children[2].children[2].value = max;
      } else {
        this.commonFieldsJSON.totalQty = event.target.value;
      }

  }
  verifyMetro() {
    if (this.commonFieldsJSON.metro)
      this.commonFieldsJSON.metro = this.commonFieldsJSON.metro.replace(/\s/g, '')

    if (this.commonFieldsJSON.metro && this.childFormName !== 'Preview' && !this.metroDisable && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board')) {
      let metro = this.commonFieldsJSON.metro.toString();
      if (metro.length == 8) {
        this.metroValid = false;
        let newURL = ""
        this.metroText = "Please wait..."
        if (this.backFillDataFields.hiringAs) {
          if (this.backFillDataFields.hiringAs.toLowerCase().includes('subk')) {
            newURL = environment.VERIFY_METRO_SUBK;
          }
          else {
            newURL = environment.VERIFY_METRO;
          }
        } else {
          newURL = environment.VERIFY_METRO;
        }
        this.commonService.getServiceRequest(newURL + metro).subscribe((data: any) => {
          if (data.value == 'NO') {
            this.metroValid = true;
            this.hiringFormService.setTemplateData(this.commonFieldsJSON);
            if (this.childGRB)
              this.childGRB.isValidMetro(this.metroValid, metro);
          }
          else {
            this.notification.showSnackBar('Metro # already used / submitted');
            this.metroValid = false;
            if (this.childGRB)
              this.childGRB.isValidMetro(this.metroValid, metro);
          }
          this.metroText = "Please enter a valid metro number"

        })
      }
      else {
        this.metroValid = false;
        if (this.childGRB)
          this.childGRB.isValidMetro(this.metroValid, metro);
      }
    }
  }
  // debouncing
  debounce = function (fn, d) {

    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, d)
    }
  }

  keyUpMetro = this.debounce(this.verifyMetro, 1000);


  bandChange() {
    let currentBand = this.commonFieldsJSON.band, index = -1;
    this.hiringFormService.setTemplateData({ band: this.commonFieldsJSON.band });
    this.bands.forEach((band, i) => {
      if (band == currentBand) {
        index = i
      }
    })
    if (index > this.bandIndex) {
      this.updatefields();
      if (this.backFillData.length > 0)
        if (this.backFillDataFields.hiringAs)
          if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap')) {
            let obj = {
              "field_name": "Debanding Request",
              "field_type": "dropdown",
              "field_identifier": "deBandingRequest",
              "options": ["YES", "NO"],
              "default": "",
              "required": true,
              "disabled": false,
              "order": 21
            }
            if (this.childGRB) {
              this.childGRB.addField(obj, 3, currentBand);
            }
          }
          else {
            //   let obj = {
            //     "field_name": "New growth",
            //     "field_type": "date",
            //     "field_identifier": "goLivedate",
            //     "options": "",
            //     "default": "",
            //     "required": true,
            //     "disabled": false,
            //     "order": 21
            //   }
            if (this.childGRB) {
              this.childGRB.addField(null, null, currentBand);
            }
          }
      if (this.childGOM) {
        this.childGOM.updateGOM(currentBand);
      }
    } else {
      this.updatefields();
      if (this.childGOM) {
        this.childGOM.updateGOM(currentBand);
      }
      if (this.backFillData.length > 0)
        if (this.backFillDataFields.hiringAs)
          if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') || this.backFillDataFields.hiringAs.toLowerCase().includes('swap')) {
            let obj = {
              "field_identifier": "deBandingRequest",
            }
            if (this.childGRB) {
              this.childGRB.removeField(obj, 4, currentBand);
            }
          }
          else {
            // let obj = {
            //   "field_identifier": "goLivedate",
            // }
            if (this.childGRB) {
              this.childGRB.removeField(null, null, currentBand);
            }
          }

    }


  }


  validate(json) {
    this.formValidate = Object.assign(this.formValidate, json);
    let grb: boolean = this.formValidate['GRB Details'] ? this.formValidate['GRB Details'] : false;
    let gom: boolean = this.formValidate['GOM Details'] ? this.formValidate['GOM Details'] : false;

    if (grb && gom && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
      this.formFilled = true
    }
  }
  saveAll(formName) {
    this.hiringFormService.setTemplateData({ 'hireType': 'EXTERNAL' });
    console.log(this.showSave);
    console.log(formName);


    if (this.showSave) {
      if (formName == 'GRB') {
        const valid = this.hiringFormService.getGRBValid();
        console.log("valid", valid);
        ////console.log(this.commonFieldsJSON.metro);
        ////console.log(this.commonFieldsJSON.band);
        ////console.log(this.commonFieldsJSON.totalQty)
        if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {
          if (valid && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
            this.hiringFormService.setTemplateData(this.commonFieldsJSON)
            this.notification.showSnackBar(formName + ' Details Updated');
            this.allowNext = true;
          } else {
            this.notification.showSnackBar('Please update the required fields');
            this.allowNext = false;

          }
        } else {
          this.hiringFormService.setTemplateData(this.commonFieldsJSON)
          this.allowNext = true;

        }
      }
      else if (formName == 'GOM') {
        const valid = this.hiringFormService.getGOMValid()
        if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {
          if (valid && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
            this.notification.showSnackBar(formName + ' Details Updated');
            this.allowNext = true;

          } else {
            this.notification.showSnackBar('Please update the required fields');
            this.allowNext = false;

          }
        } else {
          this.allowNext = true;
        }
      } else if (formName == 'TRAM') {
        const valid = this.hiringFormService.getTRAMValid()
        if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {
          if (valid && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
            this.notification.showSnackBar(formName + ' Details Updated');
            this.allowNext = true;

          } else {
            this.notification.showSnackBar('Please update the required fields');
            this.allowNext = false;

          }
        } else {
          this.allowNext = true;
        }
      }

      else if (formName == 'EMP') {
        let valid = this.hiringFormService.getEMPValid()
        this.hiringFormService.empValid$.subscribe(data => {
          valid = data
        })
        console.log(valid, this.metroValid, this.commonFieldsJSON.band, this.commonFieldsJSON.totalQty)
        if (this.formType !== 'tolls' && this.formType !== 'iot') {
          if (valid && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
            this.notification.showSnackBar(formName + ' Details Updated');
            this.allowNext = true;

          } else {
            this.notification.showSnackBar('Please update the required fields');
            this.allowNext = false;

          }
        } else {
          this.allowNext = true;
        }
      }
    } else {
      this.allowNext = true;
    }
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
  fetchMetroDetails(metroNo: string) {
    this.dashboardService.toll$.subscribe(data => {
      console.log(data);
      if (data.length > 0)
        this.tollIconsColorStatus(data)

    })
  }
  tollIconsColorStatus(tollDetails) {

    tollDetails.map((toll => {


      if (toll.name === 'bandmix_STATUS' && document.getElementById("bandmix"))
        if (toll.name === 'bandmix_STATUS' && toll.value === 'REVIEWED') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'MORE_INFORMATION') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'bandmix_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("bandmix").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      if (toll.name === 'costcase_STATUS' && document.getElementById("costcase"))
        if (toll.name === 'costcase_STATUS' && toll.value === 'REVIEWED') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'MORE_INFORMATION') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'costcase_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("costcase").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      if (toll.name === 'orp_STATUS' && document.getElementById("orp"))
        if (toll.name === 'orp_STATUS' && toll.value === 'REVIEWED') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'MORE_INFORMATION') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'orp_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("orp").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
      if (toll.name === 'ute_STATUS' && document.getElementById("ute"))
        if (toll.name === 'ute_STATUS' && toll.value === 'REVIEWED') {
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_GREEN;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'NOT_REVIEWED') {
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_RED;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'MORE_INFORMATION') {
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_ORANGE;
        } else if (toll.name === 'ute_STATUS' && toll.value === 'RESUBMIT') {
          document.getElementById("ute").style.color = DashboardProperties.Toll_COLOR_PURPLE;
        }
    }));

  }
}
