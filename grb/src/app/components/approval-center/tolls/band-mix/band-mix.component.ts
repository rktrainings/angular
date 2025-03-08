import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';
import { ApprovalCenterTolls } from 'src/app/tsclasses/approval-center-tolls';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';

@Component({
  selector: 'app-band-mix',
  templateUrl: './band-mix.component.html',
  styleUrls: ['./band-mix.component.scss']
})
export class BandMixComponent implements OnInit {

  dataSourceBM: any = [];
  isBMAPICallEnabled: boolean = false;
  enableLoadingMsg: boolean = false;
  enabledBM: boolean = false;

  constructor(private approvalCenterService: ApprovalCenterService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.enabledBM = true;
    this.fetchBandMixTollDetails('BM');
    this.approvalCenterService.hireRequestBM$.subscribe(data => {
      // let apiInvoked = this.approvalCenterService.getHireRequestBMInvoked();
      let apiInvoked = false;
      if (apiInvoked) {
        this.enableLoadingMsg = false;
        this.isBMAPICallEnabled = true;
      } else {
        this.enableLoadingMsg = true;
      }
      this.dataSourceBM = data;
    })
  }

  fetchBandMixTollDetails(tollName: string) {
    this.isBMAPICallEnabled = false;
    this.enableLoadingMsg = true;
    this.approvalCenterService.getTollsDetails<ApprovalCenterTolls[]>(tollName).subscribe((data: ApprovalCenterTolls[]) => {
      if (data)
      if (data.length > 0) {
        data.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.approvalCenterService.setHireRequestBM(data)
      this.isBMAPICallEnabled = true;
      this.enableLoadingMsg = false;

      // this.dataSourceBM = data;
      // if (this.dataSourceBM !== null) {
      //   this.enableLoadingMsg = false;
      // }
    });
  }


}
