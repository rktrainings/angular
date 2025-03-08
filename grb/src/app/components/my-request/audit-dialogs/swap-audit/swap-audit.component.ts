import { Component, OnInit, Inject, Optional } from '@angular/core';
import { AuditTable } from 'src/app/tsclasses/audit-table';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { AuditService } from 'src/app/services/audit.service';
import { MyRequestMainComponent } from '../../my-request-main/my-request-main.component';

@Component({
  selector: 'app-swap-audit',
  templateUrl: './swap-audit.component.html',
  styleUrls: ['./swap-audit.component.scss']
})
export class SwapAuditComponent implements OnInit {
  grbnum: any;
  ELEMENT_DATA: AuditTable[] = [];
  displayedColumns: string[] = ['metronum', 'grbnum', 'createdBy', 'createDate', 'lastUpdatedBy', 'lastUpdatedDate', 'status', 'assignedTo'];
  dataSource = new MatTableDataSource<AuditTable>(this.ELEMENT_DATA);
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;

  constructor(public dialogRef: MatDialogRef<MyRequestMainComponent>, public auditservice: AuditService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.grbnum = data.swapGRBNumber;
    //////console.log(this.grbnum);
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
    this.auditservice.getSwapAuditDetails(this.grbnum).subscribe((data: any[]) => {

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
