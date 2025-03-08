import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DateAdapter, MatDialog, MAT_DATE_FORMATS } from '@angular/material';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HiringFormService } from 'src/app/services/hiring-form.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { data, param } from 'jquery';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { CommonService } from 'src/app/services/common-service.service';
import { ActivatedRoute } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
@Component({
  selector: 'app-hiring-form-tram',
  templateUrl: './hiring-form-tram.component.html',
  styleUrls: ['./hiring-form-tram.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class HiringFormTramComponent implements OnInit {

  // BehaviorSubject to store UserName
  private dataFields = new BehaviorSubject<any>({});

  // Make UserName store Observable
  public data$ = this.dataFields.asObservable();
  minDate = new Date();
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
  formData: any = {};


  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private location: Location,
    public hiringFormService: HiringFormService, public commonService: CommonService,
    private activatedRoute: ActivatedRoute) {
    this.findActivatedRoute();
  }

  ngOnInit() {


    this.hiringForm = this.createControl();
    this.getTemplateData();
    this.setValues();
  }

  setValues() {
    this.saveData()
  }

  findActivatedRoute() {

    this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
      if (params.formName) {
        this.formType = params.formName;
      }
    });
    this.subscribeRoute.unsubscribe();
  }


  getTemplateData() {
    if (localStorage.getItem('templateData')) {
      this.templateData = JSON.parse(localStorage.getItem('templateData'));
    } else {
      this.templateData = this.hiringFormService.getTemplateData();
    }
    //console.log(this.templateData);

    if (this.hiringForm.value)
      if (this.hiringForm.value['requestedLanguage']) {
        this.hiringForm.controls['requestedLanguage'].setValue(this.hiringForm.value['requestedLanguage']);
      } else {
        this.hiringForm.controls['requestedLanguage'].setValue('ENGLISH');
      }
    // if (this.templateData['eob']) {
    //   this.hiringForm.controls['plannedEndDate'].setValue(new Date(this.templateData['eob']));
    //   this.hiringForm.controls['plannedEndDate'].disable();
    // }
  }



  createControl() {

    const group = this.formBuilder.group({});
    let control;
    this.fields.forEach(field => {
      if (field.required) {
        control = this.formBuilder.control(
          field.default,
          Validators.required
        );
      }
      else if (field.required == false) {
        control = this.formBuilder.control(
          field.default
        );
      }
      group.addControl(field.field_identifier, control);


    });
    return group;
  }

  get fieldCtrl() { return this.hiringForm.controls; }


  dropdownChange(field, event, disable) {
    let value = event.value;

  }



  countChar(event) {
    var len = event.target.value.length;
  }

  saveData() {
    this.formValidate[this.formName] = this.hiringForm.valid;
    this.validate.emit(this.formValidate)
    this.formData = {
      ...this.formData, ...this.hiringForm.value,
    }
      // ...{ plannedEndDate: this.hiringForm.controls['plannedEndDate'].value, }

    this.hiringFormService.setTRAMDetails(this.formData)
    this.hiringFormService.setTRAMValid(this.hiringForm.valid)
    this.hiringFormService.setTemplateData(this.formData)



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
  }



}
