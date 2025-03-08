import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TermsService {

  hostName: string;
  httpOptions = {}


  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }

  getServiceRequest(url: string) {
    this.httpOptions = this.authService.getHeaders();
    return this.http.get(this.hostName + url, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  postServiceRequest(url: string, data) {
    this.httpOptions = this.authService.getHeaders();
    return this.http.post(this.hostName + url, data, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));


  }


}
