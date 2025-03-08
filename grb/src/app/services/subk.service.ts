import { Injectable } from '@angular/core';
import { SubkEmployees } from '../tsclasses/subk-employees';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { BackfillAttrition } from '../tsclasses/backfill-attrition';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubkService {
  hostName: string;
  httpOptions = {}


  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getSubkEmployeesList(): Observable<SubkEmployees[]> {
    return this.http.get<SubkEmployees[]>(this.hostName + environment.SUBKEMPLOYEES_LIST , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getdeptDetails<DeptRequest>(dept: any): Observable<DeptRequest> {
    return this.http.get<DeptRequest>(this.hostName + environment.GET_DEPT_DETAILS_SUBK + dept, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      })
    );

  }
}
