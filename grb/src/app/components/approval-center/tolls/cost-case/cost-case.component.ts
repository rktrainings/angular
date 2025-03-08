import { Component, OnInit } from '@angular/core';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { MatTableDataSource } from '@angular/material';
import { ApprovalCenterTolls } from 'src/app/tsclasses/approval-center-tolls';

@Component({
  selector: 'app-cost-case',
  templateUrl: './cost-case.component.html',
  styleUrls: ['./cost-case.component.scss']
})
export class CostCaseComponent implements OnInit {

  dataSourceCC: any = [];
  isCCAPICallEnabled: boolean = false;
  enableLoadingMsg: boolean = true;
  enabledCC: boolean = false;
  enabledNoDataMsg: boolean = false;

  constructor(private approvalCenterService: ApprovalCenterService) {

  }

  ngOnInit() {
    this.enabledCC = true;
    this.fetchCostCaseTollDetails('CC');
    this.enableLoadingMsg = true;

    this.approvalCenterService.hireRequestCC$.subscribe(data => {
      // let apiInvoked = this.approvalCenterService.getHireRequestCCInvoked();
      let apiInvoked = false;
      if (apiInvoked) {
        this.enableLoadingMsg = false;
        this.isCCAPICallEnabled = true;
      } else {
        this.enableLoadingMsg = true;
      }
      this.dataSourceCC = data;

    })
  }

  fetchCostCaseTollDetails(tollName: string) {
    this.isCCAPICallEnabled = false;
    this.enableLoadingMsg=true;
    this.approvalCenterService.getTollsDetails<ApprovalCenterTolls[]>(tollName).subscribe((data: ApprovalCenterTolls[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.approvalCenterService.setHireRequestCC(data)
      this.enableLoadingMsg=false;
      this.isCCAPICallEnabled = true;


    });
  }

}
