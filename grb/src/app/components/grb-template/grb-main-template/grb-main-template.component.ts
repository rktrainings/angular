import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HiringFormService } from 'src/app/services/hiring-form.service';

import { Location } from '@angular/common';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { browserRefresh } from 'src/app/components/header/header.component';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-grb-main-template',
  templateUrl: './grb-main-template.component.html',
  styleUrls: ['./grb-main-template.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }]

})
export class GrbMainTemplateComponent implements OnInit {
  hiringAs: string;
  previousUrl: string
  subscription: Subscription;
  browserRefresh: any;
  heading: boolean = true;
  subscribeRoute: Subscription;
  formType: any;
  showMetro: boolean = false;
  metroNo: any;
  constructor(private commonService: CommonService,private spinner:NgxSpinnerService, private location: Location, private activatedRoute: ActivatedRoute, private hiringFormService: HiringFormService, private hiringForm: HiringFormService, private _location: Location, router: Router) {
    this.hiringAs = this.hiringFormService.getHiringAs();

    this.browserRefresh = browserRefresh
    ////////console.log(this.browserRefresh)
    if (this.browserRefresh) {
      this._location.back();
      localStorage.removeItem('maxTotalQty')
    }

  }

  ngOnInit() {
    ////////console.log("new-cards")
    // setTimeout(() => {
    this.getTemplateData();
    // }, 0);
    this.findActivatedRoute();
    setTimeout(() => {      
      // this.generateMetro()
    }, 0);
  }

  generateMetro() {
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (path.includes('create-request')) {
      let metroNo = this.hiringFormService.generateMetroNumber();
      let newURL = ""
      if (this.hiringAs) {
        if (this.hiringAs.toLowerCase().includes('subk')) {
          newURL = environment.VERIFY_METRO_SUBK;
        }
        else {
          newURL = environment.VERIFY_METRO;
        }
      } else {
        newURL = environment.VERIFY_METRO;
      }
      this.commonService.getServiceRequest(newURL + metroNo).subscribe((data: any) => {
        if (data.value == 'NO') {
          this.metroNo= metroNo
          this.hiringFormService.setTemplateData({ metro: metroNo });
        }
        else {
          this.generateMetro();
        }
      })
    }
  }
  findActivatedRoute() {


    setTimeout(() => {
      // //console.log(key);

      let path = this.location['_platformStrategy']._platformLocation.location.href;
      ////console.log(path)

      if (path.toLowerCase().includes('approval')) {
        this.subscribeRoute = this.activatedRoute.queryParams.subscribe(params => {
          this.formType = params.formName;
          let key = localStorage.getItem('clickedMenu')
          //console.log(key);
          this.hiringAs = key + ' - ' + this.hiringFormService.getHiringAs();
          if (path.toLowerCase().includes('approval')) {
            this.showMetro = true;
          }
        });
        setTimeout(() => {
          this.subscribeRoute.unsubscribe();
        }, 100);
      }
    }, 0);

  }

  getTemplateData() {

    // let key= this.commonService.getClickedMenu();

    if (localStorage.getItem('templateData')) {
      let data = JSON.parse(localStorage.getItem('templateData'))
      this.metroNo = data['metro'];
      if (data['hiringAs'])
        this.hiringAs = data['hiringAs'];
    }
  }


}
