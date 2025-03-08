import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { RequestDashboard } from 'src/app/tsclasses/request-dashboard';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {

  approvedDataSources: any = [];
  approvedRequestStatus: boolean = false;
  enabledApproved: any;
  storageApprovedData = [];
  approvedDataCount: number;
  approvedCount: string;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // this.getApprovedData()
    this.fetchApprovedRequest();
  }


  fetchApprovedRequest() {
    this.approvedRequestStatus = false;

    this.dashboardService.getApprovedRequest<RequestDashboard[]>().subscribe((data: RequestDashboard[]) => {
      // this.dashboardService.setApproved(data);
      ////console.log('data', data);
      this.approvedRequestStatus = true;
      this.enabledApproved = 'Enabled';
      this.approvedDataSources = data;
    });
  }


  // getApprovedData() {
  //   ////console.log('getApprovedData');

  //   this.dashboardService.approved$.subscribe(data => {
  //     ////console.log('data', data);


  //     if (this.dashboardService.getApprovedCalled()) {
  //       this.enabledApproved = 'Enabled';
  //     }
  //     this.approvedRequestStatus = this.dashboardService.getApprovedCalled();
  //     if (this.approvedRequestStatus) {
  //       this.approvedDataSources = data;
  //       if (this.enabledApproved === 'Enabled') {
  //         this.storageApprovedData = data;
  //       }
  //       this.approvedDataCount = data.length;
  //       this.approvedCount = "[ " + this.approvedDataCount + " ]"
  //     }
  //   })
  // }

}
