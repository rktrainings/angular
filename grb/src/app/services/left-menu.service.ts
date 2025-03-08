import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MySpan } from '../tsclasses/my-span.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { UserDetailsService } from './user-details.service';




@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  hostName: string;
  httpOptions = {}
  menu = [];

  private menuStore = new BehaviorSubject<any[]>([]);

  // Make UserName store Observable
  public menu$ = this.menuStore.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private authService: AuthService, public userDetailsService: UserDetailsService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
  }
  setMenu(data) {
    this.menu = data;
    // this.menuStore.next(this.filterMenu());

  }

  getMenu() {
    return this.menu;
  }

  // filterMenu() {
  //   let roles = this.userDetailsService.getRoles();
  //   this.menu = this.menu.filter(obj => {
  //     let childArray = obj.child.filter((item, j) => {
  //       let arr = roles.filter(value => item.role.includes(value))
  //       return arr.length > 0
  //     })
  //     obj.child = childArray
  //     return (obj.child.length > 0 || obj.key == 'Dashboard')
  //   });
  //   return this.menu;
  // }

  getServiceRequest() {
    return this.http.get(this.hostName + '/app01/rolemapping', this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }



  postServiceRequest(url: string, data) {
    return this.http.post(this.hostName + url, JSON.stringify(data), this.httpOptions).pipe(
catchError(err => {
        throw this.errorService.handleError(err)
      }),    );
  }


}
