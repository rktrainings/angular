import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import Internal_Hire from 'src/assets/data/Hiring/Internal_Hire.json';
// import Common from 'src/assets/data/Hiring/Common.json';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import SubProcess from 'src/assets/data/Hiring/SubProcess.json';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { FileUploadComponent } from '../dialogs/file-upload/file-upload.component';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hiring-form-grb',
  templateUrl: './hiring-form-grb.component.html',
  styleUrls: ['./hiring-form-grb.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class HiringFormGrbComponent implements OnInit {

  private subProcess = SubProcess;
  subscription: Subscription;
  minDate = new Date();
  hiringForm: FormGroup;
  private hiringFormJSON = {};
  @Input() fields = [];
  @Input() marketDropdown = {}
  private submitted: boolean = false;
  private formData = {};
  @Input() formName: string
  private count: number = 1000;
  @Output() submitForm = new EventEmitter<boolean>();
  @Output() updateChildFormName = new EventEmitter<any>();
  @Output() bandChange = new EventEmitter<any>();
  private band = "";
  private jobTitle: any = {
    "3": ["PRACTITIONER"],
    "4": ["PRACTITIONER"],
    "5": ["ANALYST"],
    // "5G": ["ANALYST"],
    "6": ["ASSISTANT/DEPUTY MANAGER", "BUSINESS SPECIALIST", "CAMPAIGN SPECIALIST", "DATA ANALYST", "DATA MINER", "DATA SPECIALIST"],
    "6A": ["ASSISTANT/DEPUTY MANAGER", "BUSINESS SPECIALIST", "CMPAIGN SPECIALIST", "DATA ANALYST", "DATA MINER", "DATA SPECIALIST"],
    "6B": ["ASSISTANT/DEPUTY MANAGER", "BUSINESS SPECIALIST", "CAMPAIGN SPECIALIST", "DATA ANALYST", "DATA MINER", "DATA SPECIALIST"],
    "7": ["PROJECT MANAGER"],
    "7A": ["PROJECT MANAGER"],
    "7B": ["PROJECT MANAGER"],
    "8": ["PROJECT MANAGER", "DEPUTY GROUP MANAGER"],
    "9": ["PROJECT MANAGER", "GROUP MANAGER"],
    "10": ["PROJECT MANAGER", "EXECUTIVE"],
    "C": ["EXECUTIVE"],
    "D": ["EXECUTIVE"]
  }
  private formValidate = {};
  @ViewChild('myPond') myPond: any;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here',
    allowFileTypeValidation: false
  }
  @Input() private backFillData: any;
  private templateData = {}
  private disableHiringReason: boolean = false;
  private formType: any;
  @Output() validate = new EventEmitter<any>();
  private currentBand: any;
  @Input() private childFormName = ""
  private hireType: any;
  private transferData: any;
  private totalCCValue: number;

  private fileName: any = "";
  private role: any;
  private contractType: any;
  private hideFileAction: boolean;
  private showRemoveButton: boolean;
  private storedFile: any;
  private subscribeRoute: Subscription;
  showUpload: boolean = false;
  showUploadSpan: boolean;
  private submitStatus: string;
  metroNo: string;
  metroValid: any;
  metroNoModified: boolean = false;
  // disableFileUpload: boolean = true;
  firstMetroNo: any;
  secondMetroNo: any;
  geoName: any;
  uploadMandatory: boolean;
  path: any = "";
  lwdText: string = 'LWD';
  tedText: string = 'TED';
  requestType: any;
  fileUploaded: boolean = true;
  invalidMgrID: boolean = true;
  geographyJson: any = {};



  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, public dialog: MatDialog, public hiringFormService: HiringFormService, public commonService: CommonService, private activatedRoute: ActivatedRoute,
    private approvalCenterService: ApprovalCenterService, private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private router: Router, private location: Location) {




  }
  ngOnInit() {
    ////console.log(this.marketDropdown);

    // setTimeout(() => {
    //   if (this.path.includes('edit-metro')) {
    //     this.hiringFormService.setTemplateData(JSON.parse(localStorage.getItem('templateData')));
    //     this.templateData=JSON.parse(localStorage.getItem('templateData')
    //   }
    // }, 0)

    // if (this.path.includes('create-request')) {
    //   this.showUpload = true;
    //   this.showUploadSpan = false;
    //   if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'bizops') {
    //     this.showUpload = false;
    //     this.showUploadSpan = true;

    //   }

    // }

    this.path = this.location['_platformStrategy']._platformLocation.location.href;
    console.log(this.path);

    if (this.path.toLowerCase().includes('edit-metro') ||
      this.path.toLowerCase().includes('hiresubmit') ||
      this.path.toLowerCase().includes('hireformview')) {
      setTimeout(() => {
        this.bandChange.emit();
      }, 0)
      this.assignValues()
      this.findActivatedRoute()
      this.removeDuplicates()
      this.hiringForm = this.createControl();

      if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
        this.disableHiringReason = true;
      }
      this.getDeptDetails()
      this.setValues();

      setTimeout(() => {
        this.updateJobTitle_SubBand();
      }, 0)
    }

    this.getGeographyData().subscribe(data => {
      this.geographyJson = data
    })

  }

  getGeographyData(): Observable<any> {
    return this.httpClient.get('assets/data/Hiring/Market/geography.json');
  }
  getDeptDetails() {
    if (this.path.toLowerCase().includes('edit-metro') || this.path.toLowerCase().includes('hiresubmit') || this.path.toLowerCase().includes('hireformview')) {
      // this.spinner.show()
      this.subscription = this.hiringFormService.dept$.subscribe(data => {
        this.geoName = data['iot'];
        //////console.log('geoName', this.geoName);

        if (this.geoName === 'EUROPE' || this.geoName === 'europe' || this.geoName === 'EMEA' || this.geoName === 'emea') {
          if (this.path.includes('create-request')) {


            this.uploadMandatory = true;
            this.showUpload = true;
            this.fileUploaded = false;
            this.showUploadSpan = false;

            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'bizops' || this.formType === 'aod' || this.formType === 'grbArchive') {
              this.showUpload = false;
              this.showUploadSpan = true;

            }

          }
        }
        if (this.backFillData.hiringAs)
          if (this.backFillData.hiringAs.toLowerCase().includes('new growth')) {


            if (this.path.includes('create-request')) {
              this.showUpload = true;
              this.uploadMandatory = true;
              this.fileUploaded = false;
              this.showUploadSpan = false;
              if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'bizops' || this.formType === 'aod' || this.formType === 'grbArchive') {
                this.showUpload = false;
                this.showUploadSpan = true;

              }

            }
            // this.showUploadSpan = true;

          }

        // if (data['deptCode']) {
      
        // }
        delete data['tower']
        delete data['subProcess']
        this.updateDefaultFields(data);
        // this.spinner.hide()
      })
      setTimeout(() => {
        this.subscription.unsubscribe();
      }, 10000);
    }
    else {
      // this.hiringFormService.nullifyTemplateData();
      this.subscription.unsubscribe();

    }
  }
  removeDuplicates() {
    this.fields = this.fields.reduce((unique, o) => {
      if (!unique.some(obj => obj.field_name === o.field_name)) {
        unique.push(o);
      }
      return unique;
    }, []);
  }
  assignValues() {

    this.getBackFillData();
    this.getOrpData();
    this.getTemplateData();

  }

  getBackFillData() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))

    }
    else {
      this.backFillData = this.hiringFormService.getBackFillData();

    }
    this.backFillData = this.backFillData.length > 0 ? this.backFillData[0] : {};


    if (this.backFillData['band']) {
      this.band = this.backFillData['band'];
    }
  }

  getOrpData() {
    if (localStorage.getItem('orpData')) {
      this.transferData = JSON.parse(localStorage.getItem('orpData'))
    }
    else {
      this.transferData = this.hiringFormService.getOrpData();
    }
  }

  getTemplateData() {
    //     this.hiringFormService.setTemplateData(JSON.parse(localStorage.getItem('templateData')));
    if (localStorage.getItem('templateData')) {
      this.templateData = JSON.parse(localStorage.getItem('templateData'));

    } else {
      this.templateData = this.hiringFormService.getTemplateData();

    }
    //////console.log(this.templateData);

    if (this.templateData['upload']) {
      this.fileName = this.templateData['upload'];
      this.hideFileAction = true;
    }
    if (this.templateData['deptCode']) {
      this.backFillData = this.templateData;
    }
    if (this.templateData['band']) {
      this.band = this.templateData['band'];
    }
    if (this.templateData['metro']) {
      this.metroValid = true;
    }
  }
  findActivatedRoute() {
    if (this.path.toLowerCase().includes('edit-metro') || this.path.toLowerCase().includes('hiresubmit') || this.path.toLowerCase().includes('hireformview')) {
      this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
        this.requestType = params.requestType;
        //////console.log('requestType', this.requestType);

        this.formType = params.formName;
        if (params.formName) {
          if (params.formName == 'bizops' || params.formName == 'edit-metro' || params.formType == 'swap' || this.formType === 'aod')
            this.disableHiringReason = false;
          else
            this.disableHiringReason = true;
        }

        if (params.hireType) {
          this.hireType = params.hireType;
          this.hiringFormService.setTemplateData({ 'hireType': this.hireType.toUpperCase() });
          if (this.hireType == 'internal' && (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {
            this.fields = this.fields.filter(e => e.field_identifier !== 'subBand')
          }
        }
      });
      setTimeout(() => {
        this.subscribeRoute.unsubscribe();
      }, 100);
    }
  }


  setValues() {
    let values = this.hiringFormService.getGRBDetails();
    ////////console.log("grb", values);
    if (this.backFillData['hiringAs'])
      if (this.backFillData['hiringAs'].toLowerCase().includes('new growth')) {
        this.addGoLiveDate();
      }
      else {
        let obj = {
          "field_identifier": "goLiveDate",
        }
        const fields = this.fields.map((a) => a.field_identifier);
        if (fields.includes("goLiveDate"))
          this.removeField(obj, 4, this.band);
      }

    if (values['debandingRequest']) {
      this.addDebandingRequest();
    }
    ////////console.log(this.hiringForm)
    if (localStorage.getItem('templateData')) {
      values = JSON.parse(localStorage.getItem('templateData'));
    }
    Object.keys(values).forEach(e => {
      if (this.hiringForm.controls[e]) {
        this.hiringForm.controls[e].setValue(values[e])
        this.saveData(e, values[e]);
        // if (this.childFormName !== 'Preview')
      }
    })
    ////////console.log(values);
    ////////console.log(this.templateData)
    if (values['upload'])
      if (values['upload'].length > 0) {
        let tempFile = this.hiringFormService.getUploadedFile();
        // this.storedFile = tempFile;
        this.fileName = tempFile;
        this.hideFileAction = true;
      }
  }

  addDebandingRequest() {
    let obj = {
      "field_name": "Debanding Request",
      "field_type": "dropdown",
      "field_identifier": "deBandingRequest",
      "options": ["Yes", "No"],
      "default": "",
      "required": true,
      "disabled": false,
      "order": 21
    }
    this.addField(obj, 3, this.band);
  }
  onNext() {
    this.updateChildFormName.emit('GOM')
  }
  createControl() {

    const group = this.formBuilder.group({});
    let control;
    let defaultVal;
    this.fields.forEach(field => {

      if (field.required) {
        defaultVal = (field.field_identifier == 'tcv' && field.default) ? field.default.toString() : field.default
        control = this.formBuilder.control(
          defaultVal,
          Validators.required
        );
      }
      else if (field.required == false) {
        control = this.formBuilder.control(
          defaultVal,
        );
      }
      group.addControl(field.field_identifier, control);
    });
    return group;
  }

  get fieldCtrl() { return this.hiringForm.controls; }

  updateJobTitle_SubBand() {

    this.fields.map(e => {
      if (e.field_identifier == 'jobTitle') {
        if (this.band)
          e['options'] = this.jobTitle[this.band.toString()]
      }
      if (e.field_identifier == 'subBand') {
        if (this.hiringForm.controls['subBand'])
          this.hiringForm.controls['subBand'].setValue('')
        if (this.band)
          if (this.band.includes('6') || this.band.includes('7')) {
            e['disabled'] = false;
            e['field_type'] = 'dropdown';
            e['options'] = [this.band + 'A', this.band + 'B'];
            if (this.hiringForm.controls['subBand'])
              this.hiringForm.controls['subBand'].setValue(this.templateData[e.field_identifier])
          } else {
            e['disabled'] = true;
            e['field_type'] = 'text';
            if (this.hiringForm.controls['subBand'])
              this.hiringForm.controls['subBand'].setValue('NA')
          }
        if (this.formType == 'tolls' || this.childFormName == "Preview" || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
          e['disabled'] = true;
          e['field_type'] = 'text';
        }
      }
    })
  }

  check() {

    // $('.number').on('change, keyup', function () {
    // var currentInput = $(this).val();

    // var fixedInput = currentInput.toString().replace(/[A-Za-z!@#$%^&*()]/g, '');
    // if (fixedInput === "")
    //   $(this).val(0);
    // else {
    //   // if (identifier != 'transition_budget' && identifier != 'tcv') {
    //   if (fixedInput.includes(".")) {
    //     var arr = fixedInput.split(".");
    //     arr[0] = parseFloat(arr[0].replace(/,/g, '')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //     $(this).val(arr[0] + "." + arr[1]);
    //   } else {
    //     $(this).val(parseFloat(fixedInput.replace(/,/g, '')).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    //   }
    // }
    // var fixedInput = currentInput.toString().replace(/[A-Za-z!@#$%^&*()]/g, '');
    // if (fixedInput == "")
    // $(this).val('');
    // else {
    // $(this).val(fixedInput)
    // }
    // });

  }


  countChar(id, event) {
    if (id == 'comments') {
      var len = event.target.value.length;
      this.count = 1000 - len;
    }
  }

  addField(item, index, currentBand) {
    this.band = currentBand

    if (item)
      if (!Object.keys(this.hiringForm.value).includes(item.field_identifier)) {
        this.fields.splice(this.fields.length - index, 0, item)
        let control = this.formBuilder.control(
          item.default,
          Validators.required
        );
        this.hiringForm.addControl(item.field_identifier, control)
      }
    this.updateJobTitle_SubBand()
  }


  removeField(item, index, currentBand) {
    this.band = currentBand
    if (item)
      if (Object.keys(this.hiringForm.value).includes(item.field_identifier)) {

        this.fields.splice(this.fields.length - index, 1)
        this.hiringForm.removeControl(item.field_identifier)
      }
    this.updateJobTitle_SubBand();
  }

  addGoLiveDate() {
    let disable = false;
    let obj = {
      "field_name": "Go Live Date",
      "field_type": "date",
      "field_identifier": "goLiveDate",
      "options": "",
      "default": this.templateData['goLiveDate'] ? this.templateData['goLiveDate'] : '',
      "required": true,
      "disabled": disable,
      "order": 21
    }
    console.log(this.templateData['goLiveDate']);
    
    this.addField(obj, 3, this.band);
    if (this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.childFormName == 'Preview' || this.formType === 'grbArchive') {
      disable = true;
      // this.hiringForm.controls['goLiveDate'].setValue(new Date(this.templateData['goLiveDate']))
      this.hiringForm.controls['goLiveDate'].disable()
      this.hiringForm.controls['eob'].disable()

    } else {
      disable = false;
    }
  }

  disableFields() {
    let values = this.hiringForm.value;
    Object.keys(values).map(e => {
      this.hiringForm.controls[e].disable()
    })

  }
  updateDefaultFields(data) {
    this.totalCCValue = data.totalCc;
    // if("new"){
    //   this.totalCCValue = data.totalCc;
    // }
    ////console.log(data);
    ////console.log(this.backFillData)
    if (Object.keys(data).length == 0) {
      data = this.templateData;
    }
    if (this.backFillData['hiringAs']) {
      this.hiringFormService.setTemplateData({ 'hiringAs': this.backFillData['hiringAs'] })
    }
    if (this.templateData['tcv']) {
      if (this.hiringForm.controls['tcv'])
        this.hiringForm.controls['tcv'].setValue(this.templateData['tcv'])
      if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
        if (this.hiringForm.controls['tcv'])
          this.hiringForm.controls['tcv'].disable();
      }
    }



    if (this.templateData['hiringReason']) {
      if (this.hiringForm.controls['hiringReason'])
        this.hiringForm.controls['hiringReason'].setValue(this.templateData['hiringReason'])
    }
    if (this.backFillData['deptCode'])
      this.updateBusinessJustification(this.hiringForm.value);
    if (this.backFillData['hiringAs'])
      if (this.backFillData['hiringAs'].toLowerCase().includes('backfill') ||
        this.backFillData['hiringAs'].toLowerCase().includes('subk')) {

        this.fields.map((e, i) => {


          if (this.backFillData['hiringAs'].toLowerCase().includes('newhire')) {
            if (e.field_identifier == 'tower') {
              e['field_type'] = "dropdown";
              if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
                e['field_type'] = 'text';
                e['disabled'] = true
              }
              if (this.templateData['tower']) {
                e['default'] = this.templateData['tower']
              }
              this.hiringForm.controls['tower'].setValue(e['default'])
            }
            if (e.field_identifier == 'subProcess') {
              e['field_type'] = "dropdown";
              if (this.templateData['subProcess']) {
                let array = this.subProcess.filter(obj => obj.tower == this.hiringForm.value['tower']);
                if (array.length > 0 && this.formType != 'tolls') {
                  e['options'] = array[0]['subProcess'];
                  e['field_type'] = 'dropdown';
                }

                e['default'] = this.templateData['subProcess'] ? this.templateData['subProcess'].toUpperCase() : ""
                this.hiringForm.controls['subProcess'].setValue(e['default'])
              }
              if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
                e['field_type'] = 'text';
                e['disabled'] = true
              }
            }
          } else {
            if (e.field_identifier == 'tower') {
              e['field_type'] = "text";
              if (this.backFillData['tower'])
                e['default'] = this.backFillData['tower'];

              this.hiringForm.controls['tower'].setValue(e['default'])
            }
            if (e.field_identifier == 'subProcess') {
              e['default'] = ""
              e['default'] = this.backFillData['subProcess'] ? this.backFillData['subProcess'] : 'NA';
              e['field_type'] = 'text';
              e['disabled'] = true

              this.hiringForm.controls['subProcess'].setValue(e['default'])
            }
          }
          if (e.field_identifier == 'supId') {
            e['default'] = ""
            e['default'] = this.backFillData['supId'];
            this.hiringForm.controls[e.field_identifier].setValue(e['default'])
            if (this.childFormName !== 'Preview' && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {
              e['disabled'] = false;
            }

          }

          if (this.formType == 'tolls' || this.formType == 'iot' || this.formType == 'board' || this.formType === 'grbArchive') {
            if (e.field_identifier == 'deptCode' || e.field_identifier == 'supId')
              e['disabled'] = true
          }

          if (e.field_identifier == 'supName') {
            e['default'] = ""
            e['default'] = this.backFillData['supName'];
            this.hiringForm.controls['supName'].setValue(e['default'])
          }
          if (e.field_identifier == 'hiringReason') {
            if (this.disableHiringReason || this.formType == 'tolls' || this.formType == 'iot' || this.formType == 'board' || this.childFormName == 'Preview' || this.formType == 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true;
              e['default'] = this.backFillData.hiringAs;
              if (this.templateData['hiringReason']) {
                e['default'] = this.templateData['hiringReason'];
              }
              this.hiringForm.controls['hiringReason'].setValue(e['default'])
            } else {
              e['field_type'] = 'dropdown';
              e['options'] = ['BACKFILL', 'BACKFILL CRITICAL'];
              if (this.templateData['hiringReason']) {
                e['default'] = this.templateData['hiringReason'];
              }
              this.hiringForm.controls['hiringReason'].setValue(e['default'])
            }
          }
          if (e.field_identifier == 'tcv') {
            this.fields.splice(i, 1)
          }

          if (this.requestType == 'subk') {
            if (e.field_identifier == 'workforceSolution') {
              e['field_type'] = 'dropdown';
              e['options'] = ['NEW HIRE-EXTERNAL', 'CONVERT SUBK TO REGULAR', 'CONVERT SUBK TO NON REGULAR', 'EXTENSION'];
            }

            if (e.field_identifier == 'hiringReason' && this.backFillData['hiringAs']) {
              e['field_type'] = 'text';
              e['disabled'] = true;
              e['default'] = this.backFillData['hiringAs'];

              if (this.templateData['hiringReason']) {
                e['default'] = this.templateData['hiringReason'];
              }
              this.hiringForm.controls['hiringReason'].setValue(e['default'])
            }
          }



          if (this.templateData['hiringAs'])
            if ((this.formType == 'bizops' || this.formType == 'edit-metro') && this.templateData['hiringAs'].toLowerCase().includes('subk')) {

              if (e.field_identifier == 'workforceSolution') {
                e['field_type'] = 'dropdown';
                e['options'] = ['NEW HIRE-EXTERNAL', 'CONVERT SUBK TO REGULAR', 'CONVERT SUBK TO NON REGULAR', 'EXTENSION'];
                if (this.templateData['workforceSolution']) {
                  e['default'] = this.templateData['workforceSolution'];
                }
                this.hiringForm.controls['workforceSolution'].setValue(e['default'])
              }

              if (e.field_identifier == 'hiringReason' && this.backFillData['hiringAs']) {
                e['field_type'] = 'text';
                e['disabled'] = true;
                e['default'] = this.backFillData['hiringAs'];

                if (this.templateData['hiringReason']) {
                  e['default'] = this.templateData['hiringReason'];
                }
                this.hiringForm.controls['hiringReason'].setValue(e['default'])
              }

              if (e.field_identifier == 'subProcess' && !this.backFillData['hiringAs'].toLowerCase().includes('newhire')) {
                e['field_type'] = 'text';
                e['disabled'] = true;

                if (this.templateData['subProcess']) {
                  e['default'] = this.templateData['subProcess'] ? this.templateData['subProcess'].toUpperCase() : "";
                }

                this.hiringForm.controls['subProcess'].setValue(e['default'])
              }


            }


          Object.keys(data).forEach(eachField => {

            if (e.field_identifier == 'market' && data['geo'] && data['iot']) {
              ////console.log(data);

              ////console.log(Object.keys(this.marketDropdown[data['geo']][data['iot']]));
              ////console.log(this.hiringForm);

              e['options'] = Object.keys(this.marketDropdown[data['geo']][data['iot']])
            }
            if (e.field_identifier == 'marketCountry' && localStorage.getItem('countries')) {
              ////console.log(this.hiringForm);
              let countries = JSON.parse(localStorage.getItem('countries'));
              ////console.log(countries);

              e['options'] = countries;
              e['default'] = this.templateData['marketCountry'] ? this.templateData['marketCountry'].toUpperCase() : "";
              this.hiringForm.controls['marketCountry'].setValue(e['default'])
            }

            if (this.hiringForm.controls[eachField]) {
              if (eachField == 'jrs' && e.field_identifier == 'jrs') {
                if (typeof data[eachField] == 'object')
                  e['options'] = data[eachField].map(e => e.toUpperCase());
                e['default'] = this.backFillData['jrs'] ? this.backFillData['jrs'] : ""
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData['jrs']
                }
                this.hiringForm.controls['jrs'].setValue(this.backFillData['jrs'])

              } else if (eachField != 'jrs' && e.field_identifier != 'jrs' && eachField == e.field_identifier) {
                e['default'] = data[eachField]
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData[eachField]
                }
                this.hiringForm.controls[eachField].setValue(e['default'])
              }
            }
            if (e.field_identifier == 'slaPenalityPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL")) {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['slaPenalityPerMonth'])
                      this.hiringForm.removeControl('slaPenalityPerMonth')
                  }
              }
            }
            if (e.field_identifier == 'revenueLossPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL") || this.backFillData.hiringAs.toLowerCase() == 'New Growth-Move to Low Cost') {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['revenueLossPerMonth'])
                      this.hiringForm.removeControl('revenueLossPerMonth')
                  }

              }
            }
          })




          if (this.childFormName === 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
            e['disabled'] = true;
          }
        })
      } else if (this.backFillData['hiringAs'].toLowerCase().includes('new growth')) {
        this.hiringFormService.setBackFillData([]);
        this.fields.map(e => {
          if (e.field_identifier == 'deptCode') {
            e['disabled'] = true
          }
          if (e.field_identifier == 'tcv') {

            if (this.backFillData.length > 0)
              if (this.backFillData.hiringAs == "New Growth-CCN/PCR") {
                e['default'] = this.backFillData.tcv;
                e['disabled'] = true;
                if (this.templateData['tcv']) {
                  e['default'] = this.templateData['tcv'];
                }
                this.hiringForm.controls['tcv'].disable()
              }
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['disabled'] = true;
              if (e['field_type'] != "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload") {
                e['field_type'] = "text"
              }
            }
          }
          if (e.field_identifier == 'supId') {
            e['default'] = ""
            this.hiringForm.controls['supId'].setValue(e['default'])
            this.hiringForm.controls['supName'].setValue('')
            if (this.templateData['supId']) {
              this.hiringForm.controls['supId'].setValue(this.templateData['supId'])
            }
            if (this.childFormName !== 'Preview' && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {
              e['disabled'] = false;
            }
            else {
              e['disabled'] = true;
            }
          }
          if (e.field_identifier == 'supName') {
            e['default'] = ""
            e['default'] = this.backFillData['supName'];
            this.hiringForm.controls['supName'].setValue(e['default'])
          }
          if (e.field_identifier == 'tower') {
            e['field_type'] = "dropdown";
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
            if (this.templateData['tower']) {
              e['default'] = this.templateData['tower']
            }
            this.hiringForm.controls['tower'].setValue(e['default'])
          }
          if (e.field_identifier == 'hiringReason' && this.backFillData['hiringAs']) {
            e['field_type'] = 'text';
            e['disabled'] = true;
            e['default'] = this.backFillData['hiringAs'];

            if (this.templateData['hiringReason']) {
              e['default'] = this.templateData['hiringReason'];
            }
            this.hiringForm.controls['hiringReason'].setValue(e['default'])
          }
          if (e.field_identifier == 'subProcess') {
            e['field_type'] = "dropdown";
            if (this.templateData['subProcess']) {
              let array = this.subProcess.filter(obj => obj.tower == this.hiringForm.value['tower']);
              if (array.length > 0 && this.formType != 'tolls') {
                e['options'] = array[0]['subProcess'];
                e['field_type'] = 'dropdown';
              }

              e['default'] = this.templateData['subProcess'] ? this.templateData['subProcess'].toUpperCase() : ""
              this.hiringForm.controls['subProcess'].setValue(e['default'])
            }
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
          }
          Object.keys(data).forEach(eachField => {
            if (e.field_identifier == 'market' && data['geo'] && data['iot']) {
              ////console.log(data);
              ////console.log(Object.keys(this.marketDropdown[data['geo']][data['iot']]));
              e['options'] = Object.keys(this.marketDropdown[data['geo']][data['iot']])
            }
            if (e.field_identifier == 'marketCountry' && localStorage.getItem('countries')) {
              let countries = JSON.parse(localStorage.getItem('countries'));
              ////console.log(countries);

              e['options'] = countries;
              e['default'] = this.templateData['marketCountry'] ? this.templateData['marketCountry'].toUpperCase() : ""
              this.hiringForm.controls['marketCountry'].setValue(e['default'])
            }
            if (this.hiringForm.controls[eachField]) {
              if (eachField == 'jrs' && e.field_identifier == 'jrs') {
                if (typeof data[eachField] == 'object')
                  e['options'] = data[eachField].map(e => e.toUpperCase());
                e['default'] = this.backFillData['jrs'] ? this.backFillData['jrs'] : ""
                if (this.templateData['jrs']) {
                  e['default'] = this.templateData['jrs']
                }
                this.hiringForm.controls['jrs'].setValue(e['default'])

              } else if (eachField != 'jrs' && e.field_identifier != 'jrs' && eachField == e.field_identifier) {
                e['default'] = data[eachField]
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData[eachField]
                }
                this.hiringForm.controls[e.field_identifier].setValue(e['default'])
              }
            }


          })
          if (this.childFormName === 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
            e['disabled'] = true;
          }
        })
      } else if (this.backFillData['hiringAs'].toLowerCase().includes('swap')) {

        this.fields.map((e, i) => {
          if (e.field_identifier == 'tower') {
            e['field_type'] = "dropdown";
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
            if (this.templateData['tower']) {
              e['default'] = this.templateData['tower']
            }
            this.hiringForm.controls['tower'].setValue(e['default'])
          }

          if (e.field_identifier == 'subProcess') {
            e['field_type'] = "dropdown";
            if (this.templateData['subProcess']) {
              let array = this.subProcess.filter(obj => obj.tower == this.hiringForm.value['tower']);
              if (array.length > 0 && this.formType != 'tolls') {
                e['options'] = array[0]['subProcess'];
                e['field_type'] = 'dropdown';
              }
              e['default'] = this.templateData['subProcess'] ? this.templateData['subProcess'].toUpperCase() : ""
              this.hiringForm.controls['subProcess'].setValue(e['default'])
            }
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
          }

          if (e.field_identifier == 'supId') {
            e['default'] = ""
            e['default'] = this.backFillData['supId'];
            this.hiringForm.controls[e.field_identifier].setValue(e['default'])
            if (this.childFormName !== 'Preview' && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {
              e['disabled'] = false;
            }

          }

          if (this.formType == 'tolls' || this.formType == 'iot' || this.formType == 'board' || this.formType == 'grbArchive') {
            if (e.field_identifier == 'deptCode' || e.field_identifier == 'supId')
              e['disabled'] = true
          }

          if (e.field_identifier == 'supName') {
            e['default'] = ""
            e['default'] = this.backFillData['supName'];
            this.hiringForm.controls['supName'].setValue(e['default'])
          }
          if (e.field_identifier == 'hiringReason') {
            if (this.disableHiringReason || this.formType == 'tolls' || this.formType == 'iot' || this.formType == 'board' || this.childFormName == 'Preview' || this.formType == 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true;
              e['default'] = this.backFillData.hiringAs;
              if (this.templateData['hiringReason']) {
                e['default'] = this.templateData['hiringReason'];
              }
              this.hiringForm.controls['hiringReason'].setValue(e['default'])
            } else {
              e['field_type'] = 'dropdown';
              e['options'] = ['BACKFILL', 'BACKFILL CRITICAL'];
              if (this.templateData['hiringReason']) {
                e['default'] = this.templateData['hiringReason'];
              }
              this.hiringForm.controls['hiringReason'].setValue(e['default'])
            }
          }


          Object.keys(data).forEach(eachField => {
            if (e.field_identifier == 'market' && data['geo'] && data['iot']) {
              ////console.log(data);
              ////console.log(Object.keys(this.marketDropdown[data['geo']][data['iot']]));

              e['options'] = Object.keys(this.marketDropdown[data['geo']][data['iot']])
            }
            if (e.field_identifier == 'marketCountry' && localStorage.getItem('countries')) {
              let countries = JSON.parse(localStorage.getItem('countries'));
              e['options'] = countries;
              e['default'] = this.templateData['marketCountry'] ? this.templateData['marketCountry'].toUpperCase() : ""
              this.hiringForm.controls['marketCountry'].setValue(e['default'])
            }
            if (this.hiringForm.controls[eachField]) {
              if (eachField == 'jrs' && e.field_identifier == 'jrs') {
                if (typeof data[eachField] == 'object')
                  e['options'] = data[eachField].map(e => e.toUpperCase());
                e['default'] = this.backFillData['jrs'] ? this.backFillData['jrs'] : ""
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData['jrs']
                }
                this.hiringForm.controls['jrs'].setValue(e['default'])

              } else if (eachField != 'jrs' && e.field_identifier != 'jrs' && eachField == e.field_identifier) {
                e['default'] = data[eachField]
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData[eachField]
                }
                this.hiringForm.controls[eachField].setValue(e['default'])
              }
            }
            if (e.field_identifier == 'slaPenalityPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL")) {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['slaPenalityPerMonth'])
                      this.hiringForm.removeControl('slaPenalityPerMonth')
                  }
              }
            }
            if (e.field_identifier == 'revenueLossPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL") || this.backFillData.hiringAs.toLowerCase() == 'New Growth-Move to Low Cost') {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['revenueLossPerMonth'])
                      this.hiringForm.removeControl('revenueLossPerMonth')
                  }

              }
            }
          })


          if (this.childFormName === 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
            e['disabled'] = true;
          }
        })
      }
      //conversion fields
      else if (this.backFillData.hiringAs.toLowerCase().includes('conversion')) {


        this.fields.map((e, i) => {
          if (e.field_identifier == 'tower') {
            e['field_type'] = "dropdown";
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
            if (this.templateData['tower']) {
              e['default'] = this.templateData['tower']
            }
            this.hiringForm.controls['tower'].setValue(e['default'])
          }

          if (e.field_identifier == 'subProcess') {
            e['field_type'] = "dropdown";
            if (this.templateData['subProcess']) {
              let array = this.subProcess.filter(obj => obj.tower == this.hiringForm.value['tower']);
              if (array.length > 0 && this.formType != 'tolls') {
                e['options'] = array[0]['subProcess'];
                e['field_type'] = 'dropdown';
              }

              e['default'] = this.templateData['subProcess'] ? this.templateData['subProcess'].toUpperCase() : ""
              this.hiringForm.controls['subProcess'].setValue(e['default'])
            }
            if (this.childFormName == 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
              e['field_type'] = 'text';
              e['disabled'] = true
            }
          }

          if (e.field_identifier == 'supId') {
            e['default'] = this.backFillData['supId'] ? this.backFillData['supId'] : "";
            this.hiringForm.controls['supId'].setValue(e['default'])
            this.hiringForm.controls['supName'].setValue('')
            if (this.templateData['supId']) {
              this.hiringForm.controls['supId'].setValue(this.templateData['supId'])
            }
            if (this.childFormName !== 'Preview' && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {
              e['disabled'] = false;
            }
            else {
              e['disabled'] = true;
            }
          }
          if (e.field_identifier == 'supName') {
            e['default'] = ""
            e['default'] = this.backFillData['supName'];
            this.hiringForm.controls['supName'].setValue(e['default'])
          }

          if (this.formType == 'tolls' || this.formType == 'iot' || this.formType == 'board' || this.formType === 'grbArchive') {
            if (e.field_identifier == 'deptCode' || e.field_identifier == 'supId')
              e['disabled'] = true
          }


          if (e.field_identifier == 'hiringReason') {
            e['field_type'] = 'text';
            e['disabled'] = true;
            e['default'] = this.backFillData['hiringAs'];

            if (this.templateData['hiringReason']) {
              e['default'] = this.templateData['hiringReason'];
            }
            this.hiringForm.controls['hiringReason'].setValue(e['default'])
          }
          if (e.field_identifier == 'workforceSolution') {
            e['field_type'] = 'dropdown';
            e['options'] = ['CONVERT NON REGULAR TO REGULAR', 'NON REGULAR PROMOTION', 'EXTENSION'];
          }

          Object.keys(data).forEach(eachField => {
            if (e.field_identifier == 'market' && data['iot'] && data['geo']) {
              ////console.log(data);
              ////console.log(Object.keys(this.marketDropdown[data['geo']][data['iot']]));

              e['options'] = Object.keys(this.marketDropdown[data['geo']][data['iot']])
            }
            if (e.field_identifier == 'marketCountry' && localStorage.getItem('countries')) {
              let countries = JSON.parse(localStorage.getItem('countries'));
              e['options'] = countries;
              e['default'] = this.templateData['marketCountry'] ? this.templateData['marketCountry'].toUpperCase() : ""
              this.hiringForm.controls['marketCountry'].setValue(e['default'])

            }
            if (this.hiringForm.controls[eachField]) {
              if (eachField == 'jrs' && e.field_identifier == 'jrs') {
                if (typeof data[eachField] == 'object')
                  e['options'] = data[eachField].map(e => e.toUpperCase());
                e['default'] = this.backFillData['jrs'] ? this.backFillData['jrs'] : ""
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData['jrs']
                }
                this.hiringForm.controls['jrs'].setValue(e['default'])

              } else if (eachField != 'jrs' && e.field_identifier != 'jrs' && eachField == e.field_identifier) {
                e['default'] = data[eachField]
                if (this.formType == 'edit-metro' || this.formType == 'bizops' || this.formType == 'swap' || this.formType == 'aod') {
                  e['default'] = this.templateData[eachField]
                }
                this.hiringForm.controls[eachField].setValue(e['default'])
              }
            }
            if (e.field_identifier == 'slaPenalityPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL")) {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['slaPenalityPerMonth'])
                      this.hiringForm.removeControl('slaPenalityPerMonth')
                  }
              }
            }
            if (e.field_identifier == 'revenueLossPerMonth') {
              if (eachField == 'accountType') {
                if (data[eachField])
                  if (data[eachField].includes("FTE BASED") || data[eachField].includes("TIME AND MATERIAL") || this.backFillData.hiringAs.toLowerCase() == 'New Growth-Move to Low Cost') {
                    this.fields.splice(i, 1)
                    if (this.hiringForm.controls['revenueLossPerMonth'])
                      this.hiringForm.removeControl('revenueLossPerMonth')
                  }

              }
            }
          })


          if (this.childFormName === 'Preview' || this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
            e['disabled'] = true;
          }
        })
      }
  }

  dropdownChange(id, event) {
    ////console.log(id);
    ////console.log(event);
    ////console.log(this.geographyJson);

    if (id == 'market') {
      let geo = this.hiringForm.value['geo'];
      let iot = this.hiringForm.value['iot'];
      let market = event.value;
      let json = {};
      if (this.geographyJson[market])
        json = { "geography": this.geographyJson[market] }
      else
        json = { "geography": null }
      this.hiringForm.controls['marketCountry'].setValue(null);
      this.hiringFormService.setGRBDetails(json)
      this.hiringFormService.setTemplateData(json)
      this.fields.map(e => {
        if (e.field_identifier == 'marketCountry') {
          if (this.marketDropdown[geo])
            if (this.marketDropdown[geo][iot])
              if (this.marketDropdown[geo][iot][market]) {
                e['options'] = this.marketDropdown[geo][iot][market];
                if (this.marketDropdown)
                  if (this.marketDropdown[geo])
                    if (this.marketDropdown[geo][iot])
                      if (this.marketDropdown[geo][iot][market])
                        localStorage.setItem('countries', JSON.stringify(this.marketDropdown[geo][iot][market]))
              }
        }
      })
    }

  }

  updateBusinessJustification(data) {
    let templateData = data
    let quantity = this.hiringFormService.getQuantity();
    let preText = "Releasable list has been reviewed & no suitable candidate found. ";
    let justification = ""
    let hiringType = this.hiringFormService.getHiringType();

    let eob = "YYYY-MM-DD";
    // if (templateData['eob'])
    //   templateData['eob'].getFullYear() + '-' +
    //     ('0' + (templateData['eob'].getMonth() + 1)).slice(-2) + '-' + ('0' + templateData['eob'].getDate()).slice(-2);

    if (this.backFillData['hiringReason']) {
      this.backFillData['hiringAs'] = this.backFillData['hiringReason']
    }
    if (this.backFillData['hiringAs'])
      if (this.backFillData['hiringAs'].toLowerCase().includes('backfill') || this.backFillData['hiringAs'].toLowerCase().includes('swap') ||
        this.backFillData['hiringAs'].toLowerCase().includes('subk')) {

        if (hiringType == 'EXTERNAL') {
          if (templateData['accountType'])
            if (templateData['accountType'].includes("FTE BASED") || templateData['accountType'].includes("TIME AND MATERIAL")) {
              justification = preText + data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity
                + " Band:" + this.backFillData.band + " for Tower:" + this.backFillData.tower + " / Sub-Process:" + this.backFillData.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage']
              if (this.backFillData['hiringAs'].toLowerCase().includes('backfill') || this.backFillData['hiringAs'].toLowerCase().includes('subk') || this.backFillData['hiringAs'].toLowerCase().includes('conversion')) {
                justification = justification + this.displayBackfillEmployees();
              }
            }
            else {
              if (templateData['accountType'])
                justification = preText + data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity
                  + " Band:" + this.backFillData.band + " for Tower:" + this.backFillData.tower + " / Sub-Process:" + this.backFillData.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage'] + ".\n If not Hired on time the account will have financial impact \n 1) Billing loss of: " + templateData['revenueLossPerMonth'] + "Per Month / Per Person \n 2) SLA Penality: " + templateData['slaPenalityPerMonth'] + "Per Month / Per Person \n Account is hiring at a lower Band with Cost Saving of " + templateData['costSaving'] + "Per Month / Per Person "
              if (this.backFillData['hiringAs'].toLowerCase().includes('backfill') || this.backFillData['hiringAs'].toLowerCase().includes('subk') || this.backFillData['hiringAs'].toLowerCase().includes('conversion')) {
                justification = justification + this.displayBackfillEmployees();
              }
            }
        }
        else if (hiringType == 'INTERNAL') {
          if (templateData['accountType'])
            justification = data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity
              + " Band:" + this.backFillData.band + " for Tower:" + this.backFillData.tower + " / Sub-Process:" + this.backFillData.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage']
          if (this.backFillData['hiringAs'].toLowerCase().includes('subk') || this.backFillData['hiringAs'].toLowerCase().includes('conversion')) {
            justification = justification + this.displayBackfillEmployees(); + ".\n Transfer Employee Details : " + this.displayTransferEmployees();
          }
        }
      }
      else if (this.backFillData.hiringAs == "New Growth-CCN/PCR") {
        if (hiringType == 'EXTERNAL') {
          if (templateData['accountType'])
            justification = preText + data.deptName + " is " + templateData['accountType'] + " and requires TOTAL QUANTITY:" + quantity + " Band:" + this.backFillData.band + " for Tower:" + data.tower + " / Sub-Process:" + data.subProcess + " For New Transition Signed with client for incremental / Additional Scope / FTE Addition / Seasonal Scope for the Period from " + this.backFillData.fromDate + " till " + this.backFillData.toDate + ". \n Total FTE: " + this.backFillData['fteCount'] + " \n  TCV for  " + this.backFillData.tcv + ".";
        }
        else if (hiringType == 'INTERNAL') {
          if (templateData['accountType'])
            justification = data.deptName + " is " + templateData['accountType'] + " and requires TOTAL QUANTITY:" + quantity + " Band:" + this.backFillData.band + " for Tower:" + data.tower + " / Sub-Process:" + data.subProcess + " For New Transition Signed with client for incremental / Additional Scope / FTE Addition / Seasonal Scope for the Period from " + this.backFillData.fromDate + " till " + this.backFillData.toDate + ". \n Total FTE: " + this.backFillData['fteCount'] + " \n  TCV for  " + this.backFillData.tcv + ".";
          justification = justification + this.displayBackfillEmployees();

        }

      }
      else {
        if (hiringType == 'EXTERNAL') {
          if (templateData['accountType'])
            if (templateData['accountType'].includes("FTE BASED") || templateData['accountType'].includes("TIME AND MATERIAL")) {
              justification = preText + data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity + " Band:" + this.backFillData.band + " for Tower:" + data.tower + " / Sub-Process:" + data.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage'];
            }
            else {
              if (templateData['accountType'])
                justification = preText + data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity + " Band:" + this.backFillData.band + " for Tower:" + data.tower + " / Sub-Process:" + data.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage'] + ".\n If not Hired on time the account will have financial impact \n 1) Billing loss of: " + templateData['revenueLossPerMonth'] + "Per Month / Per Person \n 2) SLA Penality: " + templateData['slaPenalityPerMonth'] + "Per Month / Per Person \n Account is hiring at a lower Band with Cost Saving of " + templateData['costSaving'] + "Per Month / Per Person";

            }
          if (this.backFillData['hiringAs'].toLowerCase().includes('subk') || this.backFillData['hiringAs'].toLowerCase().includes('conversion')) {
            justification = justification + this.displayBackfillEmployees();
          }
        }
        else if (hiringType == 'INTERNAL') {
          if (templateData['accountType'])
            justification = data.deptName + " is " + templateData['accountType'] + " and requires an " + templateData['hiringReason'] + " for TOTAL QUANTITY:" + quantity + " Band:" + this.backFillData.band + " for Tower:" + data.tower + " / Sub-Process:" + data.subProcess + ".Currect HC is at " + templateData['actualHeadCount'] + " against the Agreed HC of (" + this.totalCCValue + ") and attrition is at YTD%:" + templateData['attritionYTDPercentage'] + ". UTE% is at: " + templateData['accountUTEPercentage'] + ".Gp% is at: " + templateData['gpPercentage'];
          if (this.backFillData['hiringAs'].toLowerCase().includes('subk') || this.backFillData['hiringAs'].toLowerCase().includes('conversion')) {
            justification = justification + this.displayBackfillEmployees();
          }
        }

      }


    if (this.hiringForm.controls['businessJustification']) {
      this.hiringForm.controls['businessJustification'].setValue(justification)
      this.hiringForm.controls['businessJustification'].disable()
    } else {
      let control = this.formBuilder.control(
        '',
        Validators.required
      );
      this.hiringForm.addControl('businessJustification', control)
      this.hiringForm.controls['businessJustification'].setValue(justification)
      this.hiringForm.controls['businessJustification'].disable()
    }

  }

  displayBackfillEmployees(): string {
    let str = ".\n Backfill Employee Details : "
    let data = ""
    let backFillData = this.hiringFormService.getBackFillData()
    for (let i = 0; i < backFillData.length; i++) {
      data = backFillData[i];
      if (data['empId'])
        if (this.requestType == 'swap') {
          str = str + "\n # Emp Id : " + data['empId'] + ", Emp Name : " + data['empName'] + ", Band : " + data['band'] + ", Supervisor Id : " + data['supId'] + ", Supervisor Name : " + data['supName'] + ", TED : " + data['ted'];
        } else {
          str = str + "\n # Emp Id : " + data['empId'] + ", Emp Name : " + data['empName'] + ", Band : " + data['band'] + ", Supervisor Id : " + data['supId'] + ", Supervisor Name : " + data['supName'] + ", LWD : " + data['lwd'];
        }

    }
    if (str.toLowerCase().includes('emp id')) {
      return str;
    } else {
      return "";
    }
  }

  displayTransferEmployees(): string {
    let str = ""
    let data = ""
    for (let i = 0; i < this.transferData.length; i++) {
      data = this.transferData[i];
      if (this.requestType == 'swap') {
        str = str + "\n # Emp Id : " + data['empId'] + ", Emp Name : " + data['empName'] + ", Band : " + data['band'] + ", Supervisor Id : " + data['supId'] + ", Supervisor Name : " + data['supName'] + ", TED : " + data['ted'];
      } else {
        str = str + "\n # Emp Id : " + data['empId'] + ", Emp Name : " + data['empName'] + ", Band : " + data['band'] + ", Supervisor Id : " + data['supId'] + ", Supervisor Name : " + data['supName'] + ", LWD : " + data['lwd'];
      }

    }
    return str;
  }

  updateSubProcess(field) {
    if (this.path.includes('create-request')) {
      this.hiringForm.controls['subProcess'].setValue(null);
    }
    this.fields.map(e => {
      if (e.field_identifier == 'subProcess' && field == 'tower') {
        let array = this.subProcess.filter(obj => obj.tower == this.hiringForm.value[field]);
        if (array.length > 0) {
          e['options'] = array[0]['subProcess'];
          e['field_type'] = 'dropdown';
          e['disabled'] = false
        }
        else {
          e['default'] = 'NA';
          e['field_type'] = 'text';
          e['disabled'] = true
        }
      }
    })
  }

  gicResourceType(val: any) {
    if (val) {
      if (val['value']) {
        this.contractType = val['value']
      } else {
        this.contractType = val
      }
    }
    let value = "";
    if (this.contractType === 'REGULAR FULL TIME' || this.contractType === 'REGULAR PART TIME') {
      value = 'REGULAR';
    } else if (this.contractType === 'NON REGULAR') {
      value = 'NON REGULAR';
    } else if (this.contractType === 'SUBCONTRACTOR') {
      value = 'SUB-CONTRACTOR';
    }
    this.fields.map(e => {
      if (e.field_identifier == 'gicResourceType') {
        e['default'] = value;
        e['field_type'] = 'text';
        e['disabled'] = true
      }
    })

    this.hiringForm.controls['gicResourceType'].setValue(value);
    this.hiringForm.controls['gicResourceType'].disable();
    this.saveData('gicResourceType', value);


  }

  saveData(id, val) {
    //////console.log(val)
    if (id === 'resourceContractType') {
      this.gicResourceType(val);
    }

    if (id === 'tower') {
      this.updateSubProcess(id)
    }
    this.updateBusinessJustification(this.hiringForm.value);
    //console.log(this.formType);

    if (this.formType != 'grbArchive' && this.formType != 'tolls' && this.formType != 'iot' && this.formType != 'board') {
      if (id == 'supId') {
        if (val) {
          if (val.length > 0) {
            let newURL = ""
            if (this.backFillData['hiringAs']) {
              if (this.backFillData['hiringAs'].toLowerCase().includes('subk')) {
                newURL = environment.GET_SUPERVISOR_NAME_SUBK;
              }
              else {
                newURL = environment.GET_SUPERVISOR_NAME;
              }
            } else {
              newURL = environment.GET_SUPERVISOR_NAME;
            }
            this.commonService.getServiceRequest(newURL + val).subscribe((data: any) => {
              if (data.value) {

                this.hiringForm.controls['supName'].setValue(data.value)
                this.invalidMgrID = false;
              } else {

                this.notification.openSnackBar('Please Enter a Valid Manager\'s ID');
                this.invalidMgrID = true;
                this.hiringForm.controls['supName'].setValue(null)
                this.hiringForm.controls['supId'].setValue(null)

                if (this.templateData['supName']) {
                  this.hiringForm.controls['supId'].setValue(this.templateData['supId'])
                  this.hiringForm.controls['supName'].setValue(this.templateData['supName'])
                }
              }


            })
          } else {
            this.hiringForm.controls['supName'].setValue(null)
          }
        } else {
          this.hiringForm.controls['supName'].setValue(null)
        }
      }
    } else {
      if (this.templateData['supName']) {
        this.hiringForm.controls['supId'].setValue(this.templateData['supId'])
        this.hiringForm.controls['supName'].setValue(this.templateData['supName'])
        this.invalidMgrID = false;
      }
    }
    this.formValidate[this.formName] = this.hiringForm.valid
    // this.validate.emit(this.formValidate)
    ////////console.log(this.hiringForm)
    this.formData = {
      ...this.formData, ...this.hiringForm.value,
      ...{ businessJustification: this.hiringForm.controls['businessJustification'].value },
      ...{ gicResourceType: this.hiringForm.controls['gicResourceType'].value, }
    }
    if (this.hiringForm.controls['goLiveDate']) {
      this.formData = {
        ...this.formData,
        ...{ goLiveDate: this.hiringForm.controls['goLiveDate'].value, }
      }
    }
    if (this.hiringForm.controls['subProcess']) {
      this.formData = {
        ...this.formData,
        ...{ subProcess: this.hiringForm.controls['subProcess'].value, }
      }
    }
    if (this.hiringForm.controls['eob']) {
      this.formData = {
        ...this.formData,
        ...{ eob: this.hiringForm.controls['eob'].value, }
      }
    }
    if (this.hiringForm.controls['tcv']) {
      this.formData = {
        ...this.formData,
        ...{ tcv: this.hiringForm.controls['tcv'].value, }
      }
    }


    const controls = this.hiringForm.controls;
    let invalidFields = []
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidFields.push(name);
      }
    }
    //console.log(invalidFields);
    if (invalidFields.includes('subBand')) {
      this.hiringForm.controls['subBand'].setValue("NA");
    }
    //console.log(this.hiringForm);
    //console.log(this.hiringForm.valid);
    //console.log(this.hiringForm.status);
    this.hiringFormService.setGRBDetails(this.formData)
    this.hiringFormService.setTemplateData(this.formData)
    if (this.fileName.length > 0 || this.fileUploaded)
      this.hiringFormService.setGRBValid(this.hiringForm.valid)
    else
      this.hiringFormService.setGRBValid(false)

  }

  checkMetroNoModified() {
    if (!this.firstMetroNo) {
      this.firstMetroNo = this.metroNo;
    } else if (this.secondMetroNo) {
      this.firstMetroNo = this.secondMetroNo;
      this.secondMetroNo = this.metroNo;
    } else {
      this.secondMetroNo = this.metroNo;
    }

    ////////console.log('metroNo', this.metroNo);
    ////////console.log('firstMetroNo', this.firstMetroNo);
    ////////console.log('secondMetroNo', this.secondMetroNo);

    if (this.firstMetroNo && this.secondMetroNo) {
      if (this.firstMetroNo !== this.secondMetroNo) {
        this.metroNoModified = true;
        ////////console.log('storedFile:', this.storedFile);
        if (this.storedFile) {
          this.openUploadFileAction();
        }
      }
    }

  }

  isValidMetro(metroValid: boolean, metro: any) {
    this.metroValid = metroValid;
    this.metroNo = metro;
    this.checkMetroNoModified();
  }

  openUploadFileAction(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '400px',
      data: this.metroNoModified,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('result', result);
      if (result.data === 'No') {
        this.removeFile();
      }
    });
  }

  fileUpload(files: File[]) {
    this.newFileUpload(files);
  }

  newFileUpload(files: any) {
    //////console.log(files);

    if (files) {
      this.storedFile = files;

      //////console.log(this.storedFile);

      for (let file of files) {
        this.hiringFormService.setUploadedFile(file.name);
        this.hiringFormService.setGRBDetails({ 'upload': file.name })
        this.hiringFormService.setTemplateData({ 'upload': file.name })
        this.fileName = file.name;
        this.hideFileAction = true;
      }
      this.spinner.show();
      let newURL = ""
      if (this.backFillData['hiringAs']) {
        if (this.backFillData['hiringAs'].toLowerCase().includes('subk')) {
          newURL = environment.GRB_TEMPLATE_FILE_UPLOAD_API_SUBK;
        }
        else {
          newURL = environment.GRB_TEMPLATE_FILE_UPLOAD_API;
        }
      } else {
        newURL = environment.GRB_TEMPLATE_FILE_UPLOAD_API;
      }
      this.commonService.grbTemplateFileUpload(newURL, this.storedFile, this.metroNo).subscribe((data: any) => {
        setTimeout(() => {
          ////////console.log('upload-res-data', data);
          if (data.message === 'SUCCESS') {
            this.fileUploaded = true;
            this.saveData('upload', this.storedFile)
            this.notification.showSnackBar('File Uploaded Successfully ...!!!');
          } else {
            this.notification.showSnackBar('Failed to Upload File ...!!!');
          }
          this.spinner.hide();
        }, 0);
      });

    }

  }

  removeFile() {
    this.hideFileAction = false;
    this.fileName = '';
    this.storedFile = '';
    this.fileUpload(null);
    this.notification.showSnackBar('File removed. Please re-upload again');
  }

  openSnackBar() {

    if (status === '200') {
      // this.hiringFormService.nullifyTemplateData();
      this.notification.showSnackBar('File Uploaded Successfully ...!!!');
      // setTimeout(() => {
      //   this.router.navigateByUrl('/main-menu');
      // }, 500)
    } else {
      this.notification.showSnackBar('Failed to Upload File ...!!!');
    }
  }


}
