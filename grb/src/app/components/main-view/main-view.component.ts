import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TermsService } from 'src/app/services/terms.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { MatDialog } from '@angular/material';
import { ReportsService } from 'src/app/services/reports.service';
import { UserManualService } from 'src/app/services/user-manual.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  menu = [];
  child: any[];
  child1 = [];
  child2 = [];
  currentUrl = "";
  parentUrl = "";

  showMenu: boolean;
  acceptedTerms: boolean = true;
  jwt: {};
  details = {}
  token: string;
  roles = []
  responseData1: any;
  responseData2: any;
  empID: any;
  parent: string;
  subChild: any[] = [];
  childUrl: any = "";
  constructor(public userDetailsService: UserDetailsService, private leftMenu: LeftMenuService,
    private router: Router, private termsService: TermsService,
    private authService: AuthService, private route: ActivatedRoute,
    private commonService: CommonService, private hiringForm: HiringFormService,
    private matDialog: MatDialog, private reports: ReportsService, private userManual: UserManualService) {
    this.matDialog.closeAll();
    router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url) {
          if (_.url.indexOf('?') >= -1) {
            this.currentUrl = _.url.split('?')[0];

          } else {
            this.currentUrl = _.url;
          }
        }
      }
    );
  }


  ngOnInit() {
    this.authService.Terms$.subscribe(data => {
      this.menu = this.leftMenu.getMenu();
      //////console.log(this.menu)
    })
    this.clearData();
    //////console.log('clear')
  }

  clearData() {
    this.hiringForm.nullifyTemplateData();

  }
  assignChild(parent) {
    this.parentUrl = parent.url;
    this.child1 = [];
    this.child2 = [];
    this.subChild = [];
    this.child = parent['child'];
    if (this.child.length <= 10) {
      this.child.forEach((e, i) => {
        if (i < 5) {
          this.child1.push(e)
        } else {
          this.child2.push(e)
        }
      })
    } else {
      console.log(this.child);
      
      this.child1 = this.child.slice(0, (this.child.length / 2))
      this.child2 = this.child.slice((this.child.length / 2), this.child.length)
    }

  }

  assignSubchild(child) {
    this.childUrl = child.url;
    this.subChild = [];
    this.subChild = child['child'] ? child['child'] : [];

  }

  getActiveParent(item) {
    if (this.parentUrl == item['url']) {
      return true;
    }
    return false;
  }

  getActiveChild(child) {
    if (this.childUrl == child['url'] && child['url'].includes('hire-request')) {
      return true;
    }
    return false;
  }

  navigateParent(parent, key) {
    this.parent = parent;
    if (parent.toLowerCase().includes('my-request') || parent.toLowerCase().includes('grb-archive')) {
      this.router.navigateByUrl(parent);
    }
  }

  navigate(child, childKey, index) {
    this.commonService.setClickedMenu(childKey);
    localStorage.setItem('clickedMenu', childKey)
    if (this.parent.includes('dashboard')) {
      let url = this.parent + '?active=' + index;
      ////console.log(childKey);

      if (childKey.includes('HR Hiring Requests')) {
        let url = this.parent + child;
        ////console.log(url);
        this.router.navigateByUrl(url);
      } else {
        this.router.navigateByUrl(url);
      }
    } else if (this.parent.includes('reports')) {
      // if (child.includes('recruitment')) {
      //   this.reports.downloadReport(environment.REPORTS_RECRUITMENT, childKey);
      // } else
      if (child.includes('br-backfill')) {
        this.reports.downloadReport(environment.REPORTS_BR_BACKFILL_REPORT, childKey);
      }
      else if (child.includes('backfill-details')) {
        this.reports.downloadReport(environment.REPORTS_BR_BACKFILL_DETAILS, childKey);
      } else if (child.includes('pending-hiring-request')) {
        console.log('anything');
        this.reports.downloadReport(environment.REPORTS_PENDING_HIRING_REQUESTS, childKey);
      } else if (child.includes('br-open-positions')) {
        this.reports.downloadReport(environment.REPORTS_BR_OPEN_POSITIONS, childKey);
      } else if (child.includes('br-open-positions')) {
        this.reports.downloadReport(environment.REPORTS_BR_OPEN_POSITIONS, childKey);
      } 
      // else if (child.includes('ci')) {
      //   this.reports.downloadReport(environment.REPORTS_CI_EXPORT, childKey);
      // }
       else {
        let url = this.parent + child;
        this.router.navigateByUrl(url);
      }
    } else if (this.parent.includes('guide')) {

      if (child.includes('hire-employee')) {
        this.userManual.download("Hire Employee.pdf");
      }
      else if (child.includes('edit-employee')) {
        this.userManual.download("Edit Employee.pdf");
      }
      else if (child.includes('ci-automation')) {
        this.userManual.download("CI Automation Release.pdf");
      }
      else if (child.includes('cost-case')) {
        this.userManual.download("Cost Case.pdf");
      }
      else if (child.includes('pending-approval')) {
        this.userManual.download("Pending GRB Approval.pdf");
      }
      else if (child.includes('approved-positions')) {
        this.userManual.download("Approved Positions.pdf");
      }
    }
    else if (!child.includes('hire-request')) {
      let url = this.parent + child;
      this.router.navigateByUrl(url);
    }
  }

  navigateSubChild(subChild, key) {
    this.commonService.setClickedMenu(key);
    localStorage.setItem('clickedMenu', key)

    let url = this.parent + this.childUrl + subChild;
    this.router.navigateByUrl(url);
  }
}
