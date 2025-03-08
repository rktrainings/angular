import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from '../../environments/environment'
import { Observable, forkJoin, BehaviorSubject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { ApprovalCenterDetails } from '../tsclasses/approval-center-details';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class ApprovalCenterService {

  @Output() percentDone: EventEmitter<number> = new EventEmitter<number>();
  @Output() uploadSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  hostName: string;
  headers_object: HttpHeaders = new HttpHeaders();
  httpOptions = {}
  httpFileOptions = {}
  headers: HttpHeaders;


  private hireRequestCCStore = new BehaviorSubject<any>([]);
  public hireRequestCC$ = this.hireRequestCCStore.asObservable();
  hireRequestCCInvoked = false;

  public hireRequestUTEStore = new BehaviorSubject<any>([]);
  public hireRequestUTE$ = this.hireRequestUTEStore.asObservable();
  private hireRequestUTEInvoked = false;

  public hireRequestORPStore = new BehaviorSubject<any>([]);
  public hireRequestORP$ = this.hireRequestORPStore.asObservable();
  private hireRequestORPInvoked = false;

  public hireRequestBMStore = new BehaviorSubject<any>([]);
  public hireRequestBM$ = this.hireRequestBMStore.asObservable();
  private hireRequestBMInvoked = false;



  public iotStore = new BehaviorSubject<any>([]);
  public iot$ = this.iotStore.asObservable();
  private iotInvoked = false;

  public boardStore = new BehaviorSubject<any>([]);
  public board$ = this.boardStore.asObservable();
  private boardInvoked = false;


  public bizopsStore = new BehaviorSubject<any>([]);
  public bizops$ = this.bizopsStore.asObservable();
  private bizopsInvoked = false;

  public aodStore = new BehaviorSubject<any>([]);
  public aod$ = this.aodStore.asObservable();
  private aodInvoked = false;

  constructor(private http: HttpClient, private cookieService: CookieService,
    private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
    this.httpFileOptions = this.authService.getFileHeaders();
  }

  getIOTDetails<ApprovalCenterDetails>(geoName: string): Observable<ApprovalCenterDetails> {
    return this.http.get<ApprovalCenterDetails>(this.hostName + environment.APPROVAL_CENTER_IOT_DATA_API + geoName, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getBoardDetails<ApprovalCenterDetails>(): Observable<ApprovalCenterDetails> {
    return this.http.get<ApprovalCenterDetails>(this.hostName + environment.APPROVAL_CENTER_BOARD_DATA_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setBoardDetails(data) {
    this.boardInvoked = true;
    this.boardStore.next(data);
  }

  setBoardInvoked(bool) {
    this.boardInvoked = bool;
  }
  getBoardInvoked() {
    return this.boardInvoked;
  }

  getBizopsDetails<ApprovalCenterDetails>(): Observable<ApprovalCenterDetails> {
    return this.http.get<ApprovalCenterDetails>(this.hostName + environment.APPROVAL_CENTER_BIZOPS_DATA_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setBizopsDetails(data) {
    this.bizopsInvoked = true;
    this.bizopsStore.next(data);
  }

  setBizopsInvoked(bool) {
    this.bizopsInvoked = bool;
  }
  getBizopsInvoked() {
    return this.bizopsInvoked;
  }
  getAodDetails<ApprovalCenterDetails>(): Observable<ApprovalCenterDetails> {
    return this.http.get<ApprovalCenterDetails>(this.hostName + environment.APPROVAL_CENTER_AOD_FETCH_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setAodDetails(data) {
    this.aodInvoked = true;
    this.aodStore.next(data);
  }

  setAodInvoked(bool) {
    this.aodInvoked = bool;
  }
  getAodInvoked() {
    return this.aodInvoked;
  }

  getBackfillEmp<GrbTemplateBackfill>(metroNo: string): Observable<GrbTemplateBackfill> {
    return this.http.get<GrbTemplateBackfill>(this.hostName + environment.AOD_BACKFILL_EMP_API + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  basicUpload(files: File[], role: string) {

    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
    });

    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f),
      formData.append('role', role)
    )
    this.http.post(this.hostName + environment.APPROVAL_CENTER_UPLOAD_DATA_API, formData, { headers: headers, reportProgress: true, observe: 'events' })
      // .pipe(delay(100 * 1000))
      .subscribe(event => {
        //console.log('event:', event);

        if (event.type === HttpEventType.UploadProgress) {
          const percent = Math.round(100 * event.loaded / event.total);
          //console.log('percent:', percent);
          this.emitPercentChangeEvent(percent);
        } else if (event instanceof HttpResponse) {
          // this.uploadSuccess = true;
          this.emitStatusChangeEvent(true);
          //console.log('event:', event);
        }
      })
  }

  updatedFileUpload(files: File[], role: string) {
    //console.log('updatedFileUpload');
    
    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
    });

    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f),
      formData.append('role', role)
    );
    return this.http.post(this.hostName + environment.APPROVAL_CENTER_UPLOAD_DATA_API, formData,
      { headers: headers })
      .pipe(catchError((error: any) => {
          this.emitStatusChangeEvent(error);
        return Observable.throw(error);     
      }));

  }


  emitStatusChangeEvent(status: boolean) {
    this.uploadSuccess.emit(status);
  }

  getStatusChangeEmitter() {
    return this.uploadSuccess;
  }

  emitPercentChangeEvent(percent: number) {
    this.percentDone.emit(percent);
  }

  getPercentChangeEmitter() {
    return this.percentDone;
  }

  getTollsDetails<ApprovalCenterTolls>(tollName: string): Observable<ApprovalCenterTolls> {
    return this.http.get<ApprovalCenterTolls>(this.hostName + environment.APPROVAL_CENTER_TOLLS_DETAILS_API + tollName, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setHireRequestCC(data) {
    this.hireRequestCCInvoked = true;
    this.hireRequestCCStore.next(data);
  }

  getHireRequestCCInvoked() {
    return this.hireRequestCCInvoked;
  }


  setHireRequestUTE(data) {
    this.hireRequestUTEInvoked = true;
    this.hireRequestUTEStore.next(data);
  }

  getHireRequestUTEInvoked() {
    return this.hireRequestUTEInvoked;
  }


  setHireRequestORP(data) {
    this.hireRequestORPInvoked = true;
    this.hireRequestORPStore.next(data);
  }

  getHireRequestORPInvoked() {
    return this.hireRequestORPInvoked;
  }

  setHireRequestBM(data) {
    this.hireRequestBMInvoked = true;
    this.hireRequestBMStore.next(data);
  }

  getHireRequestBMInvoked() {
    return this.hireRequestBMInvoked;
  }

  getGRBInternalDetails<CompleteGrbTemplateInternal>(metroNo: string): Observable<CompleteGrbTemplateInternal> {
    return this.http.get<CompleteGrbTemplateInternal>(this.hostName + environment.APPROVAL_CENTER_GRB_INTERNAL_API + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getGRBExternalDetails<CompleteGRBTemplateExternal>(metroNo: string): Observable<CompleteGRBTemplateExternal> {
    return this.http.get<CompleteGRBTemplateExternal>(this.hostName + environment.APPROVAL_CENTER_GRB_EXTERNAL_API + metroNo, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  putGRBTollsMoreInfo(tollscommentsData: any, tollName: string): Observable<any> {
    return this.http.put<any>(this.hostName + environment.APPROVAL_CENTER_GRB_TOLLS_MOREINFO_API + tollName, tollscommentsData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  putGRBTollsApprove(tollscommentsData: any, tollName: string): Observable<any> {
    return this.http.put<any>(this.hostName + environment.APPROVAL_CENTER_GRB_TOLLS_APPROVE_API + tollName, tollscommentsData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postAllIOTSubmitAPI(commentsData: any): Observable<any> {
    return this.http.post<any>(this.hostName + environment.APPROVAL_CENTER_GRB_IOT_ALL_SUBMIT_API, commentsData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postAllBoardSubmitAPI(commentsData: any): Observable<any> {
    return this.http.post<any>(this.hostName + environment.APPROVAL_CENTER_GRB_BOARD_ALL_SUBMIT_API, commentsData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postAllBizopsSubmitAPI(templateData: any, commentsType: any): Observable<any> {
    return this.http.put<any>(this.hostName + environment.APPROVAL_CENTER_GRB_BIZOPS_ALL_SUBMIT_API + commentsType, templateData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  postAllAodSubmitAPI(templateData: any, commentsType: any): Observable<any> {

    return this.http.put<any>(this.hostName + environment.APPROVAL_CENTER_AOD_SUBMIT_FETCH_API, templateData, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postAllSwapSubmitAPI(status: any, grbNumber: any, oldMetroNumber: any, selectedQuarter: any, templateData: any): Observable<any> {
    return this.http.put<any>(this.hostName + environment.APPROVAL_CENTER_SWAP_GRB_TEMPLATE_ALL_SUBMIT_API + status + '/' + grbNumber + '/' + oldMetroNumber + '/' + selectedQuarter, templateData, this.httpOptions).pipe(
      catchError(err => {
        throw Observable.throw(err);
      }));
  }


  // postGRBReject(metroNo: string): Observable<any>{
  //   return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_GRB_REJECT_API + metroNo, this.httpOptions).pipe(
  //     catchError(this.errorService.handleError)
  //   );
  // }

  public requestDataFromMultipleSources(): Observable<any[]> {

    this.httpOptions = this.authService.getHeaders();
    let response1 = this.http.get(this.hostName + environment.APPROVAL_CENTER_IOT_DATA_API + 'AG', this.httpOptions);
    let response2 = this.http.get(this.hostName + environment.APPROVAL_CENTER_IOT_DATA_API + 'EMEA', this.httpOptions);
    let response3 = this.http.get(this.hostName + environment.APPROVAL_CENTER_IOT_DATA_API + 'APAC', this.httpOptions);
    let response4 = this.http.get(this.hostName + environment.APPROVAL_CENTER_IOT_DATA_API + 'INTERNAL', this.httpOptions);

    return forkJoin([response1, response2, response3, response4]);
  }

  // SWAP
  getSwapDetails(): Observable<any> {
    return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_SWAP_DETAILS_API, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getSwapEmployee(empId: any): Observable<any> {
    return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_SWAP_GET_EMPLOYEE_DETAILS_API + empId, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  // getSwapAuditDetails(grbNumber: any): Observable<any> {
  //   //////console.log('getSwapAuditDetails', environment.APPROVAL_CENTER_SWAP_GET_AUDIT_DETAILS_API + grbNumber);

  //   return this.http.get<any>(this.hostName + environment.APPROVAL_CENTER_SWAP_GET_AUDIT_DETAILS_API + grbNumber, this.httpOptions).pipe(
  //     catchError(err => {
  //       throw this.errorService.handleError(err)
  //     }));
  // }

  setIOTData(data) {
    this.iotInvoked = true
    this.iotStore.next(data);
    // this.iotEMEAStore.next(emeaData);
    // this.iotAPACStore.next(apacData);
    // this.iotInternalStore.next(internalData);
  }

  getIOTInvoked() {
    return this.iotInvoked;
  }


}
