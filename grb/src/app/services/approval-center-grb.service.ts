import { Injectable } from '@angular/core';
import { ApprovalCenterGrb } from '../tsclasses/approval-center-grb';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApprovalCenterGrbService {
  hostName: string;
  httpOptions = {}
  grbDetails: any;
  internalDetails: any;

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    // this.hostName="/assets/data/my-team/attrition/attritedEmployees.json";
    this.httpOptions = this.authService.getHeaders();
  }

  
  getGrbList(): Observable<ApprovalCenterGrb[]> {
    return this.http.get<ApprovalCenterGrb[]>(this.hostName + environment.APPROVAL_CENTER_GRB_LIST , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getEmpDetails(grbNumber): Observable<any> {

    return this.http.get<any>(this.hostName + environment.GRB_REVISE_APPROVAL_EMPLOYEE_DETAILS + grbNumber, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getGrbReviseAudit(grbNum): Observable<any> {
    return this.http.get<any>(this.hostName + environment. APPROVAL_CENTER_GRB_REVISE_AUDIT+grbNum, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getGrbReviseAuditDownload(grbNum): Observable<any>{
  return this.http.get<any>(this.hostName + environment. APPROVAL_CENTER_GRB_REVISE_AUDIT_DOWNLOAD+grbNum, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getSwapAudit(grbNum): Observable<any> {
    return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_SWAP_AUDIT+grbNum, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getBandChangeAudit(grbNum): Observable<any> {
    return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_BAND_CHANGE_AUDIT+grbNum, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getBandChangeAuditDownload(grbNum): Observable<any>{
  return this.http.get<any>(this.hostName + environment. APPROVAL_CENTER_BAND_CHANGE_AUDIT_DOWNLOAD+grbNum, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postApproveReject(data): Observable<any> {
    return this.http.post<any>(this.hostName + environment.APPROVE_REJECT_GRB_REVISE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postBandChangeApproveReject(data): Observable<any> {
    return this.http.post<any>(this.hostName + environment.APPROVAL_CENTER_BAND_CHANGE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  setGrbDetails(grbDetails){
    this.grbDetails=grbDetails;

  }

  getGrbDetails(){
   return this.grbDetails;

  }

  setInternalDetails(internalDetails){
    this.internalDetails=internalDetails;

  }
  getInternalDetails(){
   return this.internalDetails;
  }
}
