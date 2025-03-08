import { Component, OnInit } from '@angular/core';
import { MySpan } from 'src/app/tsclasses/my-span.model';
import mySpanSample from 'src/assets/data/my-team/my-span/my-span.json';
import { environment } from 'src/environments/environment';

import { Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { MySpanService } from 'src/app/services/my-span.service';
import { MatDrawer } from '@angular/material';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-my-span',
  templateUrl: './my-span.component.html',
  styleUrls: ['./my-span.component.scss']
})
export class MySpanComponent implements OnInit {
  displayedHeaders: string[] = ['EMPLOYEE ID', 'EMPLOYEE NAME', 'DEPARTMENT NAME', 'BAND', 'IS MANAGER', 'GEO',  'TOWER', 'SUB PROCESS', 'SUPERVISOR ID', 'SUPERVISOR NAME', 'EMPLOYEE TYPE']
  displayedColumns: string[] = ['empId', 'employeeName', 'deptName', 'band', 'isManager', 'geo', 'tower', 'subProcess', 'supid', 'supName', 'employeeType']
  AllColumns: string[] = ['empId', 'employeeName', 'deptName', 'band', 'isManager', 'geo', 'tower', 'subProcess', 'supid', 'supName', 'employeeType', 'actions', 'auditLogs'];
  ELEMENT_DATA: MySpan[] = [];
  showActions = true;
  fetchData = false;
  showCheckBox = true;
  showSearchFilter: boolean;
  managersList = []
  role: string[] = [];
  show: boolean = false;
  showLoader = false;
  constructor(router: Router, private cookieService: CookieService, public userDetails: UserDetailsService, private mySpanService: MySpanService) {
    this.role = JSON.parse(this.cookieService.get('roles'));
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        // do your stuff
        // window.usabilla_live('virtualPageView');
      }
    });


  }

  ngOnInit() {

    // this.ELEMENT_DATA = mySpanSample;
    this.getMySpanData();
    // this.getManagersList();
    // this.setSearchFilter();
    // this.mySpanService.mySpan$.subscribe(data => {
      // this.ELEMENT_DATA = data
      //////console.log(data)
      // let invoked = this.mySpanService.getFetchedMySpan()
      // if (invoked) {
      //   this.show = true;
      //   this.showLoader = false;

      //   this.getManagersList();
      //   this.setSearchFilter();
      // }
      // else {
      //   this.showLoader = true;
      // }
    // })
  }

  getMySpanData() {
    if (this.role.includes('GRBEO') || this.role.includes('ADMIN')) {
      this.ELEMENT_DATA = [];
      this.setSearchFilter();
      this.show = true;
    }
    else {
      // if (this.mySpanService.getFetchedMySpan())
      this.showLoader = true;
      // else
      // this.showLoader = true;
      this.mySpanService.getMySpanData(environment.MY_SPAN).subscribe((data: MySpan[]) => {
        // this.ELEMENT_DATA = data;
        this.show = true;
        this.showLoader = false;

        this.getManagersList();
        this.setSearchFilter();
        this.ELEMENT_DATA = data

        // this.mySpanService.setMySpan(data);

      })
    }
  }

  getManagersList() {
    this.managersList = []
    this.ELEMENT_DATA.forEach(obj => {
      this.managersList.push(obj.supName)
    })
    this.managersList = this.managersList.filter(this.onlyUnique)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  showManagers() {
    //////////console.log("show managers")
  }

  setSearchFilter() {
    if (this.role.includes('GRBEO') || this.role.includes('ADMIN')) {
      this.showSearchFilter = true;
    } else {
      this.showSearchFilter = false;
    }
  }

  getDataOnSearch(params) {
    //////////console.log(Object.keys(params)[0])
    this.ELEMENT_DATA = []
    // this.ELEMENT_DATA = this.ELEMENT_DATA.filter(e => e[Object.keys(params)[0]].includes(params[Object.keys(params)[0]]))
    //////////console.log(this.ELEMENT_DATA)
  }
}
