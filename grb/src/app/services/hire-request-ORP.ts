import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax


@Injectable({
  providedIn: 'root'
})
export class HireORPService {
  hostName: string;
  httpOptions = {};

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getORPTableDetails<HireRequest>(band: any, geo: any, tower: any): Observable<HireRequest> {
    return this.http.get<HireRequest>(this.hostName + environment.ORP_DETAILS + band + '/' + tower + '/' + geo, this.httpOptions).pipe(catchError(err => {
      throw this.errorService.handleError(err)
    }));

  }
  getORPBackfillTableDetails<HireRequest>(band: any, tower: any, deptCode: any): Observable<HireRequest> {
    return this.http.get<HireRequest>(this.hostName + environment.ORP_BACKFILL_DETAILS + band + '/' + deptCode, this.httpOptions).pipe(catchError(err => {
      throw this.errorService.handleError(err)
    }));

  }
  getORPNewGrowthTableDetails<HireRequest>(band: any, deptCode: any): Observable<HireRequest> {
    return this.http.get<HireRequest>(this.hostName + environment.ORP_NEWGROWTH_DETAILS + band + '/' + deptCode, this.httpOptions).pipe(catchError(err => {
      throw this.errorService.handleError(err)
    }));

  }


  convertToInternal(data: any) {
    this.httpOptions = this.authService.getHeaders();
    return this.http.post(this.hostName + environment.CONVERT_EXTERNAL_TO_INTERNAL, JSON.stringify(data), this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

}