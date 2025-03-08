import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs'
import { Terms } from '../tsclasses/terms.model';
import { MyReportees } from '../tsclasses/my-reportees.model';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class MyReporteesService {

  hostName: string;
  httpOptions = {};
  myReporteesData = [];
  fetchedMyReportees = false;
  private myReporteesStore = new BehaviorSubject<any>([]);
  public myReportees$ = this.myReporteesStore.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  setMyReportees(data) {
    this.fetchedMyReportees = true;
    this.myReporteesStore.next(data);
  }
  getFetchedMyReportees() {
    return this.fetchedMyReportees;
  }

  getServiceRequest(url: string): Observable<MyReportees[]> {
    return this.http.get<MyReportees[]>(this.hostName + url, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }


  postServiceRequest(url: string, data) {
    return this.http.post(this.hostName + url, data, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );


  }

}
