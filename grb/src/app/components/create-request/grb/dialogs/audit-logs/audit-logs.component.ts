import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { AuditService } from 'src/app/services/audit.service';
import { MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-audit-logs-grb',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})
export class AuditLogsComponent implements OnInit {
  displayedHeaders = ['METRO#', "GRB#", "CURRENT BAND", "REQUESTED BAND", "REQUESTED BY", "REQUESTED DATE", "BIZOPS ACTION DATE", "STATUS"]
  displayedColumns = ['metroNum', 'grbNum', 'currentBand', 'reqBand', 'requestedBy', 'requestedDate', 'bizopsUpdateDate', 'bandChangeStatus'];
  dataSource: any;
  @Input() auditData = []
  constructor(
    public commmonService: CommonService) {
  
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.auditData)
  }


}
