import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SubkService } from 'src/app/services/subk.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { CommonMessageProperties } from 'src/assets/data/common/common-message-properties';

@Component({
  selector: 'app-new-hire',
  templateUrl: './new-hire.component.html',
  styleUrls: ['./new-hire.component.scss']
})
export class NewHireComponent implements OnInit {

  bandlists: string[] = ['C', 'D', '10', '9', '8', '7', '6', '5', '4', '3'];
  deptCode: string;
  bandlist: string;
  registerForm: FormGroup;
  submitted = false;
  deptName: string;
  nextbutton: boolean;
  deptnamefield: boolean;
  checkObj: any;
  deptCodes: any =[];
  enableLoadingMsg: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds: number = 7;
  roles: boolean = false;
  constructor(private router: Router,
    public dialogRef: MatDialogRef<NewHireComponent>,
    public dialog: MatDialog,
    private notification: NotificationService,
    public userDetails : UserDetailsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private subkService: SubkService,
    private formBuilder: FormBuilder, private hiringForm: HiringFormService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
    this.hiringForm.nullifyTemplateData();
  }

  ngOnInit() {
    this.hiringForm.nullifyTemplateData()

    this.nextbutton = true;
    if(this.userDetails.getHighestRole()=='ADMIN' || this.userDetails.getHighestRole()=='GRBEO'){
      this.roles=true;
    }
    else{
      this.roles=false;
     }
    this.deptCodes = this.userDetails.getDeptCodes();
    this.registerForm = this.formBuilder.group({
      deptCode: ['', Validators.required],
      bandlist: ['', Validators.required],
      deptName: ['',],

    });
    this.registerForm.get('deptName').disable();
  }

  onSubmit() {
  //  ////console.log('came')
    this.submitted = true;
    this.spinner.show()
    this.hiringForm.setHiringAs('Subk-NewHire');
    this.hiringForm.setBackFillData(this.checkObj);
    localStorage.setItem('backFillData', JSON.stringify(this.checkObj));

    this.hiringForm.setOrpData([]);

    this.router.navigateByUrl('/create-request/hiresubmit?hireType=external&requestType=subk');
    this.dialogRef.close();

  }
  populatedetails() {
    this.deptCode = this.deptCode.toUpperCase();
    if (this.deptCode.length == 3) {
      this.enableLoadingMsg = true;

      

        this.nextbutton = true;
        this.subkService.getdeptDetails<[]>(this.deptCode).subscribe((data: any) => {
          this.enableLoadingMsg = false;
         if(data)
         {
          this.checkObj = [{
            deptCode: this.deptCode,
            deptName: data.deptName,
            band: this.bandlist,
            hiringAs: 'Subk-NewHire',
            geo: data.geo,
            tower: data.tower
          }]

          this.deptName = data.deptName;
         this.nextbutton = false;
        }
          if(data == null)
          {
            this.notification.showSnackBar("Please enter valid Department Code");
            this.nextbutton = true;
          }
          //this.orpdialog(this.data);
         

        }, ((httpError: HttpErrorResponse) => {
          this.openErrorSnackBar();
        }));

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
  

  close() {
    this.router.navigateByUrl('/main-menu');
    this.dialogRef.close();
  }

}
