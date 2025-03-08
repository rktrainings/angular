import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AuthService } from './auth-service.service';
import { catchError } from 'rxjs/operators';
import * as XLSX from 'xlsx';
const EXCEL_EXTENSION = '.xls';
const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  hostName: string;
  httpOptions = {};

  constructor(private http: HttpClient, private authService: AuthService, private errorService: ErrorService) {
    this.hostName = environment.url;
    this.httpOptions = this.authService.getFileHeaders();
  }
  public exportDataToExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }
  public saveAsExcelFile(buffer: any, fileName: string): void {
    let data: Blob = new Blob([buffer], {
      type: 'application/vnd.ms-excel;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + '_EXPORT_' + new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear() + EXCEL_EXTENSION);
  }
  exportData(url: string) {
    this.httpOptions = this.authService.getFileHeaders();
    return this.http.get(this.hostName + url, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

  exportBizopsData(url: string, body: any) {
    // this.httpOptions = this.authService.getFileHeaders();
    return this.http.post(this.hostName + url, body, this.httpOptions).pipe(
      catchError(err => {
        throw this.errorService.handleError(err)
      }));
  }

   saveFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/pdf'
    });
    FileSaver.saveAs(data, fileName + '_exportCHANDU_' + new Date().getTime() + PDF_EXTENSION);
  }
}
