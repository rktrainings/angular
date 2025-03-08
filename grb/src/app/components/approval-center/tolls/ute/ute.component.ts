import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApprovalCenterTolls } from 'src/app/tsclasses/approval-center-tolls';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';

@Component({
  selector: 'app-ute',
  templateUrl: './ute.component.html',
  styleUrls: ['./ute.component.scss']
})
export class UteComponent implements OnInit {

  dataSourceUTE: any = [];
  isUTEAPICallEnabled: boolean = false;
  enableLoadingMsg: boolean = true;
  enabledUTE: boolean = false;

  constructor(private approvalCenterService: ApprovalCenterService) {

  }

  ngOnInit() {
    this.enabledUTE = true;
    this.fetchORPTollDetails('UTE');
    this.approvalCenterService.hireRequestUTE$.subscribe(data => {
      // let apiInvoked = this.approvalCenterService.getHireRequestUTEInvoked();
      // let apiInvoked=false;
      // if (apiInvoked) {
      //   this.enableLoadingMsg = false;
      //   this.isUTEAPICallEnabled = true;
      // } else {
      //   this.enableLoadingMsg = true;
      // }
      this.dataSourceUTE = data;
    })
  }

  fetchORPTollDetails(tollName: string) {
    this.isUTEAPICallEnabled = false;
    this.enableLoadingMsg = true;
    this.approvalCenterService.getTollsDetails<ApprovalCenterTolls[]>(tollName).subscribe((data: ApprovalCenterTolls[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.isUTEAPICallEnabled = true;
      this.enableLoadingMsg = false;

      this.approvalCenterService.setHireRequestUTE(data);
      // this.dataSourceUTE = data;
      // if (this.dataSourceUTE !== null) {
      //   this.enableLoadingMsg = false;
      // }
    });
  }

}
