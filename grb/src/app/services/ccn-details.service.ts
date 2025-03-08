import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class CCNPCRservice {
  hostName: string;
  httpOptions = {};
  ccnNumber: string;
  month : string;

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getdeptDetails<DeptRequest>(dept: any): Observable<DeptRequest> {
    return this.http.get<DeptRequest>(this.hostName + environment.GET_DEPT_DETAILS + dept, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      })
    );

  }
  getccnlist() {
    return this.http.get(this.hostName + environment.CCN_LIST_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      })
    );
  }

  getccnDetails<ccndetials>(ccn: any, month : any): Observable<ccndetials> {
    ////console.log(this.hostName + environment.CCN_DETALS_API + ccn+ '/'+month)
    return this.http.get<ccndetials>(this.hostName + environment.CCN_DETALS_API + ccn+ '/'+month, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      })
    );

  }

  setCcnAndMonth(ccn: any,month: any){
    ////console.log(ccn);
    ////console.log(month);
    this.ccnNumber=ccn;
    this.month=month;
  }

  getCcnAndmonth(){
    
  }

}