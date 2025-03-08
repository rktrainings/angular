import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonService } from './common-service.service';
import { BackfillService } from './backfill.service';
import { HireORPService } from './hire-request-ORP';

@Injectable({
  providedIn: 'root'
})
export class HiringFormService {



  private hostName: string;
  private httpOptions = {};
  private deptDetails: any;
  private deptCode = "";
  private backFillData = [];
  private templateData = {};
  private hiringType = "";
  private hiringAs: "";
  private quantity = 0;
  public deptStore = new BehaviorSubject<any>({});
  public dept$ = this.deptStore.asObservable();

  public templateStore = new BehaviorSubject<any>({});
  public template$ = this.templateStore.asObservable();

  public grbValidStore = new BehaviorSubject<boolean>(false);
  public grbValid$ = this.grbValidStore.asObservable();

  public gomValidStore = new BehaviorSubject<boolean>(false);
  public gomValid$ = this.gomValidStore.asObservable();

  public tramValidStore = new BehaviorSubject<boolean>(false);
  public tramValid$ = this.tramValidStore.asObservable();

  public empValidStore = new BehaviorSubject<boolean>(false);
  public empValid$ = this.empValidStore.asObservable();

  public totalQtyStore = new BehaviorSubject<number>(0);
  public totalQty$ = this.totalQtyStore.asObservable();

  public checkedBackfillQtyStore = new BehaviorSubject<number>(0);
  public checkedBackfillQty$ = this.checkedBackfillQtyStore.asObservable();

  public checkedOrpQtyStore = new BehaviorSubject<number>(0);
  public checkedOrpQty$ = this.checkedOrpQtyStore.asObservable();

  public childFormNameStore = new BehaviorSubject<string>('');
  public childFormName$ = this.childFormNameStore.asObservable();

  // private fileStore = new BehaviorSubject<any>({});
  // public file$ = this.fileStore.asObservable();

  private orpData: any = [];

  private grbDetails = {};
  private grbValid = false;
  private gomDetails = {};
  private gomValid = false;
  private empDetails = {};
  private empValid = false;
  private fileStore: any = "";
  tramDetails: any = {};
  tramValid: any;
  metroNumber: any;

  constructor(private orpService: HireORPService, private backfillService: BackfillService, private commonService: CommonService, private http: HttpClient, private errorService: ErrorService, private authService: AuthService, private hiringForm: HiringFormService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  generateMetroNumber() {
    let min = 4, max = 9;
    let startingDigit = Math.floor(Math.random() * (max - min) + min);
    var index = Math.floor((Math.random() * 15));
    let random = Math.floor(100000000000000000000 + Math.random() * 123456789876543210).toString();
    this.metroNumber = startingDigit + random.substring(index, index + 7);
    return  this.metroNumber;
  }


  setCheckedBackfillQty(checkedBackfillQty){
    this.checkedBackfillQtyStore.next(checkedBackfillQty)
  }

  setCheckedOrpQty(checkedOrpQty){
    this.checkedOrpQtyStore.next(checkedOrpQty)
  }

  setTotalQty(totalQty){
    this.totalQtyStore.next(totalQty)
  }

  setChildFormName(childFormName){
    this.childFormNameStore.next(childFormName)
  }

  setMetroNumber(metroNumber){
    this.metroNumber=metroNumber
  }

  getMetroNumber(){
    return this.metroNumber;
  }

  setTRAMDetails(data) {
    this.tramDetails = { ...this.tramDetails, ...data };
  }


  getTRAMDetails() {
    return this.tramDetails
  }
  setTRAMValid(bool) {
    this.tramValidStore.next(bool)
    this.tramValid = bool;
  }

  getTRAMValid() {
    return this.tramValid
  }
  setGRBDetails(data) {
    this.grbDetails = { ...this.grbDetails, ...data };
  }


  getGRBDetails() {
    return this.grbDetails
  }

  setGRBValid(bool) {
    this.grbValidStore.next(bool)
    this.grbValid = bool;
  }

  getGRBValid() {
    return this.grbValid
  }

  setGOMDetails(data) {
    this.gomDetails = data;
  }

  getGOMDetails() {
    return this.gomDetails
  }

  setGOMValid(bool) {
    this.gomValidStore.next(bool)
    this.gomValid = bool;
  }

  getGOMValid() {
    return this.gomValid
  }
  // setEMPDetails(data) {
  //   this.empDetails = data;
  // }

  // getEMPDetails() {
  //   return this.empDetails
  // }

  setEMPValid(bool) {
    this.empValidStore.next(bool)
    this.empValid = bool;
  }

  getEMPValid() {
    return this.empValid
  }

  setBackFillData(data) {
    this.backFillData = data;
  }

  getBackFillData() {
    return this.backFillData
  }

  setHiringType(data) {
    this.hiringType = data;
  }

  getHiringType() {
    return this.hiringType;
  }

  setOrpData(data) {
    this.orpData = data;
  }

  getOrpData() {
    return this.orpData;
  }

  setHiringAs(data) {
    this.hiringAs = data;
  }

  getHiringAs() {
    return this.hiringAs;
  }

  getQuantity() {
    return this.quantity;
  }
  setQuantity(data) {
    this.quantity = data;
  }
  setTemplateData(data) {

    Object.keys(data).map(e => {

      if (e != 'gpPercentage' && e != 'attritionYTDPercentage' && e != 'businessJustification' && e != 'backfillEmployees' && e != 'transferEmployees' &&
        e != 'comments' && e != 'totalQty' && e != 'accountUTEPercentage' && e != 'eob' && e != 'resourceGPPercentage') {
        if (typeof data[e] == 'string')
          data[e] = data[e].toUpperCase();
      }
    })
    // if (data['marketCountry']) {
    //   data['marketCountry'] = data['marketCountry'].toUpperCase()
    // }
    this.templateData = Object.assign(this.templateData, data);
    localStorage.setItem('templateData', JSON.stringify(this.templateData))
    this.templateStore.next(Object.assign(this.templateData, data));

  }

  nullifyTemplate() {
    this.templateData = {};
    this.templateStore.next({});
    localStorage.removeItem('templateData');
  }
  nullifyTemplateData() {
    this.setGRBDetails({});
    this.setTRAMDetails({});
    this.grbDetails = {};
    this.setGOMDetails({});
    this.nullifyTemplate();
    this.setGRBValid(false);
    this.setGOMValid(false);
    this.setTRAMValid(false)
    this.setEMPValid(false);
    this.setDeptCode('')
    this.setdept({});
    this.setOrpData([]);
    this.setBackFillData([]);
    this.backfillService.setBackFillData([])
    localStorage.removeItem('backFillData');
    localStorage.removeItem('templateData');
    localStorage.removeItem('orpData');
    localStorage.removeItem('maxTotalQty');
    localStorage.removeItem('templateKeys');
    localStorage.removeItem('countries');
    localStorage.removeItem('band');
    localStorage.removeItem('checkedORP');
    localStorage.removeItem('checkedBackfill');
    localStorage.removeItem('empStatus');


  }

  getTemplateData() {
    Object.keys(this.templateData).map(e => {
      if (e != 'gpPercentage' && e != 'attritionYTDPercentage' && e != 'businessJustification' &&
        e != 'comments' && e != 'totalQty' && e != 'accountUTEPercentage' && e != 'eob' && e != 'resourceGPPercentage') {
        if (typeof this.templateData[e] == 'string')
          this.templateData[e] = this.templateData[e].toUpperCase();
      }
    })
    return this.templateData
  }
  setDeptCode(deptCode) {
    this.deptCode = deptCode
  }

  getDeptDetails(deptCode, url) {

    return this.http.get(this.hostName + url + deptCode, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));

  }

  getJRS(deptCode, url) {
    console.log(this.hostName + url + deptCode);

    return this.http.get(this.hostName + url + deptCode, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));

  }
  getServiceRequest(url: string) {
    return this.http.get(this.hostName + url, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }


  postServiceRequest(url: string, data) {
    return this.http.post(this.hostName + url, JSON.stringify(data), this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setdept(deptCode) {
    this.deptStore.next(deptCode);
  }

  setUploadedFile(file: File[]) {
    // this.fileStore.next(file);
    this.fileStore = file;
  }

  getUploadedFile() {
    return this.fileStore;
  }

  getUTEStickyDetails<UTEStickies>(deptCode: any): Observable<UTEStickies> {
    return this.http.get<UTEStickies>(this.hostName + environment.GRB_TEMP_UTE_STICKYINFO + deptCode, this.httpOptions);
  }

}
