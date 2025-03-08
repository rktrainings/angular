import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ConvertToInternalComponent } from '../convert-to-internal/convert-to-internal.component';
import { HireORPService } from 'src/app/services/hire-request-ORP';
import { HireRequest } from 'src/app/models/hirerequest';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-orp-list',
  templateUrl: './orp-list.component.html',
  styleUrls: ['./orp-list.component.scss']
})
export class OrpListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  enabledNoDataMsg: boolean;
  enableLoadingMsg: boolean;
  displayedColumns: string[] = ['select', 'empId', 'employeeName', 'band', 'DeptCode', 'deptName', 'supMailId', 'supName', 'SubProcess'];
  amt: any = 0;
  disabled: boolean;
  hireradio: any;
  jobForm: boolean;
  maxNo: boolean;
  numSelected: boolean;
  hireORParray: any = [];

  oldFields = {};
  newFields = {};
  maxSelection: any;
  disableSelect: boolean;
  constructor(private commonService: CommonService,
    public dialogRef: MatDialogRef<OrpListComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private hireORPService: HireORPService, private spinner: NgxSpinnerService, private notification: NotificationService) {


    this.oldFields = data['oldFields']
    this.newFields = data['newFields']
    this.maxSelection = data['newFields'].totalQty ? data['newFields'].totalQty : data['oldFields'].totalQty

  }

  ngOnInit() {
    this.fetchORPBackfillDetails(this.newFields['band'],this.newFields['deptCode'])

  }
  fetchORPBackfillDetails(band: any,deptCode:any) {
    this.enabledNoDataMsg = false;
    this.enableLoadingMsg = false;
    ////console.log(this.newFields)
    this.hireORPService.getORPNewGrowthTableDetails<HireRequest[]>(band,deptCode).subscribe((data: HireRequest[]) => {
      this.dataSource.data = data;

      ////console.log(data)
      // if (this.dataSource.data !== null) {
        this.enableLoadingMsg = true;
      // }

      if (this.dataSource.data.length === 0) {
        this.enabledNoDataMsg = true;
      }

    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateCheckedList(event, index, data) {

    if (event.checked == true) {
      this.amt++
      this.hireORParray.push(data);
    }
    else if (event.checked == false) {
      this.amt--;
      var hindex = this.hireORParray.indexOf(data)
      this.hireORParray.splice(hindex, 1);
    }


    if (this.amt == this.maxSelection) {
      this.disableSelect = true
    } else {
      this.disableSelect = false
    }

    //////console.log(this.disableSelect)
  }

  onSubmit() {
    this.hireORParray.map(e => {
      e['empName'] = e['employeeName'];
      e['map'] = "ORP"
    })
    let data = {
      oldMetro: this.oldFields['metro'],
      oldBand: this.oldFields['band'],
      oldQty: this.oldFields['totalQty'],
      newMetro: this.newFields['metro'],
      newBand: this.newFields['band'],
      transferEmployees: this.hireORParray
    }

    if (this.newFields['totalQty']) {
      data['newQty'] = this.newFields['totalQty']
    } else {
      data['newQty'] = 1;

    }
    //////console.log(data)
    this.spinner.show();

    this.hireORPService.convertToInternal(data).subscribe(data => {
      this.spinner.hide();
      this.dialogRef.close();
      this.notification.showSnackBar('Metro converted Successfully!!')
      setTimeout(() => {
        this.router.navigateByUrl('/main-menu');
      }, 0);
    })
  }

  disableSubmit() {
    if (this.hireORParray.length == this.maxSelection) {
      return false;
    }
    return true;
  }
}
