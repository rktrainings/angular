import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CostCaseService } from 'src/app/services/cost-case.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { CostCaseTemplateComponent } from 'src/app/components/cost-case-template/cost-case-template.component';
import { browserRefresh } from 'src/app/components/header/header.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ApprovalCommentsComponent } from '../dialogs/approval-comments/approval-comments.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RejectionCommentsComponent } from '../dialogs/rejection-comments/rejection-comments.component';


@Component({
  selector: 'app-cost-case-approval',
  templateUrl: './cost-case-approval.component.html',
  styleUrls: ['./cost-case-approval.component.scss']
})
export class CostCaseApprovalComponent implements OnInit {
  subscription: Subscription
  fields: any = [];
  debandValue = "";
  costCaseForm: FormGroup;
  commonFields = {};
  costCaseType: any = "CCN/PCR";
  costCaseTypeSelected = false;
  actualCostCase = []
  @ViewChild(CostCaseTemplateComponent) private costCaseTemplate: CostCaseTemplateComponent;
  months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
  deband: any;
  showTemplate: boolean = false;
  showSpinner: boolean = false;
  browserRefresh: any;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private _location: Location,
    private costCaseService: CostCaseService, private userDetails: UserDetailsService, private notificationService: NotificationService) {

    this.browserRefresh = browserRefresh
    if (this.browserRefresh) {
      this._location.back();
    }
  }

  ngOnInit() {
    this.getCommonFields().subscribe(data => {
      this.fields = data;
      this.updateFromMonth();
      let costCaseData = this.costCaseService.getCostCaseData()
      this.dropdownChange('costCaseType', costCaseData['costCaseType'])
      let toIndex = this.months.indexOf(costCaseData['fromMonth']);
      this.updateToMonth(toIndex)
      this.getData(costCaseData);
    })

    this.costCaseService.fte$.subscribe(fte => {
      if (this.costCaseForm)
        if (this.costCaseForm.controls['totalFte'])
          this.costCaseForm.controls['totalFte'].setValue(fte)
    })
  }
  updateFromMonth() {
    let currentDate = new Date();
    let monthIndex = currentDate.getMonth();

    this.fields.map(e => {
      if (e['field_identifier'] == 'fromMonth') {
        e['options'] = this.months.filter((e, i) => {
          return i >= monthIndex && monthIndex != -1
        })
      }
    })

  }
  getCostCaseType() {
    return this.costCaseType;
  }
  updateToMonth(fromIndex) {
    let monthIndex = fromIndex;
    this.fields.map(e => {
      if (e['field_identifier'] == 'toMonth') {
        // e['default'] = this.months[fromIndex]
        // this.costCaseForm.controls['toMonth'].setValue(this.months[fromIndex])
        e['options'] = this.months.filter((e, i) => {
          return i >= monthIndex && monthIndex != -1
        })
      }
    })

  }
  getCommonFields(): Observable<any> {
    return this.httpClient.get('assets/data/cost-case/Common.json');
  }
  get fieldCtrl() { return this.costCaseForm.controls; }

  createControl() {
    let costCaseData = this.costCaseService.getCostCaseData()
    const group = this.formBuilder.group({});
    let control;
    let defaultVal;
    let debandValue = Object.keys(costCaseData).filter(e => {
      if (costCaseData[e] < 0) {
        return e;
      }
    });
    ////console.log(costCaseData);

    ////console.log(debandValue)
    this.fields.forEach(field => {
      defaultVal = costCaseData[field.field_identifier];
      if (field.field_identifier == 'deband') {
        defaultVal = debandValue[0] ? debandValue[0].replace('_', '-').toUpperCase() : "";
        // if (this.costCaseTemplate)
        // this.costCaseTemplate.addDeband(defaultVal)
      }
      if (field.required) {
        this.dropdownChange(field.field_identifier, defaultVal)
        control = this.formBuilder.control(
          defaultVal,
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

  addField(item) {
    if (this.costCaseForm)
      if (this.costCaseForm.value)
        if (!Object.keys(this.costCaseForm.value).includes(item.field_identifier)) {
          let control = this.formBuilder.control(
            item.default,
            Validators.required
          );
          this.costCaseForm.addControl(item.field_identifier, control)
        }
  }

  removeField(id, index) {
    if (this.costCaseForm)
      if (this.costCaseForm.value)
        if (Object.keys(this.costCaseForm.value).includes(id)) {
          this.costCaseForm.removeControl(id)
        }
  }

  dropdownChange(id, event) {

    let value = "";
    if (event) {
      if (event.value) {
        value = event.value
      } else {
        value = event;
      }
    }

    let costCaseData = this.costCaseService.getCostCaseData();
    let keys = this.fields.map((a) => a.field_name);

    if (id == 'costCaseType') {
      if (value !== 'DEBAND') {
        if (this.costCaseTemplate)
          this.costCaseTemplate.updateCostCaseType(value)
      }
      if (value == 'MOVE TO LOW COST' || value == 'CCN/PCR') {
        let currency = {
          "field_name": "CURRENCY",
          "field_type": "dropdown",
          "field_identifier": "currency",
          "options": [
            "CAD - Canadian Dollar",
            "EUR - Euro",
            "INR - Indian Rupee",
            "USD - United States Dollar"    
        ],
          "default": "INR - Indian Rupee",
          "required": true,
          "disabled": false
        }
        let json2 = {
          "field_name": "TCV",
          "field_type": "number",
          "field_identifier": "tcv",
          "options": "",
          "default": costCaseData['tcv'] ? costCaseData['tcv'] : "",
          "required": true,
          "disabled": false
        }
        if (!keys.includes('TCV')) {
          this.fields.splice(this.fields.length - 3, 0, currency)
          this.addField(currency)
          this.fields.splice(this.fields.length - 3, 0, json2)
          this.addField(json2)
        }
      } else {
        if (keys.includes('TCV')) {
          this.fields.splice(this.fields.length - 4, 1)
          this.removeField('currency', this.fields.length - 4)
          
          this.fields.splice(this.fields.length - 4, 1)
          this.removeField('tcv', this.fields.length - 4)
        }
      }
      // this.costCaseType = value
      if (value == 'CCN/PCR') {
        let json = {
          "field_name": "CCN/PCR",
          "field_type": "number",
          "field_identifier": "ccnPcr",
          "options": "",
          "default": costCaseData['ccnPcr'] ? costCaseData['ccnPcr'] : "",
          "required": true,
          "disabled": false
        }

        if (keys.includes('Deband')) {
          this.fields.splice(1, 1);
          if (keys.indexOf('Deband') > 0)
            keys.splice(keys.indexOf('Deband'), 1)
          this.removeField('deband', 1)
        }
        if (!keys.includes('CCN/PCR')) {
          this.fields.splice(1, 0, json)
          this.addField(json)
        }

      } else {
        if (keys.includes('CCN/PCR')) {
          this.fields.splice(1, 1);
          if (keys.indexOf('CCN/PCR') > 0)
            keys.splice(keys.indexOf('CCN/PCR'), 1)
          this.removeField('ccnPcr', 1)
        }
      }

      if (value == 'DEBAND') {

        let debandValue = Object.keys(costCaseData).filter(e => {
          if (costCaseData[e] < 0) {
            return e;
          }
        });
        if (this.costCaseTemplate) {
          if (debandValue[0]) {
            this.costCaseTemplate.addDeband(debandValue[0])
          }
        }
        let json = {
          "field_name": "Deband",
          "field_type": "dropdown",
          "field_identifier": "deband",
          "options": ["BAND-3", "BAND-4", "BAND-5", "BAND-6", "BAND-7", "BAND-8", "BAND-9"],
          "default": debandValue[0] ? debandValue[0].replace('_', '-').toUpperCase() : "",
          "required": true,
          "disabled": false
        }


        if (!keys.includes('Deband')) {
          this.fields.splice(1, 0, json)
          this.addField(json)
        }
      } else {

        if (keys.includes('Deband')) {
          this.fields.splice(1, 1);
          if (keys.indexOf('Deband') > 0)
            keys.splice(keys.indexOf('Deband'), 1)
          this.removeField('deband', 1)
        }
      }

    }
    if (id == 'fromMonth') {
      let toIndex = this.months.indexOf(value);
      this.updateToMonth(toIndex)
    }
    if (id == 'deband') {
      if (this.costCaseTemplate)
        this.costCaseTemplate.addDeband(value)
      this.debandValue = value
    }
  }
  saveData(id, val) {

    let json = this.costCaseForm.value;
    if (id == 'deptCode' || id == 'toMonth' || id == 'fromMonth')
      if (json['deptCode'].length == 3 && json['toMonth'] && json['fromMonth'])
        this.getData(json);
  }
  getData(data) {
    let params = data['deptCode'] + '/' + data['fromMonth'].toLowerCase() + '/' + data['toMonth'].toLowerCase();
    this.showTemplate = false;
    this.showSpinner = true;
    let subscription: Subscription;
    subscription = this.costCaseService.getDeptDetailsAndActualCostCase(params).subscribe(data => {
      this.costCaseForm = this.createControl();
      this.showTemplate = true;

      if (data['costCase']) {
        this.costCaseForm.controls['sdl'].setValue(data['sdl'])
        this.costCaseForm.controls['deptName'].setValue(data['deptName'])
        this.actualCostCase = data['costCase'];
        localStorage.setItem('actualCostCase', JSON.stringify(data['costCase']))
        this.showSpinner = false;
        if (this.costCaseTemplate)
          this.costCaseTemplate.addDeband(this.debandValue)
      } else {
        this.showSpinner = false;
        // this.showTemplate = false;
        this.notificationService.showSnackBar('NO DATA AVAILABLE')
      }
      subscription.unsubscribe();

    })
  }

  isDisable() {
    let costCaseData = this.costCaseService.getCostCaseData()
    if (this.costCaseForm)
      if (!this.costCaseForm.valid || !costCaseData['comments']) {
        return true;
      }
    return false;
  }

  formatDate(date): any {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }
  
  onReject() {
    let costCaseData = this.costCaseService.getCostCaseData();
    const dialogRef = this.dialog.open(RejectionCommentsComponent, {
      data: { data: costCaseData, status: 'REJECTED' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  onApprove() {
    let costCaseData = this.costCaseService.getActualCostCaseData();
    ////console.log(costCaseData);
    const dialogRef = this.dialog.open(ApprovalCommentsComponent, {
      data: { data: costCaseData, status: 'APPROVED' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  buttonActions() {
    if (this.userDetails.getRoles().includes('GRBEORD')) {
      return true;
    }
  }

}
