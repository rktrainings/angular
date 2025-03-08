import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  roles: any = {};
  highestRole: string = "";
  userDetails: any;
  hostName: string;
  httpOptions = {};
  empID = "";
  uname = "";
  deptCodes = [];
  constructor(private http: HttpClient, private cookieService: CookieService, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
  }

  public setUserDetails(details) {
    this.userDetails = details;
    this.roles = details['roles'];
    this.empID = details['empID'];
    this.uname = details['name'];
    this.deptCodes = details['deptCodes'];
    localStorage.setItem('deptCodes',JSON.stringify(this.deptCodes));
    this.cookieService.put('user-details', JSON.stringify(details))
    this.cookieService.put('uname', this.uname)
  }

  public getUserName() {
    this.uname = this.cookieService.get('uname')
    return this.uname;
  }
  public getUserDetails() {
    this.userDetails = JSON.parse(this.cookieService.get('user-details'))
    return this.userDetails;
  }

  public getDeptCodes() {
    return JSON.parse(localStorage.getItem('deptCodes'));
  }

  getRoles(): string[] {
    // return Object.values(this.roles);
    return JSON.parse(this.cookieService.get('roles'));
  }
  getEmpID() {
    return this.empID
  }

  public getHighestRole() {
    this.roles = JSON.parse(this.cookieService.get('roles'))
    let keys = Object.keys(this.roles);
    let max = Math.max.apply(null, keys);
    return this.roles[max];
  }

  getServiceRequest(url: string) {
    this.httpOptions = this.authService.getHeaders();

    return this.http.get(this.hostName + url, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

}
