import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { AuditService } from 'src/app/services/audit.service';
import { AuditTable } from 'src/app/tsclasses/audit-table';
import { MyRequestMainComponent } from '../../my-request-main/my-request-main.component';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  metro:any;
  ELEMENT_DATA: AuditTable[] = [];
  displayedColumns: string[] = ['metro', 'band', 'deptCode', 'submittedBy' , 'submittedDate', 'lastUpdatedBy', 'lastUpdatedDate', 'status', 'comments'];
  enableLoadingMsg: boolean;
  enabledNoDataMsg: boolean;
  dataSource = new MatTableDataSource<AuditTable>(this.ELEMENT_DATA);
  constructor(public dialogRef: MatDialogRef<MyRequestMainComponent>, public auditservice: AuditService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  
    this.metro= this.data;
  }


  ngOnInit() {
   
   this.getData();

  }

  getData() {
    this.enableLoadingMsg = false;
    this.enabledNoDataMsg = false;
    this.auditservice.getAuditDetails(this.metro).subscribe((data: any[]) => {
      
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

