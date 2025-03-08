import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from '../../environments/environment';
import { BackfillAttrition } from '../tsclasses/backfill-attrition';
import { InternalMovement } from '../tsclasses/internal-movement';
import { BackfillPromotion } from '../tsclasses/backfill-promotion';

@Injectable({
  providedIn: 'root'
})
export class BackfillService {




  hostName: string;
  httpOptions = {}

  backFillData = []
  backFillAPI = false;
  private backFillStore = new BehaviorSubject<any>([]);
  public backFill$ = this.backFillStore.asObservable();

  ITTData = []
  ITTAPI = false;
  private ITTStore = new BehaviorSubject<any>([]);
  public ITT$ = this.ITTStore.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  setBackFillData(data) {
    this.backFillData = data
    this.backFillAPI = true;
    this.backFillStore.next(data);
  }
  getBackFillData() {
    return this.backFillData
  }

  getBackFillInvoked() {
    return this.backFillAPI 
  }
  getBackfillAttritionList(role: string): Observable<BackfillAttrition[]> {
    return this.http.get<BackfillAttrition[]>(this.hostName + environment.BACKFILLATTRITION_LIST + role, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getBackfillPromotionList(role: string): Observable<BackfillPromotion[]> {
    return this.http.get<BackfillPromotion[]>(this.hostName + environment.BACKFILL_PROMOTION_LIST, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  setITTData(data) {
    this.ITTData = data
    this.ITTAPI = true;
    this.ITTStore.next(data);
  }
  getITTData() {
    return this.ITTData
  }

  getITTInvoked() {
    return this.ITTAPI 
  }

  getITTList(role: string): Observable<InternalMovement[]> {
    return this.http.get<InternalMovement[]>(this.hostName + environment.ITT_LIST + role, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }


}
