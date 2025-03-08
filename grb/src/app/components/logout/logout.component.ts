import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeaderComponent } from '../header/header.component';
import { CommonService } from 'src/app/services/common-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,public authService: AuthService,
    public dialogRef: MatDialogRef<HeaderComponent>,private commonService:CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  logout() {
    this.dialogRef.close(true);
   
    
    this.commonService.getServiceRequest(environment.LOGOUT).subscribe(data=>{
      this.authService.clearSession();
      setTimeout(()=>{
        window.location.replace(environment.redirectUrl)
      },0)
    })
    // this.router.navigateByUrl('/logged-out')

  }

//    url_redirect1(options){
//     var $form = $("<form />");
    
//     $form.attr("action",'https://ddyamscpsma01.sl.bluecloud.ibm.com/GRB1/');
//     $form.attr("method","POST");
    
//     for (var data in options.data)
//     $form.append(options.url, window.location.href);
     
//     $("body").append($form);
//     ////console.log($form);
//     $form.submit();
// }
}
