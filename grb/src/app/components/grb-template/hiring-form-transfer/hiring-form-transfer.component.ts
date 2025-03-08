import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeCheckComponent } from '../dialogs/employee-check/employee-check.component';

@Component({
  selector: 'app-hiring-form-transfer',
  templateUrl: './hiring-form-transfer.component.html',
  styleUrls: ['./hiring-form-transfer.component.scss']
})
export class HiringFormTransferComponent implements OnInit {

  username = ""
  @Input() ELEMENTS_DATA = [];
  dataSource: MatTableDataSource<any>;
  displayedHeaders: string[] = ['Employee Id', 'Employee Name', 'Band', 'Supervisor Id', 'Supervisor Name', 'TED']
  displayedColumns: string[] = ['empId', 'empName', 'band', 'supId', 'supName', 'lwd']
  AllColumns: string[] = ['empId', 'empName', 'band', 'supId', 'supName', 'lwd', 'submittedBy'];
  showCurrentUser: boolean = false;
  formName: any;
  hireType: any;
  showCheckBox = false;
  @Input() private childFormName = "";
  checkedCandidates: any;
  backFillData: any;
  unCheckedCandidates: any;
  templateData: any;
  orpData: any;
  numSelected: any;
  checkedBackfillQty: number;
  checkedBackfill: any;
  empStatus: boolean;
  disableCandidate: boolean;



  constructor(public userDetails: UserDetailsService, private location: Location,
    private activatedRoute: ActivatedRoute,
    private hiringForm: HiringFormService,
    private notification: NotificationService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    //////////console.log(this.ELEMENTS_DATA)
    this.username = this.userDetails.getUserName()

    if (localStorage.getItem('backFillData')) {
      let backFillData = JSON.parse(localStorage.getItem('backFillData'));
      if (backFillData)
        if (backFillData.length > 0) {
          this.username = backFillData[0].submittedBy;
        }
    }
    if (localStorage.getItem('orpData')) {
      this.orpData = JSON.parse(localStorage.getItem('orpData'));
    }

  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ELEMENTS_DATA);
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    ////console.log(path)
    if (path.includes('create-request')) {
      this.username = this.userDetails.getUserName();
      console.log(this.username);
    }
    if (path.includes('approval')) {
      this.displayedHeaders.push('SUBMITTED BY')
      this.displayedColumns.push('submittedBy');
      this.showCurrentUser = false;
    } else {
      this.showCurrentUser = true;
    }


    this.activatedRoute.queryParams.subscribe(params => {
      this.formName = params.formName;
      this.hireType = params.hireType;
      this.hiringForm.childFormName$.subscribe((data: any) => {
        this.childFormName = data;
      })
      // console.log('childFormName=>', this.childFormName)
      if (this.orpData.length > 1 && this.childFormName !== 'Preview') {
        if (this.formName == 'bizops' || this.formName == 'edit-metro' && this.hireType == 'internal') {
          this.AllColumns.splice(0, 0, 'select');
          console.log(this.AllColumns)
          this.showCheckBox = true
        }
      }
    });
    this.hiringForm.setCheckedOrpQty(0)
  }

  getClassTableHeader(e) {
    let arr = ['Employee Name', 'Department Name', 'IOT', 'Tower', 'Sub Process', 'Supervisor Name', 'Employee Type', 'TED'];
    // if (arr.includes(e)) {
    //   return 'left-align'
    // } else {
    return 'left-align'

    // }

  }
  getClass(e) {
    // if (e == 'empId' || e == 'band' || e == 'isManager' || e == 'supId') {
    //   return 'left-align'
    // } else {
    return 'left-align'
    // }
  }

  getHeaderWidth(e) {
    if (e == 'Band') {
      return '7vh';
    }
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(EmployeeCheckComponent, {
      disableClose: true,
      // width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  transferChecked(event, row) {
    this.getCheckedBackfillQty();
    this.unCheckedCandidates = row;
    this.orpData.map(e => {
      if (e.empId === row.empId) {
        e.checked = row.checked
      }
    })

    this.numSelected = this.orpData.filter(e => e.checked == true).length;
    this.checkedCandidates = this.orpData.filter(e => e.checked == true);
    localStorage.setItem('checkedORP', JSON.stringify(this.checkedCandidates))
    if (JSON.parse(localStorage.getItem('checkedBackfill'))) {
      this.checkedBackfill = JSON.parse(localStorage.getItem('checkedBackfill'));
    } else {
      this.checkedBackfill = JSON.parse(localStorage.getItem('backFillData'));
    }

    this.hiringForm.setTemplateData({ totalQty: this.numSelected })
    this.hiringForm.setTotalQty(this.numSelected)
    this.hiringForm.setCheckedOrpQty(this.checkedCandidates.length)

    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    if (this.templateData['hiringAs']) {
      if (this.templateData.hiringAs.toLowerCase().includes('backfill') ||
        this.templateData.hiringAs.toLowerCase().includes('new growth')
        && this.hireType == 'internal') {
        if (this.checkedCandidates.length <= 1) {
          this.disableCandidate = true;
          // this.notification.showSnackBar('Please uncheck one employee in backfill employees');
          this.hiringForm.setTemplateData({ totalQty: this.numSelected })
          this.hiringForm.setTotalQty(this.numSelected)
          this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)
          this.hiringForm.setEMPValid(true);
          this.empStatus = true;
          this.openConfirmationDialog()
        } else {
          this.disableCandidate = false;
          if (!this.unCheckedCandidates['checked']) {
            if (this.orpData.length && this.checkedBackfillQty !== this.checkedCandidates.length) {
              this.notification.showSnackBar('Please uncheck one employee in backfill employees');
            } else if (this.numSelected < 1) {
              this.notification.showSnackBar('Please select atleast one employee')
            }
          }

          if (this.checkedCandidates.length !== 0 && this.checkedBackfill.length !== 0) {
            if (this.checkedCandidates.length == this.checkedBackfill.length) {

              // if (this.checkedCandidates.length <= 1) {
              //   this.disableCandidate = true;
              //   this.openConfirmationDialog()
              //   this.hiringForm.setTemplateData({ totalQty: this.numSelected })
              //   this.hiringForm.setTotalQty(this.numSelected)
              //   this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)
              //   this.hiringForm.setEMPValid(true);
              //   this.empStatus = true;
              // } else {
              //   this.disableCandidate = false;
              // }
            } else {
              this.hiringForm.setEMPValid(false);
              this.empStatus = false;
            }
          } else {
            this.hiringForm.setEMPValid(false);
            this.empStatus = false;
          }

        }


      }

    } else {
      if (this.numSelected < 1) {
        this.notification.showSnackBar('Please select atleast one employee')
        this.hiringForm.setEMPValid(false);
        this.empStatus = false;
      } else {
        this.hiringForm.setEMPValid(true);
        this.empStatus = true;
      }

    }
    this.hiringForm.setOrpData(this.checkedCandidates);
    localStorage.setItem('empStatus', JSON.stringify(this.empStatus))
  }

  getCheckedBackfillQty() {
    this.hiringForm.checkedBackfillQty$.subscribe((data: number) => {
      this.checkedBackfillQty = data;
    })
  }


}
