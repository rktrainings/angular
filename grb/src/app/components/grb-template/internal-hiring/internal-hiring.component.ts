import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';

import { HiringFormService } from 'src/app/services/hiring-form.service';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';

import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { HiringFormGrbComponent } from '../hiring-form-grb/hiring-form-grb.component';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DashboardProperties } from 'src/assets/data/dashboard/dashboard-properties';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-internal-hiring',
  templateUrl: './internal-hiring.component.html',
  styleUrls: ['./internal-hiring.component.scss']
})
export class InternalHiringComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() private GRBfields = [];
  @Output() close = new EventEmitter<any>();
  @Input() childFormName = "GRB"
  private commonFieldsJSON = {
    metro: '',
    band: '',
    totalQty: 0
  }
  @Input() private backFillData = [];
  @Input() private orpData = [];
  @Input() private templateData = {};
  tollNames = ['CC', 'BM', 'UTE', 'ORP', 'SOC'];

  private metroDisable: boolean = false;
  private formValidate = {};
  private formFilled: boolean = false;
  private bands = ["C", "D", "10", "9", "8", "7", "6", "5", "4", "3"];
  private // bands = ["C", "D", "10.0", "9.0", "8.0", "7B", "7A", "7.0", "6B", "6A", "6.0",  "5.0", "4.0", "3.0",];
  private bandIndex = -1;
  private filterBands = this.bands;
  @ViewChild(HiringFormGrbComponent) private child: HiringFormGrbComponent;
  private bandType = "dropdown";
  private totalQuantity = "text";
  private backFillDataFields: any = {};
  private showSubmit = true;
  private showApprove = false;
  private showInfo = false;
  private showReject = false;
  private formType: string;
  private metroNo: string;
  private datamesg: any;
  metroText = "Please enter a valid metro number"
  private roles: any[];
  private requestType: string;
  private metroValid: boolean = true;
  private band: any;

  @Input() private postServiceUrl: string = "";

  private tollName: any;
  private submitStatus: string;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private showtableheader: boolean;
  private totalQty: any;
  private showUpdate: boolean = false;
  private disableTotalQty: boolean = false;
  private activeTab: any;
  private maxtotalQty: number;
  private templateKeys: any = [];
  private backFillDisable: boolean = false;
  private allowNext: any;
  private subscribeRoute: Subscription;
  grbSubscribe: Subscription;
  @ViewChild(HiringFormGrbComponent) private childGRB: HiringFormGrbComponent;
  showSave: boolean = true;
  showTolls: boolean = false;
  activeEmpDetails: boolean;
  empStatus: any;


  constructor(public hiringFormService: HiringFormService,
    private commonService: CommonService, private location: Location,
    private activatedRoute: ActivatedRoute, private dashboardService: DashboardService,
    private notification: NotificationService, private elementRef: ElementRef,
    private httpClient: HttpClient, private dialog: MatDialog) {


  }


  ngOnInit() {
    ////console.log("templateData-internal hiring", this.templateData)
    ////console.log(this.GRBfields);
    if (this.GRBfields.length == 0) {
      this.getJSON();
    } else {
      this.callMethods()
    }
    // this.findActivatedRoute()

  }

  ngAfterViewInit() {
    let path = this.location['_platformStrategy']._platformLocation.location.href;

    if (!path.includes('create-request')) {
      this.showTolls = true;
      setTimeout(() => {
        this.fetchMetroDetails(this.commonFieldsJSON.metro)
      }, 100);
    }
  }
  findActivatedRoute() {
    setTimeout(() => {
      let path = this.location['_platformStrategy']._platformLocation.location.href;
      ////console.log(path)
      if (path.toLowerCase().includes('edit-metro') || path.toLowerCase().includes('hiresubmit') || path.toLowerCase().includes('hireformview')) {
        this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
          this.formType = params.formName;
          //   if (this.formType == 'tolls' || this.formType === 'iot') {
          //     this.showSave = false;
          //   } else {
          //     this.showSave = true;
          //   }
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
  callMethods() {
    this.getParams();
    this.assignValues();
    this.updateTotalQty();
    this.getTemplateKeys();
    this.updateForm();
    this.disableFields();
    this.setValues();
    this.verifyMetro();
    setTimeout(() => {
      this.bandChange();
    }, 0)
    if (this.childFormName === 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
      this.updateBand()
    }
  }

  getGRB(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Edit/GRB-Details.json');
  }

  getJSON() {
    this.grbSubscribe = this.getGRB().subscribe((data: []) => {
      //////console.log(data)
      this.GRBfields = data.filter(e => e['field_identifier'] !== 'subBand')
      this.callMethods()
    });
    setTimeout(() => {
      this.grbSubscribe.unsubscribe()
    }, 10000)
  }

  getTemplateKeys() {
    setTimeout(() => {
      this.templateKeys = JSON.parse(localStorage.getItem('templateKeys'))
    })
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

  setValues() {
    let values = this.hiringFormService.getTemplateData();
    if (values['metro']) {
      this.commonFieldsJSON.metro = values['metro']
      this.verifyMetro();
    }
    if (values['band']) {
      this.commonFieldsJSON.band = values['band']
    }
    if (values['totalQty']) {
      this.commonFieldsJSON.totalQty = values['totalQty']
      this.hiringFormService.setQuantity(values['totalQty']);
    }
  }


  onSelect(name) {
    this.childFormName = name;
  }

  onPreview() {
    this.childFormName = 'Preview';

    // this.bandType = "text";
    this.bandType = "dropdown"

    // this.commonFieldsJSON.band = this.backFillDataFields.band;

    this.templateData = this.hiringFormService.getTemplateData();
    this.getJSON();
    setTimeout(() => {
      this.GRBfields.map((e, i) => {

        if (e.field_identifier == 'subBand') {
          this.GRBfields.splice(i, 1)
        }
        e['default'] = this.templateData[e['field_identifier']];
        if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
          e['field_type'] = "text"
        }

        if (this.templateData['hiringAs'])
          if (this.templateData['hiringAs'].toLowerCase().includes('backfill')) {
            if (e.field_identifier == 'slaPenalityPerMonth') {
              if (this.templateData['accountType'])
                if (this.templateData['accountType'].includes("FTE BASED") || this.templateData['accountType'].includes("TIME AND MATERIAL")) {
                  this.GRBfields.splice(i, 1)
                }
            }

            if (e.field_identifier == 'revenueLossPerMonth') {
              if (this.templateData['accountType'])
                if (this.templateData['accountType'].includes("FTE BASED") ||
                  this.templateData['accountType'].includes("TIME AND MATERIAL") ||
                  this.templateData['hiringAs'].toLowerCase() == 'New Growth-Move to Low Cost') {
                  this.GRBfields.splice(i, 1)
                }
            }
          }


        e['disabled'] = true;
      })
      if (this.formType)
        if (this.formType.includes('grbArchive')) {
          this.GRBfields.map(e => {
            e.required = false;
          })
        }
      this.updatefields();
    }, 0);

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
    if(JSON.parse(localStorage.getItem('empStatus'))){
      this.empStatus = JSON.parse(localStorage.getItem('empStatus'));
      if(this.empStatus == true){
        return false;
      } else {
        return true;
      }
    }
    // if (this.templateData)
    // if (this.templateData['hiringAs'].toLowerCase().includes('backfill')) {

    // if (this.hireType == 'internal') {
    //   if (JSON.parse(localStorage.getItem('checkedBackfill')) || JSON.parse(localStorage.getItem('checkedORP'))) {
    //   }
    // }

    const grbValid = this.hiringFormService.getGRBValid();
    if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {
      if (grbValid) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

  assignValues() {

    this.getBackFillData();
    this.checkBackfillDisplay();
    this.getOrpData()
    this.getTemplateData();

    this.hiringFormService.setHiringType('INTERNAL');



    //////console.log("fields", GRBDetails)
    this.setCommonFields();

  }

  setCommonFields() {
    if (this.backFillDataFields['hiringAs'])
      if (this.backFillDataFields['hiringAs'].toLowerCase().includes('backfill') ||
        this.backFillDataFields['hiringAs'].toLowerCase().includes('subk-extension') || this.backFillDataFields['hiringAs'].toLowerCase().includes('conversion')) {
        this.commonFieldsJSON.totalQty = this.backFillData.length;
      } else if (this.backFillDataFields['hiringAs'].toLowerCase().includes('new growth')) {
        this.commonFieldsJSON.totalQty = this.orpData.length;
      } else {
        this.commonFieldsJSON.totalQty = this.templateData['totalQty'];
      }

    if (this.formType == 'bizops' || this.formType == 'edit-metro') {
      this.hiringFormService.totalQty$.subscribe((data: number) => {
        if (data > 0)
          this.commonFieldsJSON.totalQty = data;
      })
    }

  }

  getTemplateData() {
    this.metroNo = this.templateData['metro'];
    this.commonFieldsJSON.metro = this.templateData['metro'];
    this.band = this.templateData['band'];
    this.totalQty = this.templateData['totalQty'];
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (this.templateData['deptCode'] && !path.includes('hiresubmit')) {
      this.backFillDataFields = this.templateData;
    }
    //////console.log('template-internal', this.templateData)
  }

  getBackFillData() {

    this.backFillDataFields = this.backFillData.length > 0 ? this.backFillData[0] : {};
    this.commonFieldsJSON.totalQty = this.backFillData.length > 0 ? this.backFillData.length : this.templateData['totalQty'];
    ////console.log('backfill-internal', this.backFillData)

  }

  getOrpData() {

  }

  getParams() {
    this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
      this.formType = params.formName;
      this.tollName = params.tollName;
      this.activeTab = params.activeTab;
    });

    this.subscribeRoute.unsubscribe();
  }



  disableFields() {
    if (this.formType) {
      this.metroDisable = true;
      if (this.formType == 'board' && parseInt(this.totalQty) > 0) {
        if (!localStorage.getItem('maxTotalQty')) {
          localStorage.setItem('maxTotalQty', JSON.stringify(Number(this.commonFieldsJSON.totalQty)))
        }
        this.maxtotalQty = JSON.parse(localStorage.getItem('maxTotalQty'));
        this.disableTotalQty = false
      } else {
        this.disableTotalQty = true;
      }
      this.metroValid = true;
    } else {
      this.metroDisable = false;
    }
  }

  updateForm() {

    setTimeout(() => {
      this.updateBand();
    }, 0)
    this.updatefields();
    this.updateTotalQty();
  }


  updateTotalQty() {
    if (this.backFillDataFields.hiringAs) {
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') ||
        this.backFillDataFields.hiringAs.toLowerCase().includes('subk-extension') || this.backFillDataFields.hiringAs.toLowerCase().includes('conversion')) {
        this.disableTotalQty = true;
        return this.backFillData.length;
      } else {
        this.disableTotalQty = true;
        return this.orpData.length;


      }
    } else {
      return this.orpData.length;


    }
  }

  checkBackfillDisplay() {
    if (this.templateData)
      if (this.templateData['hiringAs']) {
        this.backFillDataFields = this.templateData
      }
    if (this.backFillDataFields)
      if (this.backFillDataFields.hiringAs)
        if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill') ||
          this.backFillDataFields.hiringAs.toLowerCase().includes('subk-extension') || this.backFillDataFields.hiringAs.toLowerCase().includes('conversion'))
          this.backFillDisable = true;
  }
  bandDisable() {

    if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board') {
      // this.bandType = "text"
      return true
    } else {
      return false
    }

  }
  updateBand() {
    let index = -1;
    let currentBand = this.backFillDataFields.band;
    if (localStorage.getItem('band')) {
      if (localStorage.getItem('band') !== 'undefined')
        currentBand = JSON.parse(localStorage.getItem('band'));
    }
    this.filterBands = this.bands.filter((band, i) => {
      if (currentBand)
        if (band.includes(currentBand)) {
          index = i;
          this.bandIndex = i;
        }
      return (i >= index && index != -1)
    })
    if (this.backFillDataFields.hiringAs) {
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill')) {
        this.commonFieldsJSON.band = currentBand;
        this.bandType = "dropdown"
      } else {
        this.commonFieldsJSON.band = currentBand;
        // this.bandType = "text"
        this.bandType = "dropdown"

      }
    } else if (this.backFillDataFields.hiringReason) {
      if (this.backFillDataFields.hiringReason.toLowerCase().includes('backfill')) {
        this.commonFieldsJSON.band = this.backFillDataFields.band;
        this.bandType = "dropdown"
      } else {
        this.commonFieldsJSON.band = this.backFillDataFields.band;
        // this.bandType = "text";
        this.bandType = "dropdown"

      }
    } else {
      this.commonFieldsJSON.band = this.backFillDataFields.band;
      this.bandType = "dropdown"
    }
    if (this.formType == 'tolls' || this.childFormName == 'Preview' || this.formType === 'iot' || this.formType === 'board') {
      this.commonFieldsJSON.band = this.backFillDataFields.band;
      this.bandType = "text";
      // this.bandType = "dropdown"

    }

    if (this.templateData['band']) {
      this.commonFieldsJSON.band = this.templateData['band'];

    }

  }

  updatefields() {
    //////console.log(this.backFillDataFields)
    if (this.backFillDataFields.hiringAs)
      if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill')) {
        this.GRBfields.map((e, i) => {

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

        })
      }

      else {

        this.GRBfields.map((e, i) => {
          if (e.field_identifier == 'deptCode') {
            e['default'] = this.backFillDataFields.deptCode;
          }
          if (e.field_identifier == 'deptName') {
            e['default'] = this.backFillDataFields.deptName;
          }
          if (e.field_identifier == 'tcv') {

            if (this.backFillDataFields.hiringAs == "New Growth-CCN/PCR") {
              e['default'] = this.backFillDataFields.tcv;
              e['disabled'] = true
            }
            else if (this.backFillDataFields.hiringAs == "New Growth-New Transition") {
              e['default'] = "";
              e['fields_type'] = "text";
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
          }
        })


      }
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
    //   var fixedInput = currentInput.toString().replace(/[A-Za-z!@#$%^&*()]/g, '');
    //   if (fixedInput === "")
    //     $(this).val('');
    //   else {
    //     $(this).val(fixedInput);
    //   }
    // });

  }

  verifyMetro() {
    if (this.commonFieldsJSON.metro)
      this.commonFieldsJSON.metro = this.commonFieldsJSON.metro.replace(/\s/g, '')

    if (this.commonFieldsJSON.metro && this.childFormName !== 'Preview' && !this.metroDisable) {
      let metro = this.commonFieldsJSON.metro
      if (metro.length == 8) {
        this.metroValid = false;
        this.metroText = "Please wait..."
        this.commonService.getServiceRequest(environment.VERIFY_METRO + metro).subscribe((data: any) => {
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
      else
        this.metroValid = false;
      if (this.childGRB)
        this.childGRB.isValidMetro(this.metroValid, metro);
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

  keyUpMetro = this.debounce(this.verifyMetro, 300);

  bandChange() {
    let currentBand = this.commonFieldsJSON.band, index = -1;
    this.hiringFormService.setTemplateData(this.commonFieldsJSON)
    this.bands.forEach((band, i) => {
      if (band == currentBand) {
        index = i
      }
    })
    if (index > this.bandIndex) {
      this.updatefields();
      if (this.backFillData.length > 0)
        if (this.backFillDataFields.hiringAs)
          if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill')) {
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
            if (this.child)
              this.child.addField(obj, 3, currentBand);
          }
          else {
            if (this.child)
              this.child.addField(null, null, currentBand);
          }
    } else {
      this.updatefields();
      if (this.backFillData.length > 0)
        if (this.backFillDataFields.hiringAs)
          if (this.backFillDataFields.hiringAs.toLowerCase().includes('backfill')) {
            let obj = {
              "field_identifier": "deBandingRequest",
            }
            if (this.child)
              this.child.removeField(obj, 4, currentBand);
          }
          else {
            if (this.child)
              this.child.removeField(null, null, currentBand);
          }

    }
  }


  closeDialog() {
    this.close.emit();
  }


  qtyChange(event) {
    //console.log(event);
    if (this.formType === 'board')
      if (parseInt(event.target.value) > this.commonFieldsJSON.totalQty) {
        //console.log(this.commonFieldsJSON.totalQty);
        let max = parseInt(localStorage.getItem('maxTotalQty'));
        this.commonFieldsJSON.totalQty = max;
        // //console.log(this.elementRef.nativeElement);
        // //console.log(this.elementRef.nativeElement.children);
        this.elementRef.nativeElement.children[0].children[1].children[2].children[2].value = max;
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
    this.hiringFormService.setTemplateData({ 'hireType': 'INTERNAL' });
    if (this.formType !== 'tolls' && this.formType !== 'iot' && this.formType !== 'board') {
      if (this.showSave) {
        if (formName == 'GRB') {
          const valid = this.hiringFormService.getGRBValid();
          if (valid && this.metroValid && this.commonFieldsJSON.band && this.commonFieldsJSON.totalQty) {
            this.hiringFormService.setTemplateData(this.commonFieldsJSON)
            this.notification.showSnackBar(formName + ' Details Updated');
            this.allowNext = true;
          } else {
            this.notification.showSnackBar('Please update the required fields');
            this.allowNext = false;
          }
        }
      } else {
        this.allowNext = true;
      }
    } else {
      this.hiringFormService.setTemplateData(this.commonFieldsJSON)
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
