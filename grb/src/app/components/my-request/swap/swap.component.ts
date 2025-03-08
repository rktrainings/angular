import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { MyRequestService } from 'src/app/services/my-request.service';
import { AuditComponent } from '../audit-dialogs/hire-request-audit/audit.component';
import { SwapAuditComponent } from '../audit-dialogs/swap-audit/swap-audit.component';


@Component({
  selector: 'app-swap',
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss']
})
export class SwapComponent implements OnInit {
  enableLoadingMsg: boolean = false;
  iotAPICallEnabled: boolean = false;
  enabledNoDataMsg = false;
  dataSource = new MatTableDataSource();

  @Input() swapDataSource: any[];

  @Input() isSwapEnabled: any;
  constructor(
    private dialog: MatDialog, private myrequestservice: MyRequestService) { }

  ngOnInit() {
    if (this.isSwapEnabled === 'Enabled') {
      this.dataSource.data = this.swapDataSource;
    }
    if (this.dataSource.data.length === 0) {
      this.enabledNoDataMsg = true;
    }
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = ['metro', 'grbNum', 'deptCode', 'deptName', 'band', 'nominatedempId', 'empName', 'empDeptCode', 'empband', 'newmetro', 'submittedDate', 'Status', 'auditlog'];


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }


  openDialog(element) {
    //////console.log(element.grbNum);
    //////console.log(element.grbNumber);

    const dialogRef = this.dialog.open(SwapAuditComponent, {
      width: '1350px',
      // height: '74vh',
      // maxHeight:'74vh',
      data: {
        swapGRBNumber: element.grbNumber,
      },

      disableClose: true,


    });

    dialogRef.afterClosed().subscribe(result => {
      ////////console.log('The dialog was closed');

    });
  }

}
