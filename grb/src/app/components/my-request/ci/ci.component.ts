import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CiDashboard } from 'src/app/tsclasses/ci-dashboard';
import { MyRequestCiDetails } from 'src/app/tsclasses/my-request-ci-details';
import { CiAuditComponent } from '../audit-dialogs/ci-audit/ci-audit.component';

@Component({
  selector: 'app-ci',
  templateUrl: './ci.component.html',
  styleUrls: ['./ci.component.scss']
})
export class CiComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  //private request: RequestDashboard[] = [];
  dataSource = new MatTableDataSource<CiDashboard>();
  
  enabledNoDataMsg: boolean = false;
  @Input() ciDataSource: any;
  @Input() isCiEnabled: any;
  

  displayedColumns: string[] = ['requesttype','requestedfor', 'band','depcode','deptname','ftecount', 'requeststatus','lastActionDate','auditlog'];

  constructor(public dialog: MatDialog) {
  }


  ngOnInit() {
    if (this.isCiEnabled === 'Enabled') {
      this.dataSource.data = this.ciDataSource;
    } 
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getActionDate(element : MyRequestCiDetails){
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

  openDialog(element) {


    const dialogRef = this.dialog.open(CiAuditComponent, {
      width: '1350px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: element.requestid, 
      disableClose: true


    });

    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('The dialog was closed');

    });
  }

}
