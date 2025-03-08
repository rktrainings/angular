import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';
import { ErrorService } from './error.service';
import { ExcelService } from './excel.service';

@Injectable({
  providedIn: 'root'
})
export class UserManualService {
  hostName: string;
  
  constructor(private excel:ExcelService,private http: HttpClient, private cookieService: CookieService, private errorService: ErrorService, private authService: AuthService) {
    this.hostName = environment.clientUrl;
  }
  download(fileName) {
   fetch(this.hostName + "/assets/data/user-manual/"+fileName).then(response => {
    response.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName
      a.click();
    });
  });
  }

}
