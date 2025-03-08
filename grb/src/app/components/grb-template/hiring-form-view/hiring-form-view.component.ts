import { Component, OnInit, Inject, Input } from '@angular/core';
// import GRBDetails from 'src/assets/data/Hiring/View/GRB-Details.json';
// import GOMDetails from 'src/assets/data/Hiring/View/GOM-Details.json';


import { HiringFormService } from 'src/app/services/hiring-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { GrbMainTemplateComponent } from '../grb-main-template/grb-main-template.component';
import { CommonService } from 'src/app/services/common-service.service';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileDetector } from 'protractor';
import { CcComponent } from '../dialogs/sticky/cc/cc.component';
import { BandmixComponent } from '../dialogs/sticky/bandmix/bandmix.component';
import { UteComponent } from '../dialogs/sticky/ute/ute.component';

@Component({
  selector: 'app-hiring-form-view',
  templateUrl: './hiring-form-view.component.html',
  styleUrls: ['./hiring-form-view.component.scss']
})
export class HiringFormViewComponent implements OnInit {

  GRBfields = [];
  GOMfields = [];
  TRAMfields = []
  hireType = ""
  formName = "";
  tollName = "";
  childFormName = "";
  private subscription: Subscription
  grbSubscribe: Subscription;
  invokeInternal: boolean = false;
  invokeExt1: boolean;
  gomSubscribe: Subscription;
  invokeExt2: boolean;
  invokeExternal: boolean = false;
  private backFillData = [];
  private orpData = [];
  private templateData = {};
  invokeInternal1: any;
  // stickyLabels = ['Cost Case', 'Bandmix', 'UTE'];
  stickyLabels = ['CC', 'BM', 'UTE'];
  showSticky: boolean = false;


  tramSubscribe: Subscription;
  invokeExt3: boolean;


  market =
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
  marketCountry =
    {

      "field_name": "Market Country",
      "field_type": "dropdown",
      "field_identifier": "marketCountry",
      "options": "",
      "default": "",
      "required": true,
      "disabled": false,
      "order": 3

    }
  hiringAs: any;
  constructor(private hiringFormService: HiringFormService, private httpClient: HttpClient,
    public route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GrbMainTemplateComponent>, private common: CommonService,
    private dialog: MatDialog) {


  }

  ngOnInit() {
    this.setData();
    this.getJSON();

  }

  setData() {
    this.childFormName = this.data['name'];
    this.backFillData = this.data['backFillData'];
    this.orpData = this.data['orpData'];
    this.templateData = this.data['templateData'];

    this.subscription = this.route.queryParams.subscribe(params => {
      this.formName = params.formName ? params.formName : "";
      this.tollName = params.tollName ? params.tollName : "";
      this.hireType = params.hireType ? params.hireType : "";
      //console.log('formName: ', this.formName);
      this.displaySticky(this.formName);
    });

    setTimeout(() => {
      this.subscription.unsubscribe();
    }, 1000);


  }

  displaySticky(formName: any) {
    if (formName == 'iot' || formName == 'board' || formName == 'bizops' || formName == 'tolls') {
      this.showSticky = true;
      //console.log('showSticky: ', this.showSticky);
    }
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
    this.grbSubscribe = this.getGRB().subscribe(data => {
      this.GRBfields = data
      if (this.hireType == 'internal') {
        this.GRBfields = this.GRBfields.filter(e => e.field_identifier !== 'subBand')
        setTimeout(() => {
          this.invokeInternal1 = true;
          this.mapFields();
        }, 10)
        //////console.log(this.invokeInternal1);
        //////console.log(this.GRBfields)
      } else {
        let identifiers = this.GRBfields.map(e => e.field_identifier);
        let index = identifiers.indexOf('iot');
        this.GRBfields.splice(index + 1, 0, this.market)
        this.GRBfields.splice(index + 2, 0, this.marketCountry)
        this.invokeExt1 = true
      }
    });
    if (this.hireType == 'external') {
      this.gomSubscribe = this.getGOM().subscribe(data => {
        this.GOMfields = data
        this.invokeExt2 = true
        setTimeout(() => {
          if (this.invokeExt1 && this.invokeExt2) {
            this.mapFields();
          }
        }, 100);
      });
      this.tramSubscribe = this.getTRAM().subscribe(data => {
        this.TRAMfields = data
        this.invokeExt3 = true
        setTimeout(() => {
          if (this.invokeExt1 && this.invokeExt2 && this.invokeExt3) {
            this.mapFields();
          }
        }, 100);
      });
    }
    setTimeout(() => {
      this.grbSubscribe.unsubscribe()
      this.gomSubscribe.unsubscribe()
      this.tramSubscribe.unsubscribe()
    }, 10000000);


  }
  mapFields() {
    //////console.log(this.GRBfields)
    //////console.log(this.childFormName)
    if (!this.hiringAs) {
      if (this.templateData['hiringAs']) {
        this.hiringAs = this.templateData['hiringAs'];
      }
    }
    if(this.hiringAs)
    if (this.hiringAs.toLowerCase().includes('conversion') && (this.hiringAs.toLowerCase().includes('extension') || this.hiringAs.toLowerCase().includes('promotion')) && this.hireType == 'external') {
      this.GRBfields = this.GRBfields.filter(e => e.field_identifier != 'subBand')
    }
    if (this.formName.includes('iot') || this.formName.includes('board') || this.formName.includes('tolls') || this.childFormName == 'Preview') {
      this.GRBfields.map((e, i) => {
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
        e['default'] = this.templateData[e['field_identifier']];
        e['disabled'] = true;
        if(e.field_identifier=='marketCountry'){
          e['default']=this.templateData[e['field_identifier']]?this.templateData[e['field_identifier']].toUpperCase():""
        }
        ////////console.log(e)
        if (e['field_type'] !== "textarea" && e['field_type'] !== "date" && e['field_type'] !== "upload" && e['field_type'] !== "span") {
          e['field_type'] = "text"
        }
        // if (e.field_identifier == 'upload') {
        //   //////console.log('hei')
        //   e['field_type'] = "span"
        // }
      })
      //////console.log(this.GRBfields)

      this.GOMfields.map(e => {
        e['default'] = this.templateData[e['field_identifier']];
        if (e['field_type'] !== "textarea" && e['field_type'] !== "date") {
          e['field_type'] = "text"
        }
        e['disabled'] = true;
      })

    } else {
      let disableFields = ['deptCode', 'deptName', 'supId', 'supName', 'gpPercentage', 'attritionYTDPercentage', 'accountUTEPercentage',
        'practice', 'accountType', 'location', 'tower', 'country', 'geo', 'iot', 'actualHeadCount']
      this.GRBfields.map(e => {
        e['default'] = this.templateData[e['field_identifier']];
        e['disabled'] = true;
        if (!disableFields.includes(e['field_identifier'])) {
          e['disabled'] = false;
        }
        if (e.field_identifier == 'hiringReason') {
          if (this.templateData['hiringReason'])
            if (this.templateData['hiringReason'].toLowerCase().includes('backfill')) {
              e['default'] = this.templateData[e['field_identifier']];
              e['options'] = ['BACKFILL', 'BACKFILL CRITICAL']
            } else {
              e['field_type'] = "text"
              e['disabled'] = false;
              e['default'] = this.templateData[e['field_identifier']];
            }
        }
        if (e.field_type == 'upload') {
          e.field_type = 'span'
        }
      })
      this.GOMfields.map(e => {
        e['default'] = this.templateData[e['field_identifier']];
        e['disabled'] = false;
        if (e.field_identifier == 'isAccountHasRestrictions') {
          e['default'] = this.templateData[e['field_identifier']];
        }

      })
    }

    this.TRAMfields.map(e => {
      e['default'] = this.templateData[e['field_identifier']];
      if (e['field_type'] !== "textarea" && e['field_type'] !== "date") {
        e['field_type'] = "text"
      }
      e['disabled'] = true;
    })

    console.log(this.formName)
    if(this.formName)
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
    if (this.invokeInternal1) {
      this.invokeInternal = true;
    }

  }
  close() {
    this.dialogRef.close()
  }

  openDialog(sticky: any) {
    //console.log(sticky);
    // switch (sticky) {
    //   case 'Cost Case':
    //     this.openCostCaseDialog();
    //     break;
    //   case 'Bandmix':
    //     this.openBandmixDialog();
    //     break;
    //   case 'UTE':
    //     this.openUTEDialog();
    //     break;
    // }
    switch (sticky) {
      case 'CC':
        this.openCostCaseDialog();
        break;
      case 'BM':
        this.openBandmixDialog();
        break;
      case 'UTE':
        this.openUTEDialog();
        break;
    }

  }

  openCostCaseDialog() {
    ////console.log('openCostCaseDialog');
    const dialogRef = this.dialog.open(CcComponent, {
      // width: '120vh',
      // height: '85vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });

  }

  openBandmixDialog() {
    ////console.log('openBandmixDialog');
    const dialogRef = this.dialog.open(BandmixComponent, {
      width: '80vh',
      height: '50vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openUTEDialog() {
    ////console.log('openUTEDialog');
    const dialogRef = this.dialog.open(UteComponent, {
      // width: '80vh',
      // height: '65vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  topPosition(index: any) {
    switch (index) {
      case 0:
        return '85px';
      case 1:
        return '120px';
      case 2:
        return '155px';
    }

  }

}
