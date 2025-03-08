import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { CiReleaseService } from 'src/app/services/ci-release.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CiReleaseCommentsComponent } from '../ci-release-comments/ci-release-comments.component';

@Component({
  selector: 'app-ci-release',
  templateUrl: './ci-release.component.html',
  styleUrls: ['./ci-release.component.scss']
})
export class CiReleaseComponent implements OnInit {

  ciReleaseForm: FormGroup;
  fteFields = [];
  savingsFields = [];
  commonFields = [];
  fields: any = [];
  showSpinner: boolean;
  balanceFteCount = 0;
  empDetailsSubscription: Subscription;
  ccnPcrDetailsSubscription: Subscription;
  validCCNPCRSubscription: Subscription;
  ccnPcrMonthsSubscription: Subscription;
  ccnPcrNumbers: Object;
  validDeptSubscription: Subscription;
  deptDetails: Object;

  constructor(private spinner: NgxSpinnerService, private dialog: MatDialog, private httpClient: HttpClient, private notification: NotificationService,
    private formBuilder: FormBuilder, private ciReleaseService: CiReleaseService) { }

  ngOnInit() {
    this.getFTEFields().subscribe(data => {
      this.fteFields = data
    })
    this.get$savings().subscribe(data => {
      this.savingsFields = data
    })
    this.getCommonFields().subscribe(data => {
      data.map(e => {
        if (e.field_identifier == 'qtrOfRelease') {
          e.options = this.getQuarterPickerValues()
        }
      })
      this.commonFields = data
      this.fields = data;
      this.ciReleaseForm = this.createControl();
    })

  }

  getQuarterPickerValues() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let previousYear = currentYear - 1;
    let quarterPickerArray = [];

    if (currentMonth >= 9 && currentMonth <= 11) {
      quarterPickerArray.push('Q4 ' + currentYear);
      quarterPickerArray.push('Q3 ' + currentYear);
      quarterPickerArray.push('Q2 ' + currentYear);
      quarterPickerArray.push('Q1 ' + currentYear);

    }
    if (currentMonth >= 6 && currentMonth <= 8) {
      quarterPickerArray.push('Q3 ' + currentYear);
      quarterPickerArray.push('Q2 ' + currentYear);
      quarterPickerArray.push('Q1 ' + currentYear);
    }
    if (currentMonth >= 3 && currentMonth <= 5) {
      quarterPickerArray.push('Q2 ' + currentYear);
      quarterPickerArray.push('Q1 ' + currentYear);
    }
    if (currentMonth >= 0 && currentMonth <= 2) {
      quarterPickerArray.push('Q1 ' + currentYear);
    }
    quarterPickerArray.push('Q4 ' + previousYear);
    quarterPickerArray.push('Q3 ' + previousYear);
    quarterPickerArray.push('Q2 ' + previousYear);
    quarterPickerArray.push('Q1 ' + previousYear);

    return quarterPickerArray;

  }
  getFTEFields(): Observable<any> {
    return this.httpClient.get('assets/data/ci-release/fteRelease.json');
  }
  get$savings(): Observable<any> {
    return this.httpClient.get('assets/data/ci-release/$savings.json');
  }
  getCommonFields(): Observable<any> {
    return this.httpClient.get('assets/data/ci-release/common.json');
  }

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

  isDisable() {
    if (this.ciReleaseForm)
      if (this.ciReleaseForm.valid) {
        return false;
      }
    return true;
  }
  dropdownChange(id, event) {
    let val = event.value;
    let keys = this.fields.map((a) => a.field_name);

    if (id == 'requestType') {
      if (val.toLowerCase().includes('saving')) {

        if (this.empDetailsSubscription)
          this.empDetailsSubscription.unsubscribe()

        if (this.validDeptSubscription)
          this.validDeptSubscription.unsubscribe()

        this.showSpinner = false;

        if (keys.includes('Band')) {
          this.fteFields.reverse().forEach(e => {
            this.removeField(e.field_identifier, 1)
          })
        }
        this.savingsFields.reverse().forEach(e => {
          this.fields.splice(1, 0, e)
          this.addField(e)
        })
        this.fields.map(e => {
          if (e.field_identifier == 'monthOfRelease') {
            e.options = [];
          }
          if (this.ciReleaseForm.controls[e.field_identifier] && e.field_identifier !== 'requestType' && e.field_identifier !== 'subProcess') {
            this.ciReleaseForm.controls[e.field_identifier].setValue(null)
          }
        })
        this.getValidCCNPCR();
      } else {

        this.getDeptDetails();

        if (this.ccnPcrDetailsSubscription)
          this.ccnPcrDetailsSubscription.unsubscribe();

        if (this.validCCNPCRSubscription)
          this.validCCNPCRSubscription.unsubscribe();

        if (this.ccnPcrMonthsSubscription)
          this.ccnPcrMonthsSubscription.unsubscribe()
        this.showSpinner = false;
        if (keys.includes('CCN/PCR')) {
          this.savingsFields.reverse().forEach(e => {
            this.removeField(e.field_identifier, 1)
          })
        }
        this.fteFields.reverse().forEach(e => {
          this.fields.splice(1, 0, e)
          this.addField(e)
        })
        this.fields.map(e => {
          if (this.ciReleaseForm.controls[e.field_identifier] && e.field_identifier !== 'requestType' && e.field_identifier !== 'subProcess') {
            this.ciReleaseForm.controls[e.field_identifier].setValue(null)
          }
        })
      }
    }

    if (id == 'ccnpcr_number') {
      // this.getCCNPCRMonths()
      this.fields.map(e => {
        if (e.field_identifier == 'monthOfRelease') {
          e.options = this.ccnPcrNumbers[this.ciReleaseForm.value.ccnpcr_number];
        }
      })
    }

    if(id=='deptCode'){

      this.ciReleaseForm.controls['deptName'].setValue(this.deptDetails[val]['deptName'])
      this.ciReleaseForm.controls['sdlName'].setValue(this.deptDetails[val]['sdlName'])

    }
  }

  getValidCCNPCR() {
    // this.showSpinner = true;
    this.spinner.show();
    this.validCCNPCRSubscription = this.ciReleaseService.getValidCCNPCR().subscribe(data => {
      // this.showSpinner = false;
      this.spinner.hide();
   

      this.ccnPcrNumbers = data;
      this.fields.map(e => {
        if (e.field_identifier == 'ccnpcr_number') {
          e.options = Object.keys(data);
        }
      })
    })
  }

  getDeptDetails() {
    // this.showSpinner = true;
    this.spinner.show();
    this.validDeptSubscription = this.ciReleaseService.getDeptDetails().subscribe(data => {
      // this.showSpinner = false;
      this.spinner.hide();

      this.deptDetails = data;
      this.fields.map(e => {
        if (e.field_identifier == 'deptCode') {
          e.options = Object.keys(data).sort();
          e.disabled = false;
          e.field_type = 'dropdown';
        }
      })
    })
  }
  // getCCNPCRMonths() {
  //   let ccnPcrNumber = this.ciReleaseForm.value.ccnpcr_number;
  //   if (ccnPcrNumber)
  //     if (ccnPcrNumber.length > 0) {
  //       this.showSpinner = true;
  //      this.ccnPcrMonthsSubscription = this.ciReleaseService.getCCNPCRMonths(ccnPcrNumber).subscribe(data => {
  //         this.showSpinner = false;
  //         this.fields.map(e => {
  //           if (e.field_identifier == 'monthOfRelease') {
  //             e.options = data['months']
  //           }
  //         })
  //       })
  //     }

  // }
  assignValues(data) {
    let empActive = false;
    if(data['empStatus'])
    if (data['empStatus'].toLowerCase() == 'active') {
      empActive = true;
    }
    Object.keys(data).forEach(e => {
      if (this.ciReleaseForm.controls[e] && e != 'requestType' && e != 'projectId' && e != 'projectName' && e != 'releaseDetails' && e != 'qtrOfRelease' && e != 'subProcess') {
        this.ciReleaseForm.controls[e].setValue(data[e])
      }

    })

    this.fields.map(e => {
      if (e.field_identifier == 'releaseDetails') {
        if (empActive) {
          e['default'] = "";
          e['options'] = ["Incremental Revenue", "Moved to different department", "Moved to different process within the same department", "Bench Release", "CCN / PCR Not Hired"];
          e['disabled'] = false;

        } else {
          e['default'] = "Attrited from IBM";
          e['options'] = ["Attrited from IBM"];
          e['disabled'] = true;
          this.ciReleaseForm.controls[e.field_identifier].setValue(e['default']);
          this.ciReleaseForm.controls[e.field_identifier].disable();
        }
      }
    })
  }
  onChange(id, val) {

    let empId=this.ciReleaseForm.value.empId
    let deptCode=this.ciReleaseForm.value.deptCode;
    if(id == 'empId' || id == 'deptCode')
    if(empId)
    if (empId.length>0 && empId && deptCode) {
      // if (val)
        // if (val.length == 6) {
          this.showSpinner = true;
          this.empDetailsSubscription = this.ciReleaseService.getEmployeeDetails(empId.toUpperCase()+'/'+deptCode).subscribe(data => {
            this.showSpinner = false;
            delete data['deptCode'];
            delete data['deptName'];
            delete data['sdlName'];
            delete data['monthOfRelease'];
            if (data['statusMessage'] !== 'VALIDATED') {
              this.notification.openSnackBar(data['statusMessage']);
              this.ciReleaseForm.controls['empId'].setValue(null);
            } else {
              this.assignValues(data);
            }
          })
        // }
    }
    if (id == 'ccnpcr_number' || id == 'monthOfRelease')
      if (this.ciReleaseForm.value.ccnpcr_number && this.ciReleaseForm.value.monthOfRelease)
        if (this.ciReleaseForm.value.ccnpcr_number.length > 0) {
          this.showSpinner = true;
          this.ccnPcrDetailsSubscription = this.ciReleaseService.getCCNPCRDetails(this.ciReleaseForm.value.ccnpcr_number, this.ciReleaseForm.value.monthOfRelease).subscribe(data => {
            this.showSpinner = false;
            if (data['balanceFteCount'])
              this.balanceFteCount = data['balanceFteCount']

            this.assignValues(data);

          })
        }
  }
  addField(item) {
    if (!Object.keys(this.ciReleaseForm.value).includes(item.field_identifier)) {
      let control = this.formBuilder.control(
        item.default,
        Validators.required
      );
      this.ciReleaseForm.addControl(item.field_identifier, control)
    }
  }

  removeField(id, index) {
    if (Object.keys(this.ciReleaseForm.value).includes(id)) {
      this.fields.splice(index, 1)
      this.ciReleaseForm.removeControl(id)
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(CiReleaseCommentsComponent, {
      data: this.ciReleaseForm.value,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
