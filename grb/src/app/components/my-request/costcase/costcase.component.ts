import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MyRequestService } from 'src/app/services/my-request.service';
import { CostcaseAuditComponent } from '../audit-dialogs/costcase-audit/costcase-audit.component';

@Component({
  selector: 'app-costcase',
  templateUrl: './costcase.component.html',
  styleUrls: ['./costcase.component.scss']
})

export class CostcaseComponent implements OnInit {
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  enabledNoDataMsg = false;
  dataSource = new MatTableDataSource();

  @Input() costcaseDataSource: any[];

  @Input() isCostcaseEnabled: any;
  constructor(private dialog: MatDialog, private myrequestservice: MyRequestService) { }
  displayedColumns: string[] = ['deptCode','deptName','sdl','month','year','ccType','submittedBy','submittedDate','status'];
  allColumns: string[] = ['deptCode','deptName','sdl','month','year','ccType','submittedBy','submittedDate','status','auditlog'];
  ngOnInit() {
    if (this.isCostcaseEnabled === 'Enabled') {
      this.dataSource.data = this.costcaseDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
  }
  openDialog(element) {
    const dialogRef = this.dialog.open(CostcaseAuditComponent, {
      width: '1350px',
      data: element,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('The dialog was closed');
    });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    

  }

}
