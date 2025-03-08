import { Component, OnInit, Inject } from '@angular/core';
import { AuditTable } from 'src/app/tsclasses/audit-table';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyRequestMainComponent } from '../../my-request-main/my-request-main.component';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-grbrevise-audit',
  templateUrl: './grbrevise-audit.component.html',
  styleUrls: ['./grbrevise-audit.component.scss']
})
export class GrbreviseAuditComponent implements OnInit {

  grbnum: any;
  ELEMENT_DATA: AuditTable[] = [];
  displayedColumns: string[] = ['metronum', 'grbnum', 'currentBand', 'RequestedBand', 'requestedBy', 'requestedDate', 'bizopsActionDate', 'status', 'bizopsRemarks'];
  dataSource = new MatTableDataSource<AuditTable>(this.ELEMENT_DATA);
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;
  constructor(public dialogRef: MatDialogRef<MyRequestMainComponent>, public auditservice: AuditService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.grbnum = this.data; }


  ngOnInit() {this.getData();
  }
  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
    this.auditservice.getGRBReviseAuditDetails(this.grbnum).subscribe((data: any[]) => {

      this.ELEMENT_DATA = data;
      this.dataSource.data = data;
      if (this.dataSource.data !== null) {

        this.enableLoadingMsg = true;

      }

      if (this.dataSource.data.length === 0) {

        this.enabledNoDataMsg = true;

      }

    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
