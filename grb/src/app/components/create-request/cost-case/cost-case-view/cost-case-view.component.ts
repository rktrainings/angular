import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CostCaseService } from 'src/app/services/cost-case.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { CostCaseTemplateComponent } from 'src/app/components/cost-case-template/cost-case-template.component';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cost-case-view',
  templateUrl: './cost-case-view.component.html',
  styleUrls: ['./cost-case-view.component.scss']
})
export class CostCaseViewComponent implements OnInit {
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
  actualCostCaseTemp: any = {}
  deptExists: boolean = false;
  deptSubscription: Subscription;

  constructor(private ngxSpinner: NgxSpinnerService, private location: Location, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,
    private costCaseService: CostCaseService, private userDetails: UserDetailsService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.getCommonFields().subscribe(data => {
      this.fields = data;
      ////console.log(this.userDetails.getRoles());
      if(!(this.userDetails.getRoles().includes('ADMIN') || 
      this.userDetails.getRoles().includes('GRBEO'))){
      this.fields.map(e=>{
        if (e['field_identifier'] == 'deptCode') {
          e['field_type']='dropdown'
          e['options']=this.userDetails.getDeptCodes()
        }
      })
    }
      this.updateFromMonth();
      this.costCaseForm = this.createControl();
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

    const group = this.formBuilder.group({});
    let control;
    let defaultVal;
    this.fields.forEach(field => {
      defaultVal = field.default;
      if (field.required) {
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
    if (!Object.keys(this.costCaseForm.value).includes(item.field_identifier)) {
      let control = this.formBuilder.control(
        item.default,
        Validators.required
      );
      this.costCaseForm.addControl(item.field_identifier, control)
    }
  }

  removeField(id, index) {
    ////console.log(this.costCaseForm.value)
    if (Object.keys(this.costCaseForm.value).includes(id)) {
      this.fields.splice(index, 1)
      this.costCaseForm.removeControl(id)
    }
  }

  dropdownChange(id, event) {

    let value = event.value;
    //////console.log(event)
    let keys = this.fields.map((a) => a.field_name);
    if (id == 'costCaseType') {
      this.costCaseType = value;

      if (event.value !== 'DEBAND') {
        this.debandValue = ""
      }

      if (this.costCaseTemplate){
        this.costCaseTemplate.updateCostCaseType(value)
        this.costCaseTemplate.removeFile();
        this.costCaseTemplate['comments'] = '';
      }

      if (event.value == 'MOVE TO LOW COST' || event.value == 'CCN/PCR') {
    

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
          "default": 0,
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
          this.removeField('currency', this.fields.length - 4)
          this.removeField('tcv', this.fields.length - 4)
        }
      }

      if (event.value == 'CCN/PCR') {
        let json1 = {
          "field_name": "CCN/PCR",
          "field_type": "number",
          "field_identifier": "ccnPcr",
          "options": "",
          "default": "",
          "required": true,
          "disabled": false
        }

        if (keys.includes('Deband')) {
          this.removeField('deband', 1)
        }
        if (!keys.includes('CCN/PCR')) {
          this.fields.splice(1, 0, json1)
          this.addField(json1);
        }
      } else {
        if (keys.includes('CCN/PCR')) {
          this.removeField('ccnPcr', 1)
        }
      }
      ////console.log(keys)

      if (event.value == 'DEBAND') {

        if (this.costCaseTemplate)
          this.costCaseTemplate.addDeband(value)
        let json = {
          "field_name": "Deband",
          "field_type": "dropdown",
          "field_identifier": "deband",
          "options": ["BAND-3", "BAND-4", "BAND-5", "BAND-6", "BAND-7", "BAND-8", "BAND-9"],
          "default": 0,
          "required": true,
          "disabled": false
        }
        let keys = this.fields.map((a) => a.field_name);
        if (!keys.includes('Deband')) {
          this.fields.splice(1, 0, json)
          this.addField(json)
        }
      } else {
        if (keys.includes('Deband')) {
          this.removeField('deband', 1)
        }
      }

    }
    if (id == 'fromMonth') {
      let toIndex = this.months.indexOf(value);
      this.updateToMonth(toIndex)
    }
    ////console.log(id)
    if (id == 'deband') {
      ////console.log(value)
      if (this.costCaseTemplate)
        this.costCaseTemplate.addDeband(value)
      this.debandValue = value
    }
  }
  saveData(id, val) {
    ////console.log(val);
    // if (id == 'deptCode' && val.length == 3) {
    //   let deptCodes = this.userDetails.getDeptCodes();
    //   if (deptCodes.includes(val.toUpperCase())) {
    //     this.deptExists = true;
    //     if(this.showSpinner)
    //     this.deptSubscription.unsubscribe();
    //   } else {
    //     this.deptExists = false;
    //     this.showTemplate = false;
    //     this.showSpinner = false;
    //     this.deptSubscription.unsubscribe();
    //     this.costCaseForm.controls['deptCode'].setValue('');
    //     this.notificationService.showSnackBar("Sorry!!...You don't have access to " + val.toUpperCase());
    //     return;
    //   }
    // }
    let json = this.costCaseForm.value;
    ////console.log(json);
    ////console.log(this.deptExists);

    if (id == 'deptCode' || id == 'toMonth' || id == 'fromMonth'){
      if (json['deptCode'].length==3 && json['toMonth'] && json['fromMonth']) {
        if(this.showSpinner)
        if(this.deptSubscription)
        if(!this.deptSubscription.closed)
        this.deptSubscription.unsubscribe();
        this.getData(json);
      }
      else {
        if(this.deptSubscription)
        if(!this.deptSubscription.closed)
        this.deptSubscription.unsubscribe();
        this.showTemplate = false;
        this.showSpinner = false;
      }
    }
  }
  getData(data) {
    let params = data['deptCode'] + '/' + data['fromMonth'].toLowerCase() + '/' + data['toMonth'].toLowerCase();
    this.showTemplate = false;
    this.showSpinner = true;
    this.deptSubscription = this.costCaseService.getDeptDetailsAndActualCostCase(params).subscribe(data => {
      ////console.log(data)
      if (data['costCase']) {
        this.costCaseForm.controls['sdl'].setValue(data['sdl'])
        this.costCaseForm.controls['deptName'].setValue(data['deptName'])
        this.actualCostCase = data['costCase'];
        localStorage.setItem('actualCostCase', JSON.stringify(data['costCase']))
        this.showTemplate = true;
        this.showSpinner = false;

        setTimeout(() => {
          ////console.log(this.costCaseTemplate);
          ////console.log(this.costCaseType)
          if (this.costCaseType.toLowerCase().includes('deband')) {
            if (this.costCaseTemplate)
              this.costCaseTemplate.addDeband(this.debandValue)
          } else {
            if (this.costCaseTemplate)
              this.costCaseTemplate.updateCostCaseType(this.costCaseType)
          }
        })

      } else {
        this.showSpinner = false;
        this.showTemplate = false;
        this.notificationService.showSnackBar('NO DATA AVAILABLE')
      }
      this.deptSubscription.unsubscribe();

    })
  }

  isDisable() {
    let costCaseData = this.costCaseService.getCostCaseData();
   // console.log(costCaseData);
    
    if (this.costCaseForm)
      if (costCaseData['costCaseType']) {
        if (!costCaseData['costCaseType'].toLowerCase().includes('deband')) {
          if (!this.costCaseForm.valid || !costCaseData['comments'] || !costCaseData['file']) {
            return true;
          }
        } else {
          if (!this.costCaseForm.valid || !costCaseData['comments'] || !costCaseData['file'] || costCaseData['total'] != 0) {
            return true;
          }
        }
      } else {
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
  onSubmit() {
    let costCaseData = this.costCaseService.getCostCaseData()
    ////console.log(this.costCaseForm.value);
    
    costCaseData = { ...costCaseData, ...this.costCaseForm.value }
    costCaseData['status'] = "SUBMITTED"
    costCaseData['userName'] = this.userDetails.getUserName();
    costCaseData['submittedDate'] = this.formatDate(new Date());
    costCaseData['year'] = new Date(Date.now()).getFullYear().toString();

    costCaseData['totalQtyHired'] = 0;

    if (!costCaseData['ccnPcr']) {
      costCaseData['ccnPcr'] = null;
    }

    var formData = new FormData();
    formData.append('file', costCaseData['file']),
      delete costCaseData['file']
    formData.append('data', JSON.stringify(costCaseData)),

      this.ngxSpinner.show();
    this.costCaseService.submitCostCaseRequest(formData).subscribe(data => {
      ////console.log(data)
      if (data['msg']) {
        this.ngxSpinner.hide();
        this.notificationService.showSnackBar(data['msg']);
        this.router.navigateByUrl('/main-menu');
      }
      // this.subscription.unsubscribe();

    })
  }
}
