import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MySpan } from '../tsclasses/my-span.model';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { AuditTable } from '../tsclasses/audit-table';




@Injectable({
    providedIn: 'root'
})
export class GrbArchiveService {
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

    getGrbArchiveDetails<ApprovalCenterDetails>(key, value): Observable<ApprovalCenterDetails> {
       
        return this.http.get<ApprovalCenterDetails>(this.hostName + environment.GRB_ARCHIVE_FETCH_API + key + '/' + value, this.httpOptions).pipe(
            catchError(err => {
                throw this.errorService.handleError(err)
            }));
    }
    getGRBArchiveAuditDetails(metro: any) {
       
        return this.http.get<AuditTable[]>(this.hostName + environment.GRB_ARCHIVE_AUDIT_API + metro, this.httpOptions).pipe(
            catchError(err => {
                throw this.errorService.handleError(err)
            }));

    }   
     deleteMetro(archiveDetails: any) {
       
        return this.http.post(this.hostName + environment.GRB_ARCHIVE_DELETE_API, JSON.stringify(archiveDetails), this.httpOptions).pipe(
            catchError(err => {
              throw this.errorService.handleError(err)
            }));

    }
}
