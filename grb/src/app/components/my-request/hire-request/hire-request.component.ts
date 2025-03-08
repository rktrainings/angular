import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MyRequestService } from 'src/app/services/my-request.service';
import { ApprovalCenterService } from 'src/app/services/approval-center.service';
import { AuditComponent } from '../audit-dialogs/hire-request-audit/audit.component';



@Component({
  selector: 'app-hire-request',
  templateUrl: './hire-request.component.html',
  styleUrls: ['./hire-request.component.scss']
})
export class HireRequestComponent implements OnInit {
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  enabledNoDataMsg = false;
  dataSource = new MatTableDataSource();

  @Input() hireDataSource: any[];

  @Input() isHireEnabled: any;

  constructor(private approvalCenterService: ApprovalCenterService,
    private dialog: MatDialog, private myrequestservice: MyRequestService) { }

  ngOnInit() {
    if (this.isHireEnabled === 'Enabled') {
      this.dataSource.data = this.hireDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = ['metro', 'deptCode', 'deptName', 'hiretype', 'band', 'requestType', 'Tquantity', 'requestSubmmitedDate', 'Comments', 'lastUpdatedDate', 'Status', 'auditlog'];

  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    

  }


  openDialog(element) {


    const dialogRef = this.dialog.open(AuditComponent, {
      width: '1350px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: element.metroNo,
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('The dialog was closed');

    });
  }
}
