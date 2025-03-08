import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MySpan } from '../tsclasses/my-span.model';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class MySpanService {
  hostName: string;
  httpOptions = {}
  mySpanData = [];
  fetchedMySpan = false;
  private mySpanStore = new BehaviorSubject<any>([]);
  public mySpan$ = this.mySpanStore.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  setMySpan(data) {
    this.fetchedMySpan = true;
    this.mySpanStore.next(data);
  }
  getFetchedMySpan() {
    return this.fetchedMySpan;
  }

  getMySpanData(url: string): Observable<MySpan[]> {
    return this.http.get<MySpan[]>(this.hostName + url, this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }

  postEditedData(url: string, data): Observable<MySpan[]> {
    return this.http.post<MySpan[]>(this.hostName + url, JSON.stringify(data), this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }
  getBySearch(url: string, data): Observable<MySpan[]> {
    return this.http.post<MySpan[]>(this.hostName + url, JSON.stringify(data), this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }


}
