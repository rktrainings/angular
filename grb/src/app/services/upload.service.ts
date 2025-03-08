import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  @Output() percentDone: EventEmitter<number> = new EventEmitter<number>();
  @Output() uploadSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  hostName: string;
  headers_object: HttpHeaders = new HttpHeaders();
  httpOptions = {}
  httpFileOptions = {}
  headers: HttpHeaders;
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  constructor(private cookieService:CookieService,private http: HttpClient, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getHeaders();
    this.httpFileOptions = this.authService.getFileHeaders();
  }

  basicUpload(files: File[],url: string) {

    let key = this.cookieService.get('key')
    let headers = new HttpHeaders({
      'Authorization': 'key=' + key,
    });

    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('file', f)
     // formData.append('role', role)
    )
    this.http.post(this.hostName + url, formData, { headers: headers, reportProgress: true, observe: 'events' })
      // .pipe(delay(100 * 1000))
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percent = Math.round(100 * event.loaded / event.total);
          this.emitPercentChangeEvent(percent);
        } else if (event instanceof HttpResponse) {
          // this.uploadSuccess = true;
          this.emitStatusChangeEvent(true);
        }
      })
  }


  emitStatusChangeEvent(status: boolean) {
    this.uploadSuccess.emit(status);
  }

  getStatusChangeEmitter() {
    return this.uploadSuccess;
  }

  emitPercentChangeEvent(percent: number) {
    this.percentDone.emit(percent);
  }

  getPercentChangeEmitter() {
    return this.percentDone;
  }

  public exportDataToExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

}
