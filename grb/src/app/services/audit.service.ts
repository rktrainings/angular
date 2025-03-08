import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Audit } from '../tsclasses/audit.model';
import { AuditTable } from '../tsclasses/audit-table';
import { CiAudit } from '../tsclasses/ci-audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  hostName: string;
  httpOptions = {}

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }


  getServiceRequest(url:string) {
    //////////console.log("in get")
    return this.http.get<Audit[]>(this.hostName + url, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }
  
  getAuditDetails(metro:any){
    return this.http.get<AuditTable[]>(this.hostName + environment.AUDIT_DETAILS + metro, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }
  getSwapAuditDetails(metro:any){
    //////console.log(environment.APPROVAL_CENTER_SWAP_GET_AUDIT_DETAILS_API);
    return this.http.get<AuditTable[]>(this.hostName + environment.APPROVAL_CENTER_SWAP_GET_AUDIT_DETAILS_API + metro, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }

  getGRBReviseAuditDetails(metro:any){
    ////////console.log(environment.GRB_REVISE_AUDIT_DETAILS);
    return this.http.get<AuditTable[]>(this.hostName + environment.GRB_REVISE_AUDIT_DETAILS + metro, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }

  getCiAuditDetails(value:any){
    ////////console.log(environment.GRB_REVISE_AUDIT_DETAILS);
    return this.http.get<CiAudit[]>(this.hostName + environment.CI_AUDIT_DETAILS + value, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }

  getBandChangeAuditDetails(metro:any){
    return this.http.get<AuditTable[]>(this.hostName + environment.BAND_CHANGE_AUDIT_DETAILS + metro, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }}
