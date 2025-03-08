import { Component, OnInit, Input, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MatTableDataSource, DateAdapter, MAT_DATE_FORMATS, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ActivatedRoute } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/adapter/date.adapter';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { resolveSoa } from 'dns';
import { CommonService } from 'src/app/services/common-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SelectionModel } from '@angular/cdk/collections';
import { element } from '@angular/core/src/render3';
import { EmployeeCheckComponent } from '../dialogs/employee-check/employee-check.component';

@Component({
  selector: 'app-hiring-form-backfill',
  templateUrl: './hiring-form-backfill.component.html',
  styleUrls: ['./hiring-form-backfill.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class HiringFormBackfillComponent implements OnInit {

  username = "";
  @Input() ELEMENTS_DATA = [];
  dataSource: MatTableDataSource<any>;
  displayedHeaders: string[] = ['Employee Id', 'Employee Name', 'Band', 'Supervisor Id', 'Supervisor Name', 'LWD']
  displayedColumns: string[] = ['empId', 'empName', 'band', 'supId', 'supName', 'lwd']
  AllColumns: string[] = ['empId', 'empName', 'band', 'supId', 'supName', 'submittedBy', 'lwd'];
  backFillData: any;
  templateData: any;
  formName: any;
  minDate: Date;
  maxDate: Date;
  ced: any;
  count = 0;
  empvalid: boolean = false;
  displayHeader: boolean = false;
  subkHeader: boolean = false;
  cedCheck: boolean = false;
  // extCheck: boolean = false;
  // formNamefield: boolean = false;
  disableField: boolean;
  @Input() private childFormName = "";
  extensionPeriod: any;
  // @Output() backfillValidityEvent = new EventEmitter<boolean>();

  conversionExt: boolean = false;
  extensionperiodlists: string[] = ['3', '6', '9', '12'];
  showCurrentUser: boolean = false;

  selection = new SelectionModel<any>(true, []);
  showCheckBox = false;
  hireType: any;
  checkedCandidates: any;
  unCheckedCandidates: any;
  checkedOrpQty: number;
  checkedORP: any;
  empStatus: boolean;
  disableCandidate: boolean;

  constructor(public userDetails: UserDetailsService, private location: Location, private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private hiringForm: HiringFormService,
    public datepipe: DatePipe, private notification: NotificationService,
    public dialogRef: MatDialogRef<HiringFormBackfillComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    if (localStorage.getItem('backFillData')) {
      let backFillData = JSON.parse(localStorage.getItem('backFillData'));
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'));

      if (backFillData)
        if (backFillData.length > 0) {
          this.username = backFillData[0].submittedBy;
        }
    }


  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.formName = params.formName;
      this.hireType = params.hireType;

      this.backFillData = JSON.parse(localStorage.getItem('backFillData'));
      this.hiringForm.setChildFormName(this.childFormName)

      if (this.backFillData.length > 1 && this.childFormName !== 'Preview') {
        if (this.formName == 'board' || this.formName == 'bizops' || this.formName == 'edit-metro'
          && this.hireType == 'external') {
          this.AllColumns.splice(0, 0, 'select');
          console.log(this.AllColumns)
          this.showCheckBox = true
          console.log('2', this.showCheckBox);
        } else if (this.formName == 'bizops' || this.formName == 'edit-metro'
          && this.hireType == 'internal') {
          this.AllColumns.splice(0, 0, 'select');
          console.log(this.AllColumns)
          this.showCheckBox = true
          console.log('3', this.showCheckBox);
        }
        this.hiringForm.setCheckedBackfillQty(0)

      }
    });

    this.dataSource = new MatTableDataSource(this.ELEMENTS_DATA);
    //console.log(window.location.pathname);
    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    if (path.includes('create-request')) {
      this.username = this.userDetails.getUserName();
      console.log(this.username);
    }
    //console.log(path)
    if (path.includes('approval')) {
      this.displayedHeaders.push('SUBMITTED BY')
      this.displayedColumns.push('submittedBy');
      this.showCurrentUser = false;
    } else {
      this.showCurrentUser = true;
    }

    this.backFillDisplayHeader();
    this.defaultDatePicker();
    // this.checkBackfill();
  }

  checkBackfill() {
    this.backFillData.map(e => {
      e.checked = true
    })
  }
  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   // 36458736
  //   this.templateData = JSON.parse(localStorage.getItem('templateData'));
  //   let totalQty = 1;
  //   if (this.templateData.totalQty) {
  //     totalQty = parseInt(this.templateData.totalQty)
  //   }
  //   return numSelected === totalQty;
  // }

  // disabledBackfill(row) {
  //   const numSelected = this.backFillData.filter(e => e.checked == true).length;
  //   // 36458736
  //   this.templateData = JSON.parse(localStorage.getItem('templateData'));
  //   let totalQty = 1;
  //   if (this.templateData.totalQty) {
  //     totalQty = parseInt(this.templateData.totalQty)
  //   }

  //   if (numSelected === totalQty)
  //     return row.checked ? false : true
  //   else
  //     return false;
  // }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(EmployeeCheckComponent, {
      disableClose: true,
      // width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  internalRequest(numSelected) {
    if (this.templateData['hiringAs']) {
      if (this.templateData.hiringAs.toLowerCase().includes('backfill') && this.hireType == 'internal') {

        if (this.checkedCandidates.length <= 1) {
          this.disableCandidate = true;
          // this.notification.showSnackBar('Please uncheck one employee in transfer employees');
          this.hiringForm.setTemplateData({ totalQty: numSelected })
          this.hiringForm.setTotalQty(numSelected)
          this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)
          this.hiringForm.setEMPValid(true);
          this.empStatus = true;
          this.openConfirmationDialog()
        } else {
          this.disableCandidate = false;
          if (!this.unCheckedCandidates['checked']) {
            if (this.backFillData.length && this.checkedOrpQty !== this.checkedCandidates.length) {
              this.notification.showSnackBar('Please uncheck one employee in transfer employees');

            } else if (numSelected < 1) {
              this.notification.showSnackBar('Please select atleast one employee')
            }
          }

          if (this.checkedCandidates.length !== 0 && this.checkedORP.length !== 0) {
            if (this.checkedCandidates.length == this.checkedORP.length) {

              // if (this.checkedCandidates.length <= 1) {
              //   this.disableCandidate = true;
              //   this.openConfirmationDialog()
              //   this.hiringForm.setTemplateData({ totalQty: numSelected })
              //   this.hiringForm.setTotalQty(numSelected)
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

          localStorage.setItem('empStatus', JSON.stringify(this.empStatus))

        }


      }
    }
  }

  externalRequest(numSelected) {

    if (this.checkedCandidates.length <= 1) {
      this.disableCandidate = true;
      this.hiringForm.setTemplateData({ totalQty: numSelected })
      this.hiringForm.setTotalQty(numSelected)
      this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)
      //this.hiringForm.setEMPValid(false);
      // this.empStatus = false;
      this.openConfirmationDialog()
    } else {
      this.disableCandidate = false;
      if (this.templateData['hiringAs']) {
        if (this.templateData.hiringAs.toLowerCase().includes('conversion') || this.templateData.hiringAs.toLowerCase().includes('subk') && this.hireType == 'external') {
          this.minEmployeeCheck(numSelected);
        } else if (this.templateData.hiringAs.toLowerCase().includes('backfill') && this.hireType == 'external') {
          this.minEmployeeCheck(numSelected);
        }
      }

    }

  }

  backfillChecked(event, row) {

    this.getCheckedOrpQty();
    this.unCheckedCandidates = row;
    this.backFillData.map(e => {
      if (e.empId === row.empId) {
        e.checked = row.checked
      }
    })
    const numSelected = this.backFillData.filter(e => e.checked == true).length;
    this.checkedCandidates = this.backFillData.filter(e => e.checked == true);

    // if (this.checkedCandidates.length <= 1) {
    //   this.disableCandidate = true;
    //   this.openConfirmationDialog()
    //   this.hiringForm.setTemplateData({ totalQty: numSelected })
    //   this.hiringForm.setTotalQty(numSelected)
    //   this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)
    // } else {
    //   this.disableCandidate = false;
    localStorage.setItem('checkedBackfill', JSON.stringify(this.checkedCandidates))
    if (JSON.parse(localStorage.getItem('checkedORP'))) {
      this.checkedORP = JSON.parse(localStorage.getItem('checkedORP'));
    } else {
      this.checkedORP = JSON.parse(localStorage.getItem('orpData'));
    }

    this.hiringForm.setTemplateData({ totalQty: numSelected })
    this.hiringForm.setTotalQty(numSelected)
    this.hiringForm.setCheckedBackfillQty(this.checkedCandidates.length)




    if (this.hireType == 'internal') {
      this.internalRequest(numSelected);
    } else if (this.hireType == 'external') {
      this.externalRequest(numSelected)
    } else {
      if (numSelected < 1) {
        this.notification.showSnackBar('Please select atleast one employee')
        this.hiringForm.setEMPValid(false);
      } else {
        this.hiringForm.setEMPValid(true);
      }
    }




    // if (this.templateData['hiringAs']) {
    //   if (this.templateData.hiringAs.toLowerCase().includes('backfill') && this.hireType == 'internal') {
    //     if (!this.unCheckedCandidates['checked']) {
    //       if (this.backFillData.length && this.checkedOrpQty !== this.checkedCandidates.length) {
    //         this.notification.showSnackBar('Please uncheck one employee in transfer employees');
    //       } else if (numSelected < 1) {
    //         this.notification.showSnackBar('Please select atleast one employee')
    //       }
    //     }

    //     if (this.checkedCandidates.length !== 0 && this.checkedORP.length !== 0) {
    //       if (this.checkedCandidates.length == this.checkedORP.length) {
    //         this.hiringForm.setEMPValid(true);
    //         this.empStatus = true;
    //       } else {
    //         this.hiringForm.setEMPValid(false);
    //         this.empStatus = false;
    //       }
    //     } else {
    //       this.hiringForm.setEMPValid(false);
    //       this.empStatus = false;
    //     }
    //   }
    // } else {
    //   if (numSelected < 1) {
    //     this.notification.showSnackBar('Please select atleast one employee')
    //     this.hiringForm.setEMPValid(false);
    //   } else {
    //     this.hiringForm.setEMPValid(true);
    //   }
    // }

    // if (this.templateData['hiringAs']) {
    //   if (this.templateData.hiringAs.toLowerCase().includes('conversion') || this.templateData.hiringAs.toLowerCase().includes('subk') && this.hireType == 'external') {
    //     this.minEmployeeCheck(numSelected);
    //   } else if (this.templateData.hiringAs.toLowerCase().includes('backfill') && this.hireType == 'external') {
    //     this.minEmployeeCheck(numSelected);
    //   }
    // }

    this.hiringForm.setBackFillData(this.checkedCandidates);
    // localStorage.setItem('empStatus', JSON.stringify(this.empStatus))
    // }

  }

  minEmployeeCheck(numSelected: any) {
    if (numSelected < 1) {
      this.notification.showSnackBar('Please select atleast one employee')
      this.hiringForm.setEMPValid(false);
      this.empStatus = false;
    } else {
      this.hiringForm.setEMPValid(true);
      this.empStatus = true;
    }
  }

  getCheckedOrpQty() {
    this.hiringForm.checkedOrpQty$.subscribe((data: number) => {
      this.checkedOrpQty = data;
    })
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: any): string {
  //   console.log(row)
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empId}`;
  // }

  defaultDatePicker() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    // let prevMonth = (month === 0) ? 11 : month;
    // let nextMonth = (month === 11) ? 0 : month + 4;
    this.minDate = new Date();
    // this.maxDate = new Date();
    // this.minDate.setMonth(prevMonth);
    // this.maxDate.setMonth(nextMonth);
  }

  getClassTableHeader(e) {
    // let arr= ['Employee Name', 'Department Name',  'IOT', 'Tower', 'Sub Process', 'Supervisor Name', 'Employee Type','LWD'];
    // if(arr.includes(e)){
    //   return 'left-align'
    // }else{
    return 'left-align'

    // }

  }
  getClass(e) {
    // if(e=='empId'|| e=='band'|| e=='isManager'||e=='supId'){
    //   return 'left-align'
    // }else {
    return 'left-align'
    // }
  }

  getHeaderWidth(e) {
    if (e == 'Band') {
      return '7vh';
    }
  }


  backFillDisplayHeader() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))

    }
    else {
      this.backFillData = this.hiringForm.getBackFillData();

    }
    //this.backFillData = JSON.parse(localStorage.getItem('backFillData'));

    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    console.log(this.backFillData);

    if (this.backFillData)
      this.backFillData.map((res => {
        console.log(res);

        if (!res.hiringAs) {
          if (this.templateData) {
            if (this.templateData['hiringAs']) {
              res.hiringAs = this.templateData['hiringAs'];
            }
          }
        }
        if (res)
          if (!res.hiringAs)
            res.hiringAs = ""

        //console.log(res);
        let path = this.location['_platformStrategy']._platformLocation.location.href;
        if (!path.includes('create-request')) {
          if (this.templateData) {
            if (this.templateData['hiringAs']) {
              if ((this.formName == 'bizops' || this.formName == 'iot' || this.formName === 'board' || this.formName == 'tolls'
                || this.formName === 'edit-metro' || this.formName === 'grbArchive') && !this.templateData.hiringAs.toLowerCase().includes('subk')) {

                if (this.templateData.hiringAs.toLowerCase().includes('conversion')) {
                  this.cedCheck = true;
                  this.displayHeader = true;
                  if (this.templateData.hiringAs.toLowerCase() == 'conversion-non regular extension') {
                    if (this.conversionExt == false)
                      this.AllColumns.push('newContractEndDate', 'extensionperiod');
                    this.cedCheck = true;
                    this.conversionExt = true;

                  }

                  let headerIndex = this.displayedHeaders.indexOf('LWD');
                  this.displayedHeaders[headerIndex] = 'CED';
                  this.empvalid = true;
                  this.hiringForm.setEMPValid(this.empvalid)
                }
                else if (this.templateData) {
                  if (this.templateData.hiringAs) {
                    if (this.templateData.hiringAs.toLowerCase().includes('subk')) {
                      let headerIndex = this.displayedHeaders.indexOf('LWD');
                      this.displayedHeaders[headerIndex] = 'CED';
                      this.displayHeader = true;
                      this.subkHeader = true;
                      this.empvalid = true;
                      this.hiringForm.setEMPValid(this.empvalid)
                      if (!(this.formName == 'bizops'))
                        this.cedCheck = true;
                    } else {
                      this.empvalid = true;
                      this.hiringForm.setEMPValid(this.empvalid)
                    }
                  }
                } else {
                  this.empvalid = true;
                  this.hiringForm.setEMPValid(this.empvalid)
                }
              } else if (this.templateData) {
                if (this.templateData.hiringAs) {
                  if (this.templateData.hiringAs.toLowerCase().includes('subk')) {
                    let headerIndex = this.displayedHeaders.indexOf('LWD');
                    this.displayedHeaders[headerIndex] = 'CED';
                    this.displayHeader = true;
                    this.subkHeader = true;
                    this.empvalid = true;
                    this.hiringForm.setEMPValid(this.empvalid)
                    if (!(this.formName == 'bizops'))
                      this.cedCheck = true;
                  } else {
                    this.empvalid = true;
                    this.hiringForm.setEMPValid(this.empvalid)
                  }
                }
              }
            }
          }
        } else {
          if (res) {
            if (res.hiringAs ? true : this.formName)
              if (res.hiringAs.toLowerCase() === 'swap' || this.formName === 'swap') {
                let headerIndex = this.displayedHeaders.indexOf('LWD');
                //console.log(this.displayedHeaders);
                //console.log(headerIndex);
                this.hiringForm.setEMPValid(true)

                this.displayedHeaders[headerIndex] = 'TED';

                let columnIndex = this.displayedColumns.indexOf('lwd');
                this.displayedColumns[columnIndex] = 'ted';

                let allIndex = this.AllColumns.indexOf('lwd');
                this.AllColumns[allIndex] = 'ted';

              }
              else if (res.hiringAs.toLowerCase() === 'subk-nonregular' || res.hiringAs.toLowerCase() === 'subk-extension' || res.hiringAs.toLowerCase() === 'subk-regular') {
                let headerIndex = this.displayedHeaders.indexOf('LWD');
                this.displayedHeaders[headerIndex] = 'CED';
                this.displayHeader = true;
                this.subkHeader = true;
                this.hiringForm.setEMPValid(true)

                if (res.hiringAs.toLowerCase() === 'subk-extension') {
                  this.hiringForm.setEMPValid(false)
                  if (res.lwd)
                    if (res.lwd.length > 0) {
                      this.hiringForm.setEMPValid(true)
                    }
                  this.cedCheck = false;
                } else {
                  this.cedCheck = true;

                }

                // let columnIndex = this.displayedColumns.indexOf('lwd');
                // this.displayedColumns[columnIndex] = 'ced';

                // let allIndex = this.AllColumns.indexOf('lwd');
                // this.AllColumns[allIndex] = 'ced';

              }
              else if (res.hiringAs.toLowerCase().includes('conversion')) {
                // this.empvalid = true;
                this.hiringForm.setEMPValid(true)

                this.verifyValid();
                this.displayHeader = true;
                this.cedCheck = true;
                if (res.hiringAs.toLowerCase() == 'conversion-non regular extension') {
                  this.hiringForm.setEMPValid(false)
                  if (res.newContractEndDate)
                    if (res.newContractEndDate.length > 0) {
                      this.hiringForm.setEMPValid(true)
                    }
                  this.empvalid = false;
                  this.displayHeader = true;
                  this.subkHeader = false;

                  if (this.conversionExt == false)
                    this.AllColumns.push('newContractEndDate', 'extensionperiod');
                  this.conversionExt = true;
                }

                let headerIndex = this.displayedHeaders.indexOf('LWD');
                this.displayedHeaders[headerIndex] = 'ced';

              } else {
                this.empvalid = true;
                this.hiringForm.setEMPValid(this.empvalid)
              }
          }
        }
      }));

  }

  verifyValid() {
    for (let i = 0; i < this.backFillData.length; i++) {
      if (this.backFillData[i].extensionPeriod) {
        if (this.backFillData[i].extensionPeriod == '') {
          this.empvalid = false;
          break;
        }
        else {
          this.empvalid = true;
        }
      }
      else {
        this.empvalid = true;
      }
    }

    this.hiringForm.setEMPValid(this.empvalid)
    this.hiringForm.setBackFillData(this.backFillData);
    //console.log('backfill-1', this.backFillData);

    localStorage.setItem('backFillData', JSON.stringify(this.backFillData));
  }



  handleCEDChange(event: any, element: any) {

    function monthDiff(d1, d2) {

      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    }
    //console.log(this.backFillData);
    let dateVal = this.commonService.rectifyTimeStamp(new Date(event.target.value)).toString()
    if (this.backFillData) {
      this.backFillData.forEach((res => {
        let hiringAs = res.hiringAs ? res.hiringAs : this.templateData.hiringAs;
        if (hiringAs.toLowerCase() == 'conversion-non regular extension') {
          const formatedDate = new Date(dateVal);

          const cedDate = this.datepipe.transform(formatedDate, 'yyyy-MM-dd');
          const dojDate = new Date(res.doj);

          var Difference_In_Month = monthDiff(dojDate, formatedDate);
          if (Difference_In_Month > 39) {
            this.notification.showSnackBar("Employee's total tenure is 39(36+3)months in the organisation and is not eligible for extension");
            this.backFillData.map((r => {
              if (r.empId === element.empId) {
                r['newContractEndDate'] = "";
                r['extensionPeriod'] = "";
                element.extensionPeriod = "";
                element.newContractEndDate = "";
              }
            }))
          } else {
            this.backFillData.map((res => {
              if (res.empId === element.empId) {
                res['newContractEndDate'] = cedDate;
                // res['lwd'] = cedDate;
                res['extensionPeriod'] = Difference_In_Month;
                element.newContractEndDate = cedDate;
                element.extensionPeriod = Difference_In_Month;
              }

            }))

          }
          this.verifyValid();

        } else {
          const formatedDate = new Date(dateVal);
          // //console.log("check", formatedDate)
          const cedDate = this.datepipe.transform(formatedDate, 'yyyy-MM-dd');
          this.backFillData.filter((res => {
            if (res.empId === element.empId) {
              res['lwd'] = cedDate.toString();
              element.lwd = cedDate.toString();

              // this.backfillValidityEvent.emit(true);
            }
          }))

          for (let i = 0; i < this.backFillData.length; i++) {
            if (this.backFillData[i].lwd == '') {
              this.empvalid = false;
              break;
            }
            else {
              this.empvalid = true;
            }
          }
          //console.log('backfill-2', this.backFillData);
          this.hiringForm.setEMPValid(this.empvalid)
          this.hiringForm.setBackFillData(this.backFillData);


          localStorage.setItem('backFillData', JSON.stringify(this.backFillData));
        }

      }))
    }
    // else {
    //   // //console.log(element, event);
    //   const formatedDate = new Date(dateVal);
    //   // //console.log("check", formatedDate)
    //   const cedDate = this.datepipe.transform(formatedDate, 'yyyy-MM-dd');
    //   this.backFillData.filter((res => {
    //     if (res.empId === element.empId) {
    //       res['lwd'] = cedDate;
    //       // this.backfillValidityEvent.emit(true);
    //     }
    //   }))

    //   for (let i = 0; i < this.backFillData.length; i++) {
    //     if (this.backFillData[i].lwd == '') {
    //       this.empvalid = false;
    //       break;
    //     }
    //     else {
    //       this.empvalid = true;
    //     }
    //   }
    //   //console.log('backfill-2', this.backFillData);
    //   this.hiringForm.setEMPValid(this.empvalid)
    //   this.hiringForm.setBackFillData(this.backFillData);


    //   localStorage.setItem('backFillData', JSON.stringify(this.backFillData));

    // }
  }
}