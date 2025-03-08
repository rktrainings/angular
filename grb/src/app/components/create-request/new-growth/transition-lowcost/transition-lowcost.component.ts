import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { CCNPCRservice } from 'src/app/services/ccn-details.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HireRequestORPComponent } from '../../hire-request-orp/hire-request-orp.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-transition-lowcost',
  templateUrl: './transition-lowcost.component.html',
  styleUrls: ['./transition-lowcost.component.scss']
})
export class TransitionLowcostComponent implements OnInit {

  lowcost: boolean;
  bandlists: string[] = ['C', 'D', '10', '9', '8', '7', '6', '5', '4', '3'];
  deptCode: string;
  bandlist: string;
  registerForm: FormGroup;
  submitted = false;
  deptName: string;
  nextbutton: boolean;
  deptnamefield: boolean;
  roleBased: boolean;
  loggedInDepartments: string[];

  enableLoadingMsg: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;

  constructor(private router: Router,
    private userDetails: UserDetailsService,
    public dialogRef: MatDialogRef<TransitionLowcostComponent>,
    public dialog: MatDialog,
    private notification: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private ccnpcrservice: CCNPCRservice,
    private formBuilder: FormBuilder, private hiringForm: HiringFormService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
    this.hiringForm.nullifyTemplateData();
  }

  ngOnInit() {

    this.nextbutton = true;
    if (this.data == 'New Transition') {
      this.lowcost = false;
    }
    else if (this.data == 'Move to Low Cost') {
      this.lowcost = true;
    }
    this.registerForm = this.formBuilder.group({
      deptCode: ['', Validators.required],
      bandlist: ['', Validators.required],
      deptName: ['',],

    });
    this.registerForm.get('deptName').disable();
    this.roleBasedDept();
  }

  roleBasedDept() {

    if (this.userDetails.getRoles().includes('ADMIN') ||
      this.userDetails.getRoles().includes('GRBEO')) {

      this.roleBased = false;

    }
    else {
      this.roleBased = true;

      this.loggedInDepartments = this.userDetails.getDeptCodes();
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show()
    this.orpdialog(this.data);


  }
  populatedetails() {
    this.deptCode = this.deptCode.toUpperCase();
    if (this.deptCode.length == 3) {
      this.enableLoadingMsg = true;

      if (this.lowcost == true) {

        this.nextbutton = true;
        this.ccnpcrservice.getdeptDetails<[]>(this.deptCode).subscribe((data: any) => {
          ////console.log(data)
          this.data = [{
            deptCode: this.deptCode,
            band: this.bandlist,
            hiringAs: 'New Growth-Move to Low Cost',
            geo: data.geo,
            tower: data.tower
          }]

          this.deptName = data.deptName;
          this.enableLoadingMsg = false;
          //this.orpdialog(this.data);
          if (this.data.length !== null) {
            this.nextbutton = false;
          } else
            this.nextbutton = true;

          if (data.deptName == null) {
            this.notification.showSnackBar("Invalid Dept Code !! Please enter the correct Dept Code");
            this.nextbutton = true;
            ////console.log(this.nextbutton)
          }

        }, ((httpError: HttpErrorResponse) => {
          this.openErrorSnackBar();
        }));

      }
      else {
        this.enableLoadingMsg = true;
        this.nextbutton = true;
        ////console.log(this.nextbutton)
        this.ccnpcrservice.getdeptDetails<[]>(this.deptCode).subscribe((data: any) => {
          ////console.log(data)

          this.data = [{
            deptCode: this.deptCode,
            band: this.bandlist,
            hiringAs: 'New Growth-New Transition',
            geo: data.geo,
            tower: data.tower
          }]



          //this.orpdialog(this.data);
          this.deptName = data.deptName;
          this.enableLoadingMsg = false;
          if (this.data.length !== null) {
            this.nextbutton = false;

          } else
            this.nextbutton = true;

          if (data.deptName == null) {
            this.notification.showSnackBar("Invalid Dept Code !! Please enter the correct Dept Code");
            this.nextbutton = true;
            ////console.log(this.nextbutton)
          }




        }, ((httpError: HttpErrorResponse) => {
          this.openErrorSnackBar();
        }));
      }
    }
  }
  openErrorSnackBar() {
    this.notification.showSnackBar(CommonMessageProperties.SERVER_ERROR_MESSAGE);

    // this.snackBar.open(CommonMessageProperties.SERVER_ERROR_MESSAGE, 'Close', {
    //   duration: this.durationInSeconds * 1000,
    //   panelClass: ['mat-snackbar'],
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }
  orpdialog(datadetails) {
    this.spinner.hide()
    const dialogRef = this.dialog.open(HireRequestORPComponent, {
      width: '1350px',
      // height: '76vh',
      data: datadetails,
      disableClose: true,

    });

    this.dialogRef.close();
    // this.dialogRef.Close();.subscribe(result => {

    // });
  }

  close() {
    this.router.navigateByUrl('/main-menu');
    this.dialogRef.close();
  }
}
