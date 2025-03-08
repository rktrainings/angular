import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attrition } from '../tsclasses/attrition';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttritionService {


  hostName: string;
  httpOptions = {}
  attritionData = [];
  fetchedAttrition = false;
  private attritionStore = new BehaviorSubject<any>([]);
  public attrition$ = this.attritionStore.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    // this.hostName="/assets/data/my-team/attrition/attritedEmployees.json";
    this.httpOptions = this.authService.getHeaders();
  }

  setattrition(data) {
    this.fetchedAttrition = true;
    this.attritionStore.next(data);
  }
  getFetchedAttrition() {
    return this.fetchedAttrition;
  }

  getAttritionList(role: string): Observable<Attrition[]> {
    return this.http.get<Attrition[]>(this.hostName + environment.ATTRITION_LIST + role, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }


  postServiceRequest(data, role: string): Observable<any> {
    return this.http.post<any>(this.hostName + environment.POST_REQUEST + role, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  putServiceApproval(data): Observable<any> {
    return this.http.put<any>(this.hostName + environment.POST_APPROVE, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postWithdrawResignation(data): Observable<any> {
    return this.http.post<any>(this.hostName + environment.ATTRITION_WITHDRAW_RESIGNATION, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }



}
