import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MyRequestService } from 'src/app/services/my-request.service';
import { BandchangeAuditComponent } from '../audit-dialogs/bandchange-audit/bandchange-audit.component';

@Component({
  selector: 'app-band-change',
  templateUrl: './band-change.component.html',
  styleUrls: ['./band-change.component.scss']
})
export class BandChangeComponent implements OnInit {
  @Input() bandChangeDataSource: any[];

  @Input() isBandChangeEnabled: any;
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  enabledNoDataMsg = false;
  dataSource = new MatTableDataSource();
  constructor(  private dialog: MatDialog, private myrequestservice: MyRequestService) { }
  displayedColumns: string[] = ['metro', 'grbNum', 'deptCode', 'deptName', 'band', 'newband', 'submittedDate', 'Status', 'auditlog'];
  
  ngOnInit() {
    if (this.isBandChangeEnabled === 'Enabled') {
      this.dataSource.data = this.bandChangeDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
  }
  
  openDialog(element) {


    const dialogRef = this.dialog.open(BandchangeAuditComponent, {
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



