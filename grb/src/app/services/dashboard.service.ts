import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs'
import { environment } from '../../environments/environment'
import { DashboardServiceProperties } from '../../assets/data/dashboard/dashboard-service-properties';
import { RequestDashboard } from '../tsclasses/request-dashboard';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { MetroDetails } from '../tsclasses/metro-details';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  hostName: string;

  headers_object: HttpHeaders = new HttpHeaders();

  httpOptions = {}
  headers: HttpHeaders;

  private ccStore = new BehaviorSubject<any>([]);
  public cc$ = this.ccStore.asObservable();
  ccCalled = false;

  private pendingStore = new BehaviorSubject<any>([]);
  public pending$ = this.pendingStore.asObservable();
  pendingCalled = false;

  private approvedStore = new BehaviorSubject<any>([]);
  public approved$ = this.approvedStore.asObservable();
  approvedCalled = false;

  private ciStore = new BehaviorSubject<any>([]);
  public ci$ = this.ciStore.asObservable();
  ciCalled = false;


  private tollStore = new BehaviorSubject<any>([]);
  public toll$ = this.tollStore.asObservable();
  
  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  // public requestDataFromMultipleSources(): Observable<any[]> {
  //   let response1 = this.http.get(this.hostName + DashboardServiceProperties.PENDING_HIRING_REQUEST_API, this.httpOptions);
  //   let response2 = this.http.get(this.hostName + DashboardServiceProperties.APPROVED_HIRING_REQUEST_API, this.httpOptions);
  //   let response3 = this.http.get(this.hostName + DashboardServiceProperties.CURRENT_CASE_CASE_API, this.httpOptions);
  //   // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
  //   return forkJoin([response1, response2, response3]);
  // }

  setTolls(data){
    let allMetroFields = Object.entries(data).map(([key, value]) => { return { 'name': key, 'value': value } });
    this.tollStore.next(allMetroFields);
  }
  setPendingRequest(data) {
    this.pendingCalled = true;
    this.pendingStore.next(data);
  }

  setCC(data) {
    this.ccCalled = true;
    this.ccStore.next(data);
  }
  setApproved(data) {
    this.approvedCalled = true;
    this.approvedStore.next(data);
  }

  setCi(data) {
    this.ciCalled = true;
    this.ciStore.next(data);
  }

  setCalledFunc() {
    this.pendingCalled = false;
    this.ccCalled = false;
    this.ccCalled = false;
    //this.ciCalled = false;

  }
  getPendingCalled() {
    return this.pendingCalled
  }
  getCCCalled() {
    return this.ccCalled
  }

  getApprovedCalled() {
    return this.approvedCalled
  }

  getCiCalled() {
    return this.ciCalled
  }

  getPendingRequest<RequestDashboard>(): Observable<RequestDashboard> {
    return this.http.get<RequestDashboard>(this.hostName + DashboardServiceProperties.PENDING_HIRING_REQUEST_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getApprovedRequest<RequestDashboard>(): Observable<RequestDashboard> {
    return this.http.get<RequestDashboard>(this.hostName + DashboardServiceProperties.APPROVED_HIRING_REQUEST_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
// CI Dashboard
  getCiRequest<CiDashboard>(): Observable<CiDashboard> {
    return this.http.get<CiDashboard>(this.hostName + DashboardServiceProperties.CI_DASHBOARD_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }


  //GET method to fetch the Current cast case Pending Request
  getCurrentCostCase<CurrentCostcase>(): Observable<CurrentCostcase> {
    return this.http.get<CurrentCostcase>(this.hostName + DashboardServiceProperties.CURRENT_CASE_CASE_API, this.httpOptions);
  }

  getCurrentCostCaseCalc<costcasecal>(deptCode: any): Observable<costcasecal> {
    return this.http.get<costcasecal>(this.hostName + DashboardServiceProperties.CURRENT_CASE_CASE_CALC_API + deptCode, this.httpOptions);

  }

  getActualCostCase<actualCostCase>(deptCode: any, cyear: any): Observable<actualCostCase> {
    return this.http.get<actualCostCase>(this.hostName + DashboardServiceProperties.ACTUAL_CASE_CASE_CALC_API + cyear + '/' + deptCode, this.httpOptions);

  }
  getActualCostCaseValidate<actualCostCase>(deptCode: any, cyear: any): Observable<actualCostCase> {
    return this.http.get<actualCostCase>(this.hostName + DashboardServiceProperties.ACTUAL_CC_VALIDATE_FLAG + cyear + '/' + deptCode, this.httpOptions);

  }
  postCCValidate(data): Observable<any> {
    return this.http.post<any>(this.hostName + DashboardServiceProperties.VALIDATE_CC , data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getMetroPendingDetails<MetroDetails>(metroNo: any): Observable<MetroDetails> {
    return this.http.get<MetroDetails>(this.hostName + DashboardServiceProperties.METRO_PENDING_DETAILS_API + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getMetroApprovedDetails<MetroDetails>(metroNo: any): Observable<MetroDetails> {
    return this.http.get<MetroDetails>(this.hostName + DashboardServiceProperties.METRO_APPROVED_DETAILS_API + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getApprovalComments<TollInfo>(toll: any, metroNo: any): Observable<TollInfo> {
    return this.http.get<TollInfo>(this.hostName + DashboardServiceProperties.APPROVAL_COMMENTS_API + toll + '/' + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getMoreInfoForToll<TollInfo>(toll: any, metroNo: any): Observable<TollInfo> {
    return this.http.get<TollInfo>(this.hostName + DashboardServiceProperties.TOLL_DETAILS_API + toll + '/' + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getOnBoardedEmployee<OnBoardedEmployee>(reqStatus: any, reqId: any): Observable<OnBoardedEmployee> {
    return this.http.get<OnBoardedEmployee>(this.hostName + DashboardServiceProperties.ON_BOARDED_EMPLOYEE_API + reqStatus + '/' + reqId, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  putServiceMoreInfoComments(commentsData: any): Observable<any> {
    return this.http.put<any>(this.hostName + DashboardServiceProperties.DASHBOARD_TOLL_MORE_INFO_COMMENTS_API, commentsData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

}
