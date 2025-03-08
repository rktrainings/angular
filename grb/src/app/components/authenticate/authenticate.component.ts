import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { LeftMenuService } from 'src/app/services/left-menu.service';
import { TermsService } from 'src/app/services/terms.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import menu from 'src/assets/data/menu/menu.json';
import { NotificationService } from 'src/app/services/notification.service';
import { time } from 'console';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  // title = 'CPS-GRB-PORTAL';
  showMenu: boolean;
  acceptedTerms: boolean = true;
  jwt: {};
  details = {}
  token: string;
  menu: any = [];
  roles = []
  currentUrl = '';
  responseData1: any;
  responseData2: any;
  empID: any;
  key: any;

  constructor(private router: Router, private not: NotificationService, public userDetailsService: UserDetailsService, private leftMenu: LeftMenuService,
    private termsService: TermsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private commonService: CommonService, private cookieService: CookieService) {

    this.route.queryParams.subscribe(async (params) => {
      this.key = params['key'];
      if (this.key) {
        this.authService.setJwt(this.key);
        setTimeout(() => {
          this.getUser();
        }, 0)
      } else {
        setTimeout(() => {
          if (!this.cookieService.get('key')) {
            this.router.navigateByUrl('/session-expired')
          }
        }, 1000);

      }
    });

  }


  ngOnInit() {

  }

  getUser() {
    if (this.key)
      this.commonService.getServiceRequest(environment.USER_DETAILS).subscribe(response => {
        localStorage.setItem('user-data', JSON.stringify(response))
        this.setUserData(response);
        this.verifyTerms(response)
      })
  }
  isExpired(timeout: Date) {
    let currentDate = new Date();
    timeout = new Date(timeout)
    if (timeout) {
      if (currentDate.getDate() >= timeout.getDate()) {
        if (currentDate.getHours() >= timeout.getHours()) {
          if (currentDate.getMinutes() >= timeout.getMinutes()) {
            return true
          } else {
            return false
          }
        }
      }
    } else {
      return true
    }
  }


  setUserData(data) {
    this.cookieService.put('loggedInUser', data['empID'])
    this.userDetailsService.setUserDetails(data);
    this.roles = Object.values(data['roles'])
    this.cookieService.put('roles', JSON.stringify(this.roles))
    this.empID = data['empID']
    this.getMenu()
  }

  getMenu() {
    
    this.menu = menu['menu'];
    
    this.menu = this.menu.filter(obj => {
      let childArray = obj.child.filter((item, j) => {
        
        let arr = this.roles.filter(value => item.role.includes(value))
        
        item.child = item.child.filter(subChild => {
          let sub_arr = this.roles.filter(value => subChild.role.includes(value))
          return sub_arr.length > 0
        })

        if (item.key == 'Hire Request' && item.child.length > 0)
          return item.child.length > 0
        else if (item.key != 'Hire Request')
          return arr.length > 0
      })
      obj.child = childArray
      return (obj.child.length > 0 || obj.key == 'My Request' || obj.key == 'Grb Archive' )
    });
    this.leftMenu.setMenu(this.menu);
  }
  verifyTerms(data) {
    this.cookieService.put('terms', data['status']);
    if (data['status'] == 'ACCEPTED') {
      this.authService.setTerms('ACCEPTED');
      this.cookieService.put('terms', 'ACCEPTED')
      let timeout = new Date()
      timeout.setHours(timeout.getHours() + 4);
      this.cookieService.put('timeout', JSON.stringify(timeout))
      this.cookieService.put('authenticated', JSON.stringify(true))
      window.location.reload()
    } else {
      this.cookieService.put('authenticated', JSON.stringify(false))
      this.authService.setTerms('NOTACCEPTED');
      this.router.navigateByUrl('/accept-terms');
    }

  }
}
