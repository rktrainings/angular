import { Component, OnChanges, OnInit } from '@angular/core';
import jwt from '../assets/data/jwt/jwt.json';
import { CommonService } from './services/common-service.service';
import { TermsService } from './services/terms.service';
import { UserDetailsService } from './services/user-details.service';
import { AuthService } from './services/auth-service.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import menu from 'src/assets/data/menu/menu.json';
import { LeftMenuService } from './services/left-menu.service';
// import GRBDetails from 'src/assets/data/Hiring/View/GRB-Details.json';
// import GOMDetails from 'src/assets/data/Hiring/View/GOM-Details.json';

import { NavigationStart, Event as NavigationEvent } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'CPS-GRB-PORTAL';
  showMenu: boolean;
  acceptedTerms = true;
  jwt: {};
  details = {};
  token: string;
  menu = [];
  roles = [];
  currentUrl = '';
  responseData1: any;
  responseData2: any;
  empID: any;
  key: any;
  constructor(private router: Router, public userDetailsService: UserDetailsService,
    private leftMenu: LeftMenuService, private termsService: TermsService,
    private authService: AuthService, private route: ActivatedRoute,
    private commonService: CommonService, private cookieService: CookieService) {
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        window['usabilla_live']('virtualPageView');
      }
    });

  }

  ngOnInit() {
    if (this.cookieService.get('roles')) {
      this.setMenu();
    }
  }

  setMenu() {
    this.roles = JSON.parse(this.cookieService.get('roles'));
    this.menu = menu['menu'];
    this.menu = this.menu.filter(obj => {
      const childArray = obj.child.filter((item, j) => {
        const arr = this.roles.filter(value => item.role.includes(value));

        item.child = item.child.filter(subChild => {
          let subArray = this.roles.filter(value => subChild.role.includes(value));
          return subArray.length > 0;
        });
        if (item.key === 'Hire Request' && item.child.length > 0) {
          return item.child.length > 0;
        }
        else if (item.key !== 'Hire Request') {
          return arr.length > 0;
        }
      });
      obj.child = childArray;
      return (obj.child.length > 0 || obj.key == 'My Request' || obj.key == 'Grb Archive');
    });
    this.leftMenu.setMenu(this.menu);

  }
}