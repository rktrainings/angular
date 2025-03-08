import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CostcaseAudit } from 'src/app/tsclasses/costcase-audit';
import { CostcaseComponent } from '../../costcase/costcase.component';

@Component({
  selector: 'app-costcase-audit',
  templateUrl: './costcase-audit.component.html',
  styleUrls: ['./costcase-audit.component.scss']
})
export class CostcaseAuditComponent implements OnInit {

  dataSource = new MatTableDataSource([]);

  constructor(public dialogRef: MatDialogRef<CostcaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    displayedColumns: string[] = ['deptCode','actionDate','status','comments'];

  ngOnInit() {
    ////console.log(this.data);
    
    this.setDatasource();
  }


  setDatasource(){
    let costcaseAudit= {};
    let array = [];
    costcaseAudit['deptCode'] = this.data.deptCode;
    costcaseAudit['actionDate'] = this.data.submittedDate;
    costcaseAudit['status'] = 'SUBMITTED';
    costcaseAudit['comments'] = this.data.comments;
    array.push(costcaseAudit);
    ////console.log(this.dataSource);
      if(this.data.status === 'APPROVED' || this.data.status === 'REJECTED'){
        let costcaseAudit2= {};
        costcaseAudit2['deptCode'] = this.data.deptCode;
        costcaseAudit2['actionDate'] = this.data.approvedDate;
        costcaseAudit2['status'] = this.data.status;
        costcaseAudit2['comments'] = this.data.approverComments;
        array.push(costcaseAudit2);
        ////console.log(this.dataSource);
      }
      this.dataSource.data = array;
  }

}
