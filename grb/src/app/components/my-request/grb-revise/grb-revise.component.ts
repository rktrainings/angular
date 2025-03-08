import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { GrbreviseAuditComponent } from '../audit-dialogs/grbrevise-audit/grbrevise-audit.component';
import { MyRequestService } from 'src/app/services/my-request.service';

@Component({
  selector: 'app-grb-revise',
  templateUrl: './grb-revise.component.html',
  styleUrls: ['./grb-revise.component.scss']
})
export class GrbReviseComponent implements OnInit {
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  enabledNoDataMsg = false;
  dataSource = new MatTableDataSource();

  @Input() grbreviseDataSource: any[];

  @Input() isGRBReviseEnabled: any;
  constructor(private dialog: MatDialog, private myrequestservice: MyRequestService) { }
  displayedColumns: string[] = ['metro', 'grbNum', 'deptCode', 'deptName', 'band', 'nominatedempId', 'empName', 'empDeptCode', 'empband', 'submittedDate', 'Status', 'auditlog'];
  ngOnInit() {
    if (this.isGRBReviseEnabled === 'Enabled') {
      this.dataSource.data = this.grbreviseDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
  }
  openDialog(element) {


    const dialogRef = this.dialog.open(GrbreviseAuditComponent, {
      width: '1350px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: element.grbNumber,
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
