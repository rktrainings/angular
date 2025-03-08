import { Injectable } from '@angular/core';
import { ExcelService } from './excel.service';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  reports = [];
  private reportsStore = new BehaviorSubject<any>([]);
  public reports$ = this.reportsStore.asObservable();

  constructor(private excel: ExcelService, private notification: NotificationService) {

  }

  downloadReport(url: string, fileName: string) {

    this.setDownloadingReport(fileName)
    this.excel.exportData(url).subscribe(data => {
      this.popDownloadingReport(fileName)
      console.log('fileName', fileName);
      console.log('url', url);
      console.log('data', data);

      this.excel.saveAsExcelFile(data['body'], fileName);
    })
  }

  setDownloadingReport(fileName) {
    this.reports.push(fileName)
    this.reportsStore.next(this.reports);
  }

  popDownloadingReport(fileName) {
    this.reports.splice(this.reports.indexOf(fileName), 1);
    this.reportsStore.next(this.reports);
  }
  popAllReports() {
    this.setDownloadingReport([])

  }
}
