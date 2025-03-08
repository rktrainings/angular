import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CostCaseService {
  hostName: string;
  httpOptions = {}
  costCaseData: any = {};
  private fteStore = new BehaviorSubject<number>(0);
  public fte$ = this.fteStore.asObservable();
  actualCostCaseData: any;
  constructor(private cookieService: CookieService, private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();

  }

  setCostCaseData(data) {
    this.costCaseData = data;
  }
  getCostCaseData() {
    return this.costCaseData;
  }

  setActualCostCaseData(data) {
    this.actualCostCaseData = data;
  }
  getActualCostCaseData() {
    return this.actualCostCaseData;
  }
  setTotalFTE(fte) {
    this.fteStore.next(fte);
  }

  getAllCostCaseRequests() {
    return this.http.get(this.hostName + environment.GET_COSTCASE_DATA, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  getDeptDetailsAndActualCostCase(params: any) {
    return this.http.get(this.hostName + environment.GET_ACTUAL_COSTCASE + params, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  submitCostCaseRequest(data) {
    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
    });

    return this.http.post(this.hostName + environment.SUBMIT_COSTCASE_REQUEST, data, { headers: headers }).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }


  approveCostCaseRequest(data) {
    return this.http.post(this.hostName + environment.APPROVE_COST_CASE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  rejectCostCaseRequest(data) {
    return this.http.post(this.hostName + environment.REJECT_COST_CASE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
}
