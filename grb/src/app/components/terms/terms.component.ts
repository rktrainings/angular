import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Terms } from 'src/app/tsclasses/terms.model';
import { TermsService } from 'src/app/services/terms.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';
import { AuthService } from 'src/app/services/auth-service.service';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  // @Output() userLogIn = new EventEmitter<boolean>();
  details = {}
  constructor(private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private termsService: TermsService, private location: Location,
    public userDetailsService: UserDetailsService) {

  }


  ngOnInit() {
  }


  rejectTerms() {
    window.location.href = environment.redirectUrl;
  }

  acceptTerms() {
    let userDetails = this.userDetailsService.getUserDetails();
    this.details['empid'] = userDetails['empID']
    this.details['acceptedby'] = userDetails['name'];


    this.termsService.postServiceRequest(environment.ACCEPT_TERMS, this.details).subscribe(data => {
      if (data['status'] == "Success") {
        this.authService.setTerms('ACCEPTED');
        let timeout = new Date()
        timeout.setHours(timeout.getHours() + 4);
        this.cookieService.put('terms', 'ACCEPTED')
        this.cookieService.put('timeout', JSON.stringify(timeout))
        this.cookieService.put('authenticated', JSON.stringify(true))
        window.location.reload()
      }
      else {
        this.router.navigateByUrl('/accept-terms');
      }
    })
  }


}
