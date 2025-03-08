import { Component, OnInit, Optional, Inject } from '@angular/core';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrpListComponent } from '../orp-list/orp-list.component';

@Component({
  selector: 'app-convert-to-internal',
  templateUrl: './convert-to-internal.component.html',
  styleUrls: ['./convert-to-internal.component.scss']
})
export class ConvertToInternalComponent implements OnInit {

  oldFields: any = {
    metro: '',
    band: '',
    totalQty: 0,
  }
  newFields: any = {
    metro: '',
    band: ''
  }
  metroValid: boolean = false;
  filterBands = [];
  bands = ["C", "D", "10", "9", "8", "7", "6", "5", "4", "3",];
  bandIndex: number;
  bandType: string = 'dropdown';
  maxtotalQty: any;
  showSpinner: boolean = false;
  disableMetro = false;
  deptCode: any;
  constructor(private commonService: CommonService,
    public dialogRef: MatDialogRef<ConvertToInternalComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.oldFields.metro = data.metroNumber;
    this.oldFields.band = data.band;
    this.oldFields.totalQty = data.totalQunatity;
    this.oldFields.hiringAs = data.hiringReason;
    this.maxtotalQty = data.totalQunatity;
    if (this.oldFields.totalQty == 1) {
      this.newFields.metro = this.oldFields.metro;
      this.newFields.deptCode = data.deptCode;
      this.disableMetro=true;
      this.metroValid = true;
    }
  }

  ngOnInit() {
    this.updateBand()
  }

  check() {
    ////console.log(this.newFields.totalQty);
    if (this.newFields.totalQty > this.maxtotalQty) {
      this.newFields.totalQty = this.maxtotalQty;
    }
    if (this.newFields.totalQty < 1) {
      this.newFields.totalQty = 1;
    }

  
    // if (this.newFields.totalQty == this.maxtotalQty) {
    //   this.newFields.metro = this.oldFields.metro;
    //   this.disableMetro = true
    //   this.metroValid = true;
    // } else {
    this.verifyMetro();
    // }

  }
  verifyMetro() {

    if (this.newFields.totalQty !== this.maxtotalQty) {
      if (this.newFields.metro) {

        let metro = this.newFields.metro.toString();
        this.disableMetro = false;
        if (metro.length == 8) {
          this.showSpinner = true;
          this.commonService.getServiceRequest(environment.VERIFY_METRO + metro).subscribe((data: any) => {
            this.showSpinner = false;
            if (data.value == 'NO') {
              this.metroValid = true;
            }
            else {
              this.metroValid = false;
            }
          })
        }
        else {
          this.showSpinner = false;
          this.metroValid = false;
        }
      }
    } else {
      this.newFields.metro = this.oldFields.metro
      this.metroValid = true;
      this.disableMetro = true;
      this.showSpinner = false;
    }

  }
  // debouncing
  debounce = function (fn, d) {

    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, d)
    }
  }

  keyUpMetro = this.debounce(this.verifyMetro, 300);


  updateBand() {
    let index = -1;
    let backFillband = "";
    if (this.oldFields.band)
      backFillband = this.oldFields.band.split('.')[0];
    this.filterBands = this.bands.filter((band, i) => {
      if (band == backFillband) {
        index = i;
        this.bandIndex = i;
      }
      return (i >= index && index != -1)
    })


  }

  bandChange() {
    let currentBand = this.oldFields.band, index = -1;
    this.bands.forEach((band, i) => {
      if (band == currentBand) {
        index = i
      }
    })
  }

  onSubmit() {
    const dialogRef = this.dialog.open(OrpListComponent, {
      disableClose: true,
      width: '1350px',
      // height: '600px',
      data: {
        oldFields: this.oldFields,
        newFields: this.newFields
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  isDisabled() {
    //////console.log(this.metroValid);
    //////console.log(this.newFields.band)
    if (this.metroValid && this.newFields.band.length > 0 && !this.showSpinner) {
      if (this.oldFields.totalQty > 1) {
        if (this.newFields.totalQty > 0) {
          return false
        } else {
          return true;
        }
      }
      return false;
    }
    return true;
  }
}
