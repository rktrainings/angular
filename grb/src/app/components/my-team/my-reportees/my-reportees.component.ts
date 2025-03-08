import { Component, OnInit } from '@angular/core';
import { MyReportees } from 'src/app/tsclasses/my-reportees.model';
import reportees from 'src/assets/data/my-team/my-reportees/my-reportees.json';
import { environment } from 'src/environments/environment';
import { MyReporteesService } from 'src/app/services/my-reportees.service';

@Component({
  selector: 'app-my-reportees',
  templateUrl: './my-reportees.component.html',
  styleUrls: ['./my-reportees.component.scss']
})
export class MyReporteesComponent implements OnInit {
  displayedHeaders: string[] = ['EMPLOYEE ID', 'EMPLOYEE NAME', 'DEPARTMENT NAME', 'BAND', 'IS MANAGER', 'GEO',  'TOWER', 'SUB PROCESS', 'EMPLOYEE TYPE']
  displayedColumns: string[] = ['empId', 'employeeName', 'deptName', 'band', 'isManager', 'geo', 'tower', 'subProcess', 'employeeType']
  AllColumns: string[] = ['empId', 'employeeName', 'deptName', 'band', 'isManager', 'geo', 'tower', 'subProcess', 'employeeType', 'actions', 'auditLogs'];
  ELEMENT_DATA: MyReportees[] = [];
  showActions = true;
  showCheckBox = false;
  showSearchFilter = true;
  showLoader = false;

  constructor(private myReportees: MyReporteesService) { }

  ngOnInit() {

    // this.ELEMENT_DATA = reportees;
    this.getReporteesData();
    // this.myReportees.myReportees$.subscribe(data => {
    //   this.ELEMENT_DATA = data
    //   //////////console.log(data)
    //   if (this.myReportees.getFetchedMyReportees()) {
    //     this.showLoader = false;
    //   }
    //   else{
    //     this.showLoader = true;
    //   }
    // })
  }

  getReporteesData() {
    //   if (this.myReportees.getFetchedMyReportees())
    //   this.showLoader = false;
    // else
    this.showLoader = true;
    this.myReportees.getServiceRequest(environment.MY_REPORTEE).subscribe((data: MyReportees[]) => {
      this.myReportees.setMyReportees(data)
      this.showLoader = false;

      this.ELEMENT_DATA = data
      // this.ELEMENT_DATA = data;
      this.showLoader = false;

    })
  }
}
