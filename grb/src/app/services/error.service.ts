import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie';
import { ReportsService } from './reports.service';

@Injectable()
export class ErrorService {

  constructor(public router: Router, private notification: NotificationService,
    private matdialog: MatDialog,private spinner:NgxSpinnerService,private cookieService:CookieService) {
  }

  handleError(error: HttpErrorResponse) {
    //////////console.log(this.router)

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      ////////////console.log('An error occurred:',error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // //////////console.log(error)
      // if(error['status']==403){
      //   //////////console.log(this.router)
      //   this.no.showSnackBar('jdkndknknfekn')
      //   // this.router.navigateByUrl('/dashboard')
      // }
      console.error(
        `Backend returned code ${error.statusText},` +
        `body was: ${error.error}`
      );
    }

    // if session timeout
    let key = this.cookieService.get('key')
    // let timeout = JSON.parse(this.cookieService.get('timeout'))
    //console.log(error.status);
    
    if (error.status == 401 || error.status == 403) {
      this.matdialog.closeAll();
      this.spinner.hide();
      sessionStorage.clear();
      this.cookieService.removeAll();
      this.cookieService.remove('download')
      localStorage.clear();
      this.router.navigateByUrl('/session-expired')
    } else {
      this.cookieService.remove('download')
      this.notification.showSnackBar("Sorry!!...Please try after some time ")
      this.matdialog.closeAll();
      this.spinner.hide();
      this.router.navigateByUrl('/main-menu');
      setTimeout(()=>{
      window.location.reload();
      },3000)
    }

    // return an ErrorObservable with a user-facing error message
    return Observable.throw(error.message || 'Server Error');
  };

  isExpired(timeout: Date) {
    let currentDate = new Date();
    //////////console.log(timeout)
    timeout = new Date(timeout)
    if (timeout) {
      if (currentDate.getDate() >= timeout.getDate()) {
        if (currentDate.getHours() >= timeout.getHours()) {
          if (currentDate.getMinutes() >= timeout.getMinutes()) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
  handleFileError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      ////////////console.log('An error occurred:',error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //////////console.log(error.error.text)
      // console.error(
      //   `Backend returned code ${error.statusText},` +
      //   `body was: ${error.error}`
      // );
    }

    // if session timeout
    if (error.status == 401 || error.status == 403) {
      location.reload();
    }

    // return an ErrorObservable with a user-facing error message
    return error.error.text;
  };
}
