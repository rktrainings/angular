import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AuditLogsComponent } from '../audit-logs/audit-logs.component';
import { EditMyTeamComponent } from '../edit-my-team/edit-my-team.component';
import { AddResignationComponent } from '../add-resignation/add-resignation.component';
import { ExcelService } from 'src/app/services/excel.service';
import { WithdrawResignationComponent } from '../withdraw-resignation/withdraw-resignation.component';
import { AuditService } from 'src/app/services/audit.service';
import { Audit } from 'src/app/tsclasses/audit.model';
import { CommonService } from 'src/app/services/common-service.service';

import * as fileSaver from 'file-saver';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ReportsService } from 'src/app/services/reports.service';
import { CookieService } from 'ngx-cookie';
import { NotificationService } from 'src/app/services/notification.service';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-tabular-view',
  templateUrl: './tabular-view.component.html',
  styleUrls: ['./tabular-view.component.scss']
})
export class TabularViewComponent implements OnInit {
  @Input() displayedHeaders = []
  @Input() ELEMENT_DATA = []
  @Input() displayedColumns = []
  @Input() AllColumns = []
  @Input() showActions: boolean = true;
  @Input() fetchData: boolean = false;
  @Input() showSearchFilter: boolean = false;
  input = '';
  @Input() showCheckBox: boolean = false;

  @Input() managersList = [];
  @Input() PARENT = "";

  @Output() getDataOnSearch = new EventEmitter();
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedFilter: string;
  dataSourceTemp = [];
  checked = false;
  selectedManager: string;
  checkedViewManagers: boolean = true;
  checkedViewReportees: boolean = false;
  disableSearch = false;
  textLength: number = 6;
  fetchFromApi = false;
  empID: string;
  requestObj = { empId: null, deptCode: null, supId: null };
  searchValue = ""
  showNoData = false;
  count = 0;
  enableLoader: any = false;
  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog, private excelService: ExcelService,
    private el: ElementRef, private auditService: AuditService,
    private commonService: CommonService, private notification: NotificationService,
    private userDetails: UserDetailsService, private cookieService: CookieService, private reports: ReportsService) { }

  ngOnInit() {
    //////////console.log(this.ELEMENT_DATA)
    this.loadData();
    this.disabledSearch();
    this.empID = this.cookieService.get('loggedInUser');
  }



  getManagersData() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.filter(e => e.isManager == 'Manager'));
    // this.dataSource.paginator = this.paginator;
    this.getManagersList();
    this.count = this.dataSource.filteredData.length
    this.dataSource.sort = this.sort;
  }

  disabledSearch() {
    if (this.showSearchFilter) {
      if (!this.selectedFilter) {
        this.disableSearch = true;
      } else {
        this.disableSearch = false;
      }
    }
  }

  enableSearch() {
    //////////console.log(this.selectedFilter)
    this.disabledSearch();
    if (this.selectedFilter == 'deptCode') {
      this.textLength = 3
    } else {
      this.textLength = 6
    }
  }

  loadData() {
    if (this.showCheckBox)
      this.getManagersData()
    else
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    setTimeout(() => {
      this.updateData(this.dataSource)

    }, 0);
    if (this.showActions == false) {
      this.AllColumns.splice(this.AllColumns.indexOf('actions'), 1)
    }
    if (this.dataSource.data.length == 0) {
      this.showNoData = true;
    }
  }



  openDialog(component, data, width, height) {
    const dialogRef = this.dialog.open(component, {
      width: width,
      height: height,
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      //////////console.log('The dialog was closed');
      //////////console.log(result)
    });
  }

  openAuditLogs(item) {
    //////////console.log(item)
    // this.spinner.show()
    // this.auditService.getServiceRequest('/app01/getaudit/' + item.empId).subscribe((data: Audit[]) => {
    // this.spinner.hide()
    //   let auditData = []
    //   data.forEach(obj => {
    //     obj['updated_fields'].forEach((eachField, i) => {
    //       eachField['updatedBy'] = obj['updatedBy'];
    //       eachField['updatedTime'] = obj['updatedTime'];
    //       auditData.push(eachField)
    //     })

    //   })

    this.openDialog(AuditLogsComponent, item, '800px', '500px');
    // })

  }
  addOrWithdrawResignation(element) {
    if (element.lwd) {
      this.openDialog(WithdrawResignationComponent, element, '550px', '300px');
    }
    else {
      this.openDialog(AddResignationComponent, element, '500px', '410px');
    }
  }
  editRow(element) {
    if (element.empId != this.empID) {
      this.openDialog(EditMyTeamComponent, element, '850px', '220px');
    } else {
      this.notification.showSnackBar("Sorry!!...You can't edit the record")
    }
  }



  // only for my-span
  viewManagers() {

    if (!this.checkedViewManagers) {
      this.getManagersData()
    } else {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    }
  }


  exportBizopsData(url) {
    let role = this.userDetails.getHighestRole();
    this.requestObj['key'] = this.selectedFilter ? this.selectedFilter : null;
    if (role == 'GRBEO' || role == 'ADMIN') {
      this.requestObj[this.selectedFilter] = this.searchValue;
      this.requestObj['role'] = role

    } else {
      this.requestObj['role'] = null;
    }
    if (this.selectedFilter == 'empId') {
      this.requestObj['deptCode'] = null;
      this.requestObj['supId'] = null;
    }
    else if (this.selectedFilter == 'deptCode') {
      this.requestObj['empId'] = null;
      this.requestObj['supId'] = null;
    }
    else if (this.selectedFilter == 'supId') {
      this.requestObj['empId'] = null;
      this.requestObj['deptCode'] = null;
    }
    this.reports.setDownloadingReport(this.PARENT.replace('_', ' '));
    this.excelService.exportBizopsData(url, this.requestObj).subscribe(data => {
      //////////console.log(data)
      this.reports.popDownloadingReport(this.PARENT.replace('_', ' '));
      this.excelService.saveAsExcelFile(data['body'], this.PARENT);

    })
  }
  exportData() {
    let url = "";
    if (this.PARENT == 'MY_SPAN') {
      url = environment.EXPORT_MYSPAN
      this.exportBizopsData(url);
    }
    else if (this.PARENT == 'MY_REPORTEES') {
      url = environment.EXPORT_MYREPORTEE
      this.reports.setDownloadingReport(this.PARENT.replace('_', ' '));
      this.excelService.exportData(url).subscribe(data => {
        //////////console.log(data)
        this.reports.popDownloadingReport(this.PARENT.replace('_', ' '));

        this.excelService.saveAsExcelFile(data['body'], this.PARENT);

      })
    }

  }

  getReporteesData(item) {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.filter(e => e.supName == item.value || e.employeeName == item.value));
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.count = this.dataSource.filteredData.length

  }

  viewManagersList(event) {
    this.selectedManager = ""
    if (event.checked == false) {
      this.getManagersData();
    }
  }

  updateData(data: MatTableDataSource<any>) {
    //////////console.log(this.ELEMENT_DATA)
    if (data.filteredData.length > 0) {
      this.count = data.filteredData.length
      this.showNoData = false;
      this.dataSource = data;
      if (this.dataSource.filteredData.length > 0) {
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      if (this.el.nativeElement.querySelector('.noData')) {
        var d1 = this.el.nativeElement.querySelector('.noData');
        d1.remove();
      }
    } else {
      // if (!this.el.nativeElement.querySelector('.noData')) {
      //   var d1 = this.el.nativeElement.querySelector('table');
      //   //////////console.log(d1)
      //   d1.insertAdjacentHTML('afterend', '<div  class="noData"> NO DATA AVAILABLE </div> ');
      // }
      // if (this.dataSource.data.length == 0) {
      this.showNoData = true;
      this.count = data.filteredData.length

      // }
    }
  }

  updateDataFromAPI(tableData) {
    this.ELEMENT_DATA = tableData;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.filter(e => e.isManager == 'Manager'));
    this.checkedViewReportees = false;
    this.getManagersList();
    this.updateData(this.dataSource);
  }

  showLoader(bool) {
    this.enableLoader = bool;
  }
  getManagersList() {
    this.managersList = []
    this.ELEMENT_DATA.forEach(obj => {
      this.managersList.push(obj.supName)
    })
    this.managersList = this.managersList.filter(this.onlyUnique)
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  getClassTableHeader(e) {
    // let arr= ['Employee Name', 'Department Name',  'IOT', 'Tower', 'Sub Process', 'Supervisor Name', 'Employee Type'];
    // if(arr.includes(e)){
    return 'left-align'
    // }else{
    // return 'center-align'

    // }

  }
  getClass(e) {
    // if(e=='empId'|| e=='band'|| e=='isManager'||e=='supid'){
    // return 'center-align'
    // }else {
    return 'left-align';
    // }
  }

  getClassName(e) {
    if (e == 'DEPARTMENT NAME') {
      return 'deptName'
    } else if (e == 'IS MANAGER') {
      return 'isManager'
    }
  }

  getHeaderWidth(e) {
    if (e == 'BAND') {
      return '8vh';
    } else if (e == 'IOT') {
      return '8vh'
    }
    else if (e == 'TOWER') {
      return '11vh'
    } else if (e == 'IS MANAGER') {

    }else if (e == 'EMPLOYEE TYPE') {
      return '10vh'
    }
  }

  getBodyWidth(e) {
    if (e == 'BAND') {
      return '11vh';
    } else if (e == 'IOT') {
      return '8vh'
    }
    else if (e == 'TOWER') {
      return '11vh'
    } else if (e == 'DEPARTMENT NAME') {
      return '26vh'
    } else if (e == 'EMPLOYEE ID') {
      return '20vh'
    }
    else if (e == 'EMPLOYEE NAME') {
      return '5vh'
    }else if (e == 'EMPLOYEE TYPE') {
      return '10vh'
    }
    else if (e == 'SUB PROCESS') {
      return '16vh'
    }

  }

  getPadding(e) {
    if (e == 'EMPLOYEE NAME') {
      return '10vh'
    } else if (e == 'SUB PROCESS') {
      return '10vh'
    }else if (e == 'BAND') {
      return '5vh'
    }else if (e == 'EMPLOYEE TYPE') {
      return '5vh'
    }
  }
  getIsManager(item) {
    if (item == 'Manager')
      return 'YES'
    if (item.toLowerCase() == 'non_manager' || item.toLowerCase() == 'non-manager')
      return 'NO'
  }
}


