import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CiReleaseService {

  hostName: string;
  httpOptions = {};
  ciReleaseData={};
  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  setCIReleaseData(data){
    this.ciReleaseData=data
  }
  getCIReleaseData(){
    return this.ciReleaseData;
  }

  getEmployeeDetails(empId: string) {
    return this.http.get(this.hostName + environment.CI_RELEASE_EMP_DETAILS + empId, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }
  getCCNPCRMonths(ccnPcrNumber: string) {
    return this.http.get(this.hostName + environment.CI_RELEASE_CCN_PCR_MONTHS + ccnPcrNumber, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }

  getCCNPCRDetails(ccnPcrNumber: string, month: string) {
    return this.http.get(this.hostName + environment.CI_RELEASE_CCN_PCR_DETAILS + ccnPcrNumber+'/'+month, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }

  getValidCCNPCR() {
    return this.http.get(this.hostName + environment.CI_RELEASE_VALID_CCN_PCR , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }

  getDeptDetails() {
    return this.http.get(this.hostName + environment.CI_RELEASE_DEPT_DEAILS , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }


  submitCIRelease(data) {
    return this.http.post(this.hostName + environment.CI_RELEASE_SUBMIT, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  getAllPendingRequests(){
    return this.http.get(this.hostName + environment.CI_RELEASE_GET_ALL_PENDING , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }

  updateRequest(data){
    return this.http.post(this.hostName + environment.CI_RELEASE_UPDATE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
}
