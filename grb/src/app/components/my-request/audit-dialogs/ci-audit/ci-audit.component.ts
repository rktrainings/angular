import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { AuditService } from 'src/app/services/audit.service';
import { CiAudit } from 'src/app/tsclasses/ci-audit';
import { MyRequestMainComponent } from '../../my-request-main/my-request-main.component';

@Component({
  selector: 'app-ci-audit',
  templateUrl: './ci-audit.component.html',
  styleUrls: ['./ci-audit.component.scss']
})
export class CiAuditComponent implements OnInit {

  value: any;
  ELEMENT_DATA: CiAudit[] = [];
  displayedColumns: string[] = ['requeststatus','submittedby','submitteddate','comments','approvedby','approveddate','approvalcomments'];
  dataSource = new MatTableDataSource<CiAudit>(this.ELEMENT_DATA);
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;
  constructor(public dialogRef: MatDialogRef<MyRequestMainComponent>, public auditservice: AuditService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.value = this.data; }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
    this.auditservice.getCiAuditDetails(this.value).subscribe((data: any[]) => {

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
