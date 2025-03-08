import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CiDashboard } from 'src/app/tsclasses/ci-dashboard';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';

@Component({
  selector: 'app-ci-dashboard',
  templateUrl: './ci-dashboard.component.html',
  styleUrls: ['./ci-dashboard.component.scss']
})
export class CiDashboardComponent implements OnInit {

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  //private request: RequestDashboard[] = [];
  dataSource = new MatTableDataSource<CiDashboard>();
  
  enabledNoDataMsg: boolean = false;
  @Input() ciDataSources: any;
  @Input() enabledCi: any;
  

  displayedColumns: string[] = ['requesttype','requestedfor', 'band','depcode','deptname','ftecount', 'requeststatus','lastActionDate'];

  constructor(public dialog: MatDialog) {
  }


  ngOnInit() {
    if (this.enabledCi === 'Enabled') {
      this.dataSource.data = this.ciDataSources;
    } 
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    this.dataSource.data.sort((a, b) => {
      return new Date(b['lastActionDate']?b['lastActionDate']:b['submitteddate']).getTime() - new Date(a['lastActionDate']?a['lastActionDate']:a['submitteddate']).getTime();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getActionDate(element : CiDashboard){
    if(element.lastActionDate==null)
    {
      return element.submitteddate;
    }
    else{
      return element.lastActionDate
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }

  }

  
}
