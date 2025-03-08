import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax


@Injectable({
  providedIn: 'root'
})
export class MyRequestService {
  hostName: string;
  httpOptions = {};

  private hireRequestStore = new BehaviorSubject<any>([]);
  public hireRequest$ = this.hireRequestStore.asObservable();
  hireRequestCalled = false;

  private swapStore = new BehaviorSubject<any>([]);
  public swap$ = this.swapStore.asObservable();
  swapCalled = false;

  private bandChangeStore = new BehaviorSubject<any>([]);
  public bandChange$ = this.bandChangeStore.asObservable();
  bandChangeCalled = false;

  private GRBReviseStore = new BehaviorSubject<any>([]);
  public GRBRevise$ = this.GRBReviseStore.asObservable();
  GRBReviseCalled = false;
  
  private costcaseStore = new BehaviorSubject<any>([]);
  public costcase$ = this.costcaseStore.asObservable();
  costcaseCalled = false;

  private ciStore = new BehaviorSubject<any>([]);
  public ci$ = this.ciStore.asObservable();
  ciCalled = false;
  
  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  setHireReqRequest(data) {
    this.hireRequestCalled = true;
    this.hireRequestStore.next(data);
  }

  setSwap(data) {
    this.swapCalled = true;
    this.swapStore.next(data);
  }
  setBandChange(data) {
    this.bandChangeCalled = true;
    this.bandChangeStore.next(data);
  }
  setGRBRevise(data) {
    this.GRBReviseCalled = true;
    this.GRBReviseStore.next(data);
  }
  setCostcase(data) {
    this.costcaseCalled = true;
    this.costcaseStore.next(data);
  }

  setCi(data) {
    this.ciCalled = true;
    this.ciStore.next(data);
  }

  getHireReqRequestCalled(){
    return this.hireRequestCalled
  }
  getSwapCalled(){
    return this.swapCalled
  }

  getBandChangeCalled(){
    return this.bandChangeCalled
  }
  getGRBReviseCalled(){
    return this.GRBReviseCalled
  }

  getCostcaseCalled(){
    return this.costcaseCalled
  }

  getCiCalled(){
    return this.ciCalled
  }

  getHireReqTableDetails<MyRequestDetails>(): Observable<MyRequestDetails> {
    return this.http.get<MyRequestDetails>(this.hostName + environment.MY_REQUEST_HIRE_REQUEST_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getSwapTableDetails<MyRequestDetails>(): Observable<MyRequestDetails> {
    return this.http.get<MyRequestDetails>(this.hostName + environment.MY_REQUEST_SWAP_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  getBandChangeTableDetails<MyRequestDetails>(): Observable<MyRequestDetails> {
    return this.http.get<MyRequestDetails>(this.hostName + environment.MY_REQUEST_BAND_CHANGE_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  getGrbReviseTableDetails<MyRequestDetails>(): Observable<MyRequestDetails> {
    return this.http.get<MyRequestDetails>(this.hostName + environment.MY_REQUEST_GRB_REVISE_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getCostcaseTableDetails<MyRequestCostcaseDetails>(): Observable<MyRequestCostcaseDetails> {
    return this.http.get<MyRequestCostcaseDetails>(this.hostName + environment.MY_REQUEST_COSTCASE_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getCiDetails<MyRequestCiDetails>(): Observable<MyRequestCiDetails> {
    return this.http.get<MyRequestCiDetails>(this.hostName + environment.MY_REQUEST_CI_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

}