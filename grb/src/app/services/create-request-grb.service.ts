import { Injectable } from '@angular/core';
import { CreateRequestGrb } from '../tsclasses/create-request-grb';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth-service.service';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
@Injectable({
  providedIn: 'root'
})
export class CreateRequestGrbService {
  hostName: string;
  httpOptions: any;
  grbBandDetails: any;
  private fileStore: any = {};
 

  constructor(private cookieService:CookieService,private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getCommonData(): Observable<any> {
    return this.http.get<CreateRequestGrb[]>(this.hostName + environment.CREATE_REQUEST_GRB, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getEmpDetails(empId, band): Observable<any> {
    //////console.log(empId, band)
    return this.http.get<any>(this.hostName + environment.GRB_REVISE_INTERNAL_DETAILS + empId + "/" + band, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  submitRequestGrbRevise(data): Observable<any> {
    return this.http.post<any>(this.hostName + environment.SUBMIT_GRB_REVISE_REQUEST, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  getSwapEmpDetails(empId: any, band:any): Observable<any> {
    //////console.log(empId)
    return this.http.get<any>(this.hostName + environment.CREATE_REQUEST_GRB_SWAP_GET_EMPLOYEE_API + empId + '/' + band, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postSubmitSwapDetails(swapCreateRequest: any): Observable<any> {
    //////console.log(swapCreateRequest)
    return this.http.post<any>(this.hostName + environment.CREATE_REQUEST_GRB_SWAP_CREATE_REQUEST_API, swapCreateRequest, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  setGrbDetails(data) {
    this.grbBandDetails = data;
  }
  getGrbDetails() {
    return this.grbBandDetails;
  }
  setUploadedFile(file: File[]) {
    // this.fileStore.next(file);
    this.fileStore = file;
  }
  getUploadedFile() {
    return this.fileStore;
  }
  submitBandChangeWithAttachment(files: File[], bandchangedata: any) {
    //////console.log('submitGRBWithAttachment');
    //////console.log('files', files);
    //////console.log("bdata", bandchangedata);
    //////console.log('templateDatajs', JSON.stringify(bandchangedata));
    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
      //'Content-Type': undefined
    });
    var postData = JSON.stringify(bandchangedata);
    
    var formData = new FormData();

    Array.from(files).forEach(f =>
      formData.append('files', f),

    );

    formData.append('data', postData)
    // //////console.log('hostname', this.hostName + environment.BAND_CHANGE_SUBMIT);
    return this.http.post(this.hostName + environment.BAND_CHANGE_SUBMIT, formData,
      { headers: headers })
      .pipe(catchError(err => {
        throw this.errorService.handleError(err);
      }));
    // return this.http.post(this.hostName + environment.GRB_SUBMIT_API, formData,
    //   { headers: headers, reportProgress: true, observe: 'events' })
    //   .pipe(catchError(err => {
    //     throw this.errorService.handleError(err);
    //   }));
  }
  submitDowngradeRequest(bandChangeRequest): Observable<any>{
    //////console.log(bandChangeRequest)
    var bchange=JSON.stringify(bandChangeRequest);
    //////console.log(bchange);
    return this.http.post<any>(this.hostName + environment.BAND_CHANGE_SUBMIT_DOWNGRADE, bchange, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  getgreaterBandlist(band: any,action:any) {
    return this.http.get(this.hostName + environment.GREATER_BAND_LIST_API + band + '/' +action, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      })
    );
  }


}