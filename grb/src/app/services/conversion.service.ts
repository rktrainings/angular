import { Injectable } from '@angular/core';
import { SubkEmployees } from '../tsclasses/subk-employees';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { BackfillAttrition } from '../tsclasses/backfill-attrition';
import { catchError } from 'rxjs/operators';
import { ConversionEmployees } from '../tsclasses/conversion';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  hostName: string;
  httpOptions = {}


  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getConversionEmployeesList(): Observable<ConversionEmployees[]> {
    return this.http.get<ConversionEmployees[]>(this.hostName + environment.CONVERSION_EMPLOYESS , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getConversionExtensionEmployeesList(): Observable<ConversionEmployees[]> {
    return this.http.get<ConversionEmployees[]>(this.hostName + environment.CONVERSION_EXTENSION_EMPLOYEES , this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
}

