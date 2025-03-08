import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CiReleaseService } from 'src/app/services/ci-release.service';
import { CostCaseService } from 'src/app/services/cost-case.service';

@Component({
  selector: 'app-ci-release-pending',
  templateUrl: './ci-release-pending.component.html',
  styleUrls: ['./ci-release-pending.component.scss']
})
export class CiReleasePendingComponent implements OnInit {
  displayedHeaders: string[] = ['REQUEST TYPE','REQUESTED FOR', 'DEPT CODE', 'DEPT NAME','TOTAL FTE','SUBMITTED BY', 'SUBMITTED DATE','COMMENTS']
  displayedColumns: string[] = ['requestType','requestedFor','deptCode', 'deptName','fteCount','submittedBy', 'submitteddate','comments']
  AllColumns: string[] = ['requestType','requestedFor','deptCode', 'deptName','fteCount','submittedBy', 'submitteddate','comments','actions']
  dataSource = new MatTableDataSource([]);
  filteredData = [];
  show = false;
  enabledNoDataMsg: boolean;
  count: number;
  constructor(private ciRelease: CiReleaseService, private router: Router) { 

  }

  ngOnInit() {
  this.show = false;
    this.ciRelease.getAllPendingRequests().subscribe((data: any[]) => {

      this.dataSource = new MatTableDataSource(data);
      this.count=this.dataSource.data.length;

      this.show = true
    });

  }

  onActionClick(element) {
    this.ciRelease.setCIReleaseData(element);
    this.router.navigateByUrl('/approval-center/ci-release/view')
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
    this.count=this.dataSource.filteredData.length;
  }

}
