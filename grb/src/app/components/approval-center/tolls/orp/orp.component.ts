import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApprovalCenterTolls } from 'src/app/tsclasses/approval-center-tolls';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';

@Component({
  selector: 'app-orp',
  templateUrl: './orp.component.html',
  styleUrls: ['./orp.component.scss']
})
export class OrpComponent implements OnInit {

  dataSourceORP: any = [];
  isORPAPICallEnabled: boolean = false;
  enableLoadingMsg: boolean = true;
  enabledORP: boolean = false;

  constructor(private approvalCenterService: ApprovalCenterService) {

  }

  ngOnInit() {
    this.enabledORP = true;
    this.fetchORPTollDetails('ORP');
    this.approvalCenterService.hireRequestORP$.subscribe(data => {
      // let apiInvoked = this.approvalCenterService.getHireRequestORPInvoked();
      let apiInvoked = false;
      if (apiInvoked) {
        this.enableLoadingMsg = false;
        this.isORPAPICallEnabled = true;
      } else {
        this.enableLoadingMsg = true;
      }
      this.dataSourceORP = data;
    })
  }

  fetchORPTollDetails(tollName: string) {
    this.isORPAPICallEnabled = false;
    this.approvalCenterService.getTollsDetails<ApprovalCenterTolls[]>(tollName).subscribe((data: ApprovalCenterTolls[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.approvalCenterService.setHireRequestORP(data)
      this.isORPAPICallEnabled = true;
      this.enableLoadingMsg=false;
    });
  }

}
