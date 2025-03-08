import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HiringFormService } from 'src/app/services/hiring-form.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { data, param } from 'jquery';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { CommonService } from 'src/app/services/common-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hiring-form-gom',
  templateUrl: './hiring-form-gom.component.html',
  styleUrls: ['./hiring-form-gom.component.scss']
})
export class HiringFormGomComponent implements OnInit {

  // BehaviorSubject to store UserName
  private dataFields = new BehaviorSubject<any>({});

  // Make UserName store Observable
  public data$ = this.dataFields.asObservable();

  hiringForm: FormGroup;
  @Input() fields = [];
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
  @Input() formName: string
  @Output() private bandChange = new EventEmitter<any>();
  formType: string = "";
  private band = "";
  private formValidate = {};

  @Input() private backFillData: any = {}
  private templateData = {}
  @Output() private validate = new EventEmitter<any>();
  @Input() private childFormName: string = "";
  subscribeRoute: Subscription;


  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private location: Location,
    public hiringFormService: HiringFormService, public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
    setTimeout(() => {
      this.bandChange.emit();
    }, 0)


    this.getBackFillData();
    this.findActivatedRoute();
  }

  ngOnInit() {
    this.hiringForm = this.createControl();
    this.setValues();
    this.addOrRemoveRestrictions();
  }

  findActivatedRoute() {

    this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
      if (params.formName) {
        this.formType = params.formName;

      }
      //   if (params.formName == 'bizops' || params.formName == 'edit-metro') {
      //   }
      //   else {
      //   }
    });
    this.subscribeRoute.unsubscribe();
  }
  getBackFillData() {
    const backFill = this.hiringFormService.getBackFillData();
    this.backFillData = backFill.length > 0 ? backFill[0] : {};
    this.getTemplateData();
  }

  getTemplateData() {
    if (localStorage.getItem('templateData')) {
      this.templateData = JSON.parse(localStorage.getItem('templateData'));
    } else {
      this.templateData = this.hiringFormService.getTemplateData();
    }

    if (this.templateData['deptCode']) {
      this.backFillData = this.templateData;
    }
    this.assignBand();
  }

  assignBand() {
    if (this.backFillData['band']) {
      this.band = this.backFillData['band'];
      this.updateGOM(this.band);
    }
  }

  addOrRemoveRestrictions() {
    if (this.backFillData['isAccountHasRestrictions']) {
      this.updateRestrictions(this.backFillData['isAccountHasRestrictions']);
    } else {
      this.fields.map((e, i) => {
        if (e['field_identifier'] === 'restrictions') {
          this.fields.splice(i, 1);
        }
      })
    }
  }

  setValues() {
    let values = this.hiringFormService.getGOMDetails();
    if (localStorage.getItem('templateData')) {
      values = JSON.parse(localStorage.getItem('templateData'));
    }
    Object.keys(values).forEach(e => {
      if (values[e]) {
        if (this.hiringForm.controls[e])
          this.hiringForm.controls[e].setValue(values[e])
        if (this.childFormName !== 'Preview' && !(this.formType == 'tolls' || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive')) {

          this.saveData()
        }
      }
      if (this.childFormName == 'Preview') {
        if (this.hiringForm.controls[e])
          this.hiringForm.controls[e].disable()
      }
    })
  }
  createControl() {

    const group = this.formBuilder.group({});
    let control;
    this.fields.forEach(field => {

      if (field.required) {
        control = this.formBuilder.control(
          field.default?field.default.trim():field.default,
          Validators.required
        );
      }
      else if (field.required == false) {
        control = this.formBuilder.control(
          '',
        );
      }
      group.addControl(field.field_identifier, control);


    });
    return group;
  }

  get fieldCtrl() { return this.hiringForm.controls; }

  addField(item, index) {
    if (!Object.keys(this.hiringForm.value).includes(item.field_identifier)) {
      this.fields.splice(this.fields.length - index, 0, item)
      let control = this.formBuilder.control(
        item.default,
        Validators.required
      );
      this.hiringForm.addControl(item.field_identifier, control)
    }
    this.updateGOM(this.band);
  }

  updateGOM(band) {

    this.band = band;
    this.fields.map(e => {
      if (e.field_identifier == 'posting') {
        if (this.band) {
          e['default'] = this.posting[this.band.toString()];
          e['disabled'] = true
        }
      }
      if (e.field_identifier == 'requestType') {
        e['default'] = this.requestType[this.band];
        e['options'] = [];
        e['options'].push('DOMESTIC');
        if (this.requestType[this.band])
          e['options'].push(this.requestType[this.band])
      }

      if (e.field_identifier == 'idType') {

        if (this.band)
          if (this.band.includes('3') || this.band.includes('4') || this.band.includes('5')) {
            e['default'] = "BCO";
            e['disabled'] = true;
          }
          else {
            e['default'] = "SCO";
            e['disabled'] = true;

          }
      }

    })
  }
  removeField(item, index) {

    if (Object.keys(this.hiringForm.value).includes(item.field_identifier)) {
      this.fields.splice(this.fields.length - index, 1)
      this.hiringForm.removeControl(item.field_identifier)
    }
    this.updateGOM(this.band);
  }



  dropdownChange(field, event, disable) {
    let value = event.value;
    if (field == 'isAccountHasRestrictions') {
      if (value == "Yes") {
        let obj = {
          "field_name": "Reason for Restriction",
          "field_type": "text",
          "field_identifier": "restrictions",
          "options": "",
          "default": "",
          "required": true,
          "disabled": disable,
          "order": 21
        }
        this.addField(obj, 2);
      } else {
        let obj = {
          "field_identifier": "restrictions"
        }
        this.removeField(obj, 3)
      }
    }
  }

  updateRestrictions(value) {
    if (value.toLowerCase() == 'yes') {
      let event = {};
      event['value'] = value;
      setTimeout(() => {
        let disabled = true;

        if (this.formType == 'tolls' || this.childFormName == "Preview" || this.formType === 'iot' || this.formType === 'board' || this.formType === 'grbArchive') {
          this.dropdownChange('isAccountHasRestrictions', event, disabled);
        } else {
          this.dropdownChange('isAccountHasRestrictions', event, !disabled);
        }
        if(this.hiringForm.controls['restrictions'])
        this.hiringForm.controls['restrictions'].setValue(this.templateData['restrictions'])
      }, 0);
    } else {
      let obj = {
        "field_identifier": "restrictions"
      }
      this.removeField(obj, 3)
    }
  }

  countChar(event) {
    var len = event.target.value.length;
  }

  saveData() {
    //////console.log(this.hiringForm)
    this.formValidate[this.formName] = this.hiringForm.valid;
    this.validate.emit(this.formValidate)
    this.hiringFormService.setGOMDetails(this.hiringForm.value)
    this.hiringFormService.setGOMValid(this.hiringForm.valid)
    this.hiringFormService.setTemplateData(this.hiringForm.value)

    setTimeout(() => {

      let path = this.location['_platformStrategy']._platformLocation.location.href;
      if (path.includes('approval') || this.formType.includes('edit')) {
        if (localStorage.getItem('templateData')) {
          let data = JSON.parse(localStorage.getItem('templateData'));
          data = { ...data, ...this.hiringForm.value }
          localStorage.setItem('templateData', JSON.stringify(data))
        }
      }
    }, 0);
    // this.notfication.showSnackBar('GOM Details Updated');
  }


}
