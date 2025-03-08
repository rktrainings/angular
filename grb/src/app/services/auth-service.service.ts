import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { time } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = "";
  constructor(private cookieService: CookieService) { }
  // BehaviorSubject to store terms
  private TermsStore = new BehaviorSubject<string>("");

  // Make UserName store Observable
  public Terms$ = this.TermsStore.asObservable();


  // BehaviorSubject to store key
  private sessionStore = new BehaviorSubject<string>("");

  // Make UserName store Observable
  public session$ = this.sessionStore.asObservable();

  setJwt(key) {
    // if (!this.cookieService.get('key')) {
    let timeout = new Date()
    timeout.setHours(timeout.getHours() + 4);
    let options = {
      expires: timeout
    }
    this.cookieService.put('key', key, options);
    // this.cookieService.pi('key', key);
    this.key = key
    this.sessionStore.next(key);
    // }
  }

  clearSession() {
    // sessionStorage.clear();
    this.cookieService.remove('terms');
    this.cookieService.remove('uname');
    this.cookieService.remove('loggedInUser');
    this.cookieService.remove('authenticated');
    this.cookieService.remove('roles');
    this.cookieService.remove('timeout');
    this.cookieService.remove('user-details');
    this.cookieService.remove('key');
    this.cookieService.remove('JSESSIONID');
    
    localStorage.clear();
    sessionStorage.clear();
    // this.cookieService.removeAll();
  }

  getHeaders() {
    let key = this.cookieService.get('key')
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=' + key
      }),
      // observe: 'response',
    };
    return httpOptions;

  }
  // getFileHeaders() {
  //   const fileHttpOptions = {
  //     headers: new HttpHeaders({
  //     })
  //   };
  //   let key = sessionStorage.getItem('key')
  //   var httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'key=' + key,
  //       // 'Content-Type': 'application/vnd.ms-excel;charset=utf-8',
  //       'Accept': 'application/vnd.ms-excel; charset=utf-8',
  //     }),
  //     observe: 'response',
  //     responseType: 'blob'
  //   };
  //   return httpOptions;
  // }


  getFileHeaders() {
    // const fileHttpOptions = {
    //   headers: new HttpHeaders({
    //   })
    // };
    //  let jwt = sessionStorage.getItem('jwt')
    let key = this.cookieService.get('key')
    var httpOptions = {
      headers: new HttpHeaders({
        //  'Authorization': 'Bearer ' + jwt,
        'Authorization': 'key=' + key,
        // 'Content-Type': 'application/vnd.ms-excel;charset=utf-8',
        'Accept': 'application/vnd.ms-excel; charset=utf-8',
      }),
      observe: 'response',
      responseType: 'blob'
    };
    return httpOptions;
  }

  // if (status == 'NOTACCEPTED')
  //   return false;
  // else if (status == 'ACCEPTED')
  //   return true
  // else
  //   return true;

  // ...
  public isAuthenticated(): boolean {
    let auth = JSON.parse(this.cookieService.get('authenticated'));
    this.setTerms(status)
    if (auth)
      return true;
    else
      return false;
  }
  public hasAccepted(): boolean {
    let terms = this.cookieService.get('terms');
    this.setTerms(status)
    if (terms == 'ACCEPTED')
      return true;
    else
      return false;
  }

  // Setter to update UserName
  setTerms(status) {

    this.TermsStore.next(status);
  }

}

