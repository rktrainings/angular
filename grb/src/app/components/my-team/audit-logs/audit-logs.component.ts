import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { TabularViewComponent } from '../tabular-view/tabular-view.component';
import { CommonService } from 'src/app/services/common-service.service';
import { AuditService } from 'src/app/services/audit.service';
import { Audit } from 'src/app/tsclasses/audit.model';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {

  displayedColumns = ['field_name', 'old_value', 'new_value', 'updatedBy', 'updatedTime'];
  dataSource = new MatTableDataSource([])

  spinner = false;
  constructor(
    public dialogRef: MatDialogRef<TabularViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public commmonService: CommonService, private auditService: AuditService) {
  }

  ngOnInit() {
    this.getLogs()
  }

  getLogs() {
    this.spinner = true
    this.auditService.getServiceRequest('/app01/getaudit/' + this.data.empId).subscribe((data: Audit[]) => {
      let auditData = []
      data.forEach(obj => {
        obj['updated_fields'].forEach((eachField, i) => {
          eachField['updatedBy'] = obj['updatedBy'];
          eachField['updatedTime'] = obj['updatedTime'];
          auditData.push(eachField)
        })

      })
      this.dataSource = new MatTableDataSource(auditData)
      this.spinner = false

      // this.openDialog(AuditLogsComponent, auditData, '800px', '500px');
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
