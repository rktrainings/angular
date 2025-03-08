import { Component, OnInit, Inject } from '@angular/core';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GrbMainTemplateComponent } from '../grb-main-template/grb-main-template.component';
import GRBDetails from 'src/assets/data/Hiring/Edit/GRB-Details.json';
import GOMDetails from 'src/assets/data/Hiring/Edit/GOM-Details.json';
import { CommonService } from 'src/app/services/common-service.service';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { template } from '@angular/core/src/render3';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-hiring-form-submit',
  templateUrl: './hiring-form-submit.component.html',
  styleUrls: ['./hiring-form-submit.component.scss']
})
export class HiringFormSubmitComponent implements OnInit {

  GRBfields = [];
  GOMfields = [];
  hireType = ""
  private postServiceUrl: any;
  private childFormName = "";
  private subscription: Subscription;
  private grbSubscribe: Subscription;
  private gomSubscribe: Subscription;
  invokeInternal: boolean = false;
  invokeExt1: boolean;
  invokeExt2: boolean;
  invokeExternal: boolean = false;

  private backFillData = [];
  private orpData = [];
  private templateData = {};
  backFillDataFields: any = {};
  invokeInternal1: boolean;
  invokeExt3: boolean;
  tramSubscribe: Subscription;
  TRAMfields: any = [];
  market =
    {

      "field_name": "Market",
      "field_type": "dropdown",
      "field_identifier": "market",
      "options": "",
      "default": null,
      "required": true,
      "disabled": false,
      "order": 3

    }
  marketCountry =
    {

      "field_name": "Market Country",
      "field_type": "dropdown",
      "field_identifier": "marketCountry",
      "options": "",
      "default": null,
      "required": true,
      "disabled": false,
      "order": 3

    }
  formName: any;
  hiringAs: any;
  constructor(private httpClient: HttpClient, private location: Location, private hiringFormService: HiringFormService, private route: ActivatedRoute, private common: CommonService,
    @Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<GrbMainTemplateComponent>) {

  }

  ngOnInit() {
    this.setData();
    setTimeout(() => {
      let path = this.location['_platformStrategy']._platformLocation.location.href;
      // if (!path.includes('edit-metro')) {
      this.getJSON();
      // }
    }, 0);
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
  setData() {
    this.childFormName = this.data['name']
    this.postServiceUrl = this.data['postServiceUrl']

    this.backFillData = this.data['backFillData'];
    this.orpData = this.data['orpData'];
    this.templateData = this.data['templateData'];

    if (this.backFillData.length > 0) {
      this.backFillDataFields = this.backFillData[0];
    }

    this.subscription = this.route.queryParams.subscribe(params => {
      this.hireType = params.hireType;
      this.formName = params.formName;
      console.log(this.hireType);

    });
    // setTimeout(() => {
    //   this.subscription.unsubscribe();
    // }, 1000000);
  }
  getJSON() {
    this.grbSubscribe = this.getGRB().subscribe(data => {
      this.GRBfields = data
      if (this.hireType == 'internal') {
        this.invokeInternal1 = true;
        this.GRBfields = this.GRBfields.filter(e => e.field_identifier !== 'subBand')
        if (localStorage.getItem('templateData')) {
          this.mapFields();
        } else {
          this.invokeInternal = true;
        }
      } else {
        let identifiers = this.GRBfields.map(e => e.field_identifier);
        let index = identifiers.indexOf('iot');
        this.GRBfields.splice(index + 1, 0, this.market)
        this.GRBfields.splice(index + 2, 0, this.marketCountry)
        console.log(this.GRBfields);

        this.invokeExt1 = true
      }
    });
    setTimeout(() => {
      this.gomSubscribe = this.getGOM().subscribe(data => {
        this.GOMfields = data

        if (this.hireType == 'external') {
          this.invokeExt2 = true
        }
        if (this.invokeExt1 && this.invokeExt2) {
          if (localStorage.getItem('templateData')) {
            this.mapFields();
          } else {
            if (this.invokeExt1 && this.invokeExt2) {
              this.invokeExternal = true;
            }
          }
        }
      });
    }, 0);

    setTimeout(() => {
      this.tramSubscribe = this.getTRAM().subscribe(data => {
        this.TRAMfields = data
        if (this.hireType == 'external') {
          this.invokeExt3 = true
        }
        if (this.invokeExt1 && this.invokeExt2 && this.invokeExt3) {
          if (localStorage.getItem('templateData')) {
            console.log("bef map");

            this.mapFields();
          } else {
            console.log("bef map-else");
            if (this.invokeExt1 && this.invokeExt2 && this.invokeExt3) {
              this.invokeExternal = true;
            }
          }
        }
      });
    }, 5);



    // setTimeout(() => {
    //   // if (this.invokeExt1 && this.invokeExt2 && this.invokeExt3) {
    //   //   this.invokeExternal = true;

    //   // }
    //   this.grbSubscribe.unsubscribe()
    //   this.gomSubscribe.unsubscribe()
    //   this.tramSubscribe.unsubscribe()
    // }, 10000000);


  }
  close() {
    this.dialogRef.close()
  }


  mapFields() {
    console.log("in map");

    this.templateData = JSON.parse(localStorage.getItem('templateData'))
   

    let disableFields = ['deptCode', 'deptName', 'supId', 'supName', 'attritionYTDPercentage', 'accountUTEPercentage',
      'practice', 'accountType', 'location', 'tower', 'country', 'geo', 'iot', 'actualHeadCount']
    if (!this.hiringAs) {
      if (this.templateData['hiringAs']) {
        this.hiringAs = this.templateData['hiringAs'];
      }
    }
    if(this.hiringAs)
    if (this.hiringAs.toLowerCase().includes('conversion') && (this.hiringAs.toLowerCase().includes('extension') || this.hiringAs.toLowerCase().includes('promotion')) && this.hireType == 'external') {
      this.GRBfields = this.GRBfields.filter(e => e.field_identifier != 'subBand')
    }

    this.GRBfields.map((e, i) => {
      e['default'] = this.templateData[e['field_identifier']];
      e['disabled'] = true;
      if (!disableFields.includes(e['field_identifier'])) {
        e['disabled'] = false;
      }
      if (e.field_identifier == 'hiringReason') {
        if (this.templateData['hiringReason'])
          if (this.templateData['hiringReason'].toLowerCase().includes('backfill')) {
            e['default'] = this.templateData[e['field_identifier']];
            e['options'] = ['BACKFILL', 'BACKFILL CRITITCAL']
          } else {
            e['field_type'] = "text"
            e['disabled'] = false;
            e['default'] = this.templateData[e['field_identifier']];
          }
        if (e.field_identifier == 'marketCountry') {
          e['default'] = this.templateData[e['field_identifier']] ? this.templateData[e['field_identifier']].toUpperCase() : ""
        }
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
      if (e.field_identifier === 'gicResourceType') {
        e['default'] = this.gicResourceType(this.templateData['resourceContractType']);
        e['disabled'] = true;
      }
    })

    if (this.backFillData['hiringAs'])
      if (this.backFillData['hiringAs'].toLowerCase().includes('new growth')) {
        // this.addGoLiveDate();
      }
    this.GOMfields.map(e => {
      e['default'] = this.templateData[e['field_identifier']];
      e['disabled'] = false;
      if (e.field_identifier == 'isAccountHasRestrictions') {
        e['default'] = this.templateData[e['field_identifier']];
      }

    })

    if (this.invokeExt3)
      this.TRAMfields.map(e => {
        e['default'] = this.templateData[e['field_identifier']];
        e['disabled'] = false;
      })
    console.log(this.formName)
    if (this.formName)
      if (this.formName.includes('grbArchive')) {
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

    if (this.invokeExt1 && this.invokeExt2 && this.invokeExt3) {
      this.invokeExternal = true;
    }

    console.log(this.invokeExternal);

    if (this.invokeInternal1) {
      this.invokeInternal = true;
    }
  }

  addGoLiveDate() {
    let obj = {
      "field_name": "Go Live Date",
      "field_type": "date",
      "field_identifier": "goLiveDate",
      "options": "",
      "default": this.templateData['goLiveDate'] ? this.templateData['goLiveDate'] : '',
      "required": true,
      "disabled": false,
      "order": 21
    }
    this.GRBfields.splice(this.GRBfields.length - 3, 0)



  }

  gicResourceType(value: any) {

    if (value === 'REGULAR FULL TIME' || value === 'REGULAR PART TIME') {
      value = 'REGULAR';
    } else if (value === 'NON REGULAR') {
      value = 'NON REGULAR';
    } else if (value === 'SUBCONTRACTOR') {
      value = 'SUB-CONTRACTOR';
    }
  }
}
