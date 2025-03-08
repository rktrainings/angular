import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { CiReleaseService } from 'src/app/services/ci-release.service';
import { browserRefresh } from 'src/app/components/header/header.component';

import { CiReleaseApproverCommentsComponent } from '../ci-release-approver-comments/ci-release-approver-comments.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ci-release-view',
  templateUrl: './ci-release-view.component.html',
  styleUrls: ['./ci-release-view.component.scss']
})
export class CiReleaseViewComponent implements OnInit {

  ciReleaseData = {}
  fields = [];
  ciReleaseForm: FormGroup;
  showSpinner = false;
  browserRefresh: any;

  constructor(private _location:Location,private dialog: MatDialog, private ciReleaseService: CiReleaseService, private httpClient: HttpClient, private formBuilder: FormBuilder) { 
    this.browserRefresh = browserRefresh
    if (this.browserRefresh) {
      this._location.back();
    }
  }

  ngOnInit() {
    this.ciReleaseData = this.ciReleaseService.getCIReleaseData();
    ////console.log(this.ciReleaseData);
    
    // this.ciReleaseData['requestType'] = "FTE"
    this.getForm();
  }

  getForm() {
    if(this.ciReleaseData['requestType'])
    if (this.ciReleaseData['requestType'].toLowerCase().includes('savings')) {
      this.get$savings().subscribe(fteData => {
        let index = fteData.map(e=>e.field_identifier).indexOf('balanceFteCount');
        fteData.splice(index,1);
        this.getCommonFields().subscribe(data => {
          this.appendFields(fteData, data);
        })
      })
    } else {
      this.getFTEFields().subscribe(fteData => {
        this.getCommonFields().subscribe(data => {
          this.appendFields(fteData, data);
        })
      })
    }
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

  appendFields(array, commonFields) {
    array.reverse().forEach(e => {
      commonFields.splice(1, 0, e);
    })
    this.fields = commonFields;

    ////console.log(this.fields);
    this.fields.map(e => {
      e.disabled = true;
      e.field_type = "text"
    })
    this.ciReleaseForm = this.createControl();
  }

  createControl() {

    const group = this.formBuilder.group({});
    let control;
    let defaultVal;

    this.fields.forEach(field => {
      defaultVal = this.ciReleaseData[field.field_identifier] || 'NA';
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

  onSubmit(status) {
    const dialogRef = this.dialog.open(CiReleaseApproverCommentsComponent, {
      data:{ciReleaseData: this.ciReleaseData,status:status},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
