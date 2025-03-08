import { Component, OnInit, Inject } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { HeaderComponent } from '../header/header.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  empName = "";
  empId = '';
  roles = [];
  highestRole = ""
  photoURL: string;
  constructor(private userDetails: UserDetailsService, public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cookieService:CookieService) {
    this.empId = this.cookieService.get('loggedInUser');
    this.photoURL = 'https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/' + this.empId + '744';

    this.empName = this.cookieService.get('uname');
    this.roles = JSON.parse(this.cookieService.get('roles')).map(e=>e.replace('_','-'));
    this.highestRole=this.userDetails.getHighestRole().replace('_','-');
  }

  ngOnInit() {
  }

  update(event) {
    this.photoURL = "./assets/icons/userIcon.jpg";
  }
}
