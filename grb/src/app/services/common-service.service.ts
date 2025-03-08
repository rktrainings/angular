import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { Router } from '@angular/router';
import { transformMenu } from '@angular/material';
import { CookieService } from 'ngx-cookie';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  hostName: string;
  httpOptions = {};
  GRBfields: any = [];
  GOMfields: any = [];
  selected: any;

  constructor(public router: Router, private cookieService: CookieService, private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getHeaders() {
    let key = this.cookieService.get('key')
    //////////console.log(key)
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=' + key
      }),
    };
    return httpOptions;

  }
  public requestDataFromMultipleSources(requestUrl1, requestUrl2, requestUrl3): Observable<any[]> {
    this.httpOptions = this.authService.getHeaders();
    let response1 = this.http.get(this.hostName + requestUrl1, this.httpOptions);
    let response2 = this.http.get(this.hostName + requestUrl2, this.httpOptions);
    let response3 = this.http.get(this.hostName + requestUrl3, this.httpOptions);

    return forkJoin([response1, response2, response3]);
  }


  getServiceRequest(url: string) {

    this.httpOptions = this.authService.getHeaders();
    return this.http.get(this.hostName + url, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }),
    );
  }

  getImage(id: string) {

    this.httpOptions = this.authService.getHeaders();
    return this.http.get("https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/" + id + "?type=priority&def=null&disableCaching=false", { observe: 'response' })
  }


  grbTemplateFileUpload(url, files: File[], metroNo: any) {
    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
    });

    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f),
    );
    // //////console.log('formData', formData);
    return this.http.post(this.hostName + url + metroNo, formData,
      { headers: headers })
      .pipe(catchError(err => {
        throw this.errorService.handleError(err);
      }));

  }

  postServiceRequest(url: string, data) {
    return this.http.post(this.hostName + url, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }
  putServiceRequest(url: string, data) {
    return this.http.put(this.hostName + url, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }




  /*
    Function to return the date to display on the the table/forms
    */
  returnDate(data) {

    let newDate = new Date(data);
    return newDate.getFullYear() + "-" + (((newDate.getMonth() + 1).toString().length == 1) ? ("0" + (newDate.getMonth() + 1).toString()) : (newDate.getMonth() + 1)) + "-" + (((newDate.getDate()).toString().length == 1) ? ("0" + (newDate.getDate()).toString()) : (newDate.getDate()));
  }


  /*
  Function to return the month as a name instead of the monthe in numbers
  */
  getMonth(index) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[index];
  }

  getGRB() {
    return this.GRBfields;
  }
  setGRB(data) {
    this.GRBfields = data
  }

  getGOM() {
    return this.GOMfields
  }
  setGOM(data) {
    this.GOMfields = data
  }

  formatDate(date: Date): any {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
  }

  rectifyTimeStamp(date: Date) {
    if (date.getDate()) {
      var ISTOffset = 330;   // IST offset UTC +5:30 
      date = new Date(date.getTime() + (ISTOffset) * 60000);
      return new Date (date).toISOString();
    } else {
      return null;
    }
  }

  setClickedMenu(selected){
    this.selected=selected;
  }
  getClickedMenu(){
    return this.selected;
  }
}
