import { Component, OnInit, OnChanges } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth-service.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { Subscription } from 'rxjs';
import { MatTreeNestedDataSource, MatDrawer, MatDialog } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { LogoutComponent } from '../logout/logout.component';
import { ReportsService } from 'src/app/services/reports.service';
import { CookieService } from 'ngx-cookie';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { CommonService } from 'src/app/services/common-service.service';
import { UserManualService } from 'src/app/services/user-manual.service';
export let browserRefresh = false;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  empId: string = "";
  show: boolean = false;
  menu = [];

  role = ['PEM', 'SPOC'];
  clickedMenu = ""
  menuOpened = {};
  activeParentIndex = 0;
  activeChildIndex = -1;
  clicked = true;
  roles = []

  events: string[] = [];
  opened: boolean;
  showGRB = true;
  currentUrl: string = "";
  showMenu: boolean = false;
  hideLoader: boolean = false;
  subscription: Subscription;
  treeControl = new NestedTreeControl<any>(node => node.child);
  dataSource = new MatTreeNestedDataSource<any>();
  empName: string;
  path = "";
  photoURL: string;
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog,
    public userDetailsService: UserDetailsService, private cookieService: CookieService,
    public authService: AuthService, private leftMenu: LeftMenuService, private commonService: CommonService,
    private hiringForm: HiringFormService, private userManual: UserManualService, private reports: ReportsService, private location: Location) {

    // this.subscription = router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     setTimeout(() => {
    //       //////console.log(this.route.snapshot.url.join(''));
    //       //////console.log("loc", this.path)

    //     }, 0)

    //   }
    // });

    router.events.subscribe(
      (_: NavigationEnd) => {
        if (_.url) {
          if (_.url.indexOf('?') >= -1) {
            this.currentUrl = _.url.split('?')[0];

          } else {
            this.currentUrl = _.url;
          }
          setTimeout(() => {
            if (this.currentUrl.includes('session') || this.currentUrl.includes('terms')) {
              this.hideLoader = true
              this.showMenu = false;
              this.show = false
              this.showGRB = false
            } else {

            }

            if (this.path.toLowerCase().includes('ci-release/view') || this.path.toLowerCase().includes('cost-case/view') || this.path.toLowerCase().includes('edit-metro') || this.path.toLowerCase().includes('hiresubmit') || this.path.toLowerCase().includes('hireformview')) {
              browserRefresh = !router.navigated;
              this.dialog.closeAll()
            } else {
              browserRefresh = false;

            }
            this.getClickedMenu(this.currentUrl);

          })

        }
      }
    );

  }
  hasChild = (_: number, node: any) => !!node.child && node.child.length > 0;

  ngOnInit() {

    this.menu = this.leftMenu.getMenu();
    this.dataSource.data = this.menu;

    this.authService.Terms$.subscribe(data => {
      this.display(data);
      this.path = this.location['_platformStrategy']._platformLocation.location.href;
      //////console.log(this.path)
      if (this.cookieService.get('authenticated') || this.path.includes('session') || this.path.includes('terms') || this.path.includes('logged')) {
        this.hideLoader = true;
      } else {
        this.hideLoader = false;
      }
    })
    this.hiringForm.nullifyTemplateData();

    this.empId = this.cookieService.get('loggedInUser');
    this.photoURL = 'https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/' + this.empId + '744';
    this.empName = this.cookieService.get('uname')
    // this.commonService.getImage('0007S5744').subscribe(data => {
    //   ////console.log(data);

    // })
  }

  update(event) {
    this.photoURL = "./assets/icons/userIcon.jpg";
  }
  ngOnChanges() {
  }


  getClickedMenu(currentUrl) {
    this.clickedMenu = ""
    setTimeout(() => {
      this.path = this.location['_platformStrategy']._platformLocation.location.href;
      if (this.path.includes('main-menu') || this.path.includes('session') || this.path.includes('terms') || this.path.includes('logged')) {
        this.showMenu = false
      } else {
        this.showMenu = true
        this.hideLoader = true
      }

      if (!this.path.includes('main-menu') || !this.path.includes('terms')) {
        this.show = true;
        if (this.path.includes('dashboard') && !this.path.includes('hireFormView')) {
          this.clickedMenu = 'DASHBOARD'
        } else if (this.path.includes('my-request')) {
          this.clickedMenu = 'MY REQUEST'
        } else if (this.path.includes('grb-archive')) {
          this.clickedMenu = 'GRB ARCHIVE'
        } else {
          this.menu.forEach(parent => {
            parent['child'].forEach(child => {
              let url = parent['url'] + child['url'];
              if (this.path.includes(url)) {
                this.clickedMenu = child['key'].toUpperCase()
              }
            })
          })
        }
      } else {
        this.clickedMenu = ""
        this.show = false;
      }
    })

  }



  display(terms) {

    if (terms) {
      if (terms == 'NOTACCEPTED') {
        this.show = false;
      } else if (terms == 'ACCEPTED') {
        setTimeout(() => {
          if (!this.path.includes('main-menu') && this.path.length !== 0 && !this.path.includes('terms'))
            this.show = true;
        })

      }
    }
  }

  getActiveParent(item) {
    let url = item.url;
    this.currentUrl = this.path;
    if ((this.currentUrl.includes(url) && url != '/') || ((this.currentUrl == '/' || this.currentUrl == '' || this.currentUrl == '/dashboard') && url == '/dashboard')) {
      return true;
    }
    return false;
  }



  getActiveChild(node) {
    let url = node.path;
    if (this.currentUrl.includes('dashboard')) {
      let bool = false;

      this.route.queryParams.subscribe(async (params) => {
        if (url == this.currentUrl + '?active=' + params['active']) {
          bool = true
        }
      });


      return bool;
    }
    else if (this.currentUrl == url) {
      return true;
    }
    return false;
  }




  navigate(node) {
    localStorage.setItem('clickedMenu', node.key)
    console.log(node);

    this.hiringForm.nullifyTemplateData();
    if (node.path.includes('reports')) {
      // if (node.path.includes('recruitment')) {
      //   this.reports.downloadReport(environment.REPORTS_RECRUITMENT, node.key);
      // } else 
      if (node.path.includes('br-backfill')) {
        this.reports.downloadReport(environment.REPORTS_BR_BACKFILL_REPORT, node.key);
      }
      else if (node.path.includes('backfill-details')) {
        this.reports.downloadReport(environment.REPORTS_BR_BACKFILL_DETAILS, node.key);
      } else if (node.path.includes('br-open-positions')) {
        this.reports.downloadReport(environment.REPORTS_BR_OPEN_POSITIONS, node.key);
      } 
      // else if (node.path.includes('ci')) {
      //   this.reports.downloadReport(environment.REPORTS_CI_EXPORT, node.key);
      // }
       else {
        this.router.navigateByUrl(node.path);
      }
    } else if (node.path.includes('guide')) {

      if (node.path.includes('hire-employee')) {
        this.userManual.download("Hire Employee.pdf");
      }
      else if (node.path.includes('edit-employee')) {
        this.userManual.download("Edit Employee.pdf");
      }
      else if (node.path.includes('ci-automation')) {
        this.userManual.download("CI Automation Release.pdf");
      }
      else if (node.path.includes('cost-case')) {
        this.userManual.download("Cost Case.pdf");
      }
      else if (node.path.includes('pending-approval')) {
        this.userManual.download("Pending GRB Approval.pdf");
      }
      else if (node.path.includes('approved-positions')) {
        this.userManual.download("Approved Positions.pdf");
      }
    } else {
      this.router.navigateByUrl(node.path);
    }
  }
  viewProfile() {
    const dialogRef = this.dialog.open(ViewProfileComponent, {
      maxWidth: 'unset'
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
  toggle() {
    let selected = this.treeControl.expansionModel.selected;
    if (selected.length > 2) {
      selected.splice(selected.length - 1, 1)
      selected.forEach(e => {
        this.treeControl.collapse(e)
      })
    }
  }
  closeMenu() {
  }

  logout() {

    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '55vh',
    });

    dialogRef.afterClosed().subscribe(loggedOut => {
      //////console.log(loggedOut);
      if (loggedOut) {
        this.empId = null;
        this.empName = null;
        this.showMenu = false;
      }
    });
  }
}
