import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  goBack(){
    window.location.href = environment.redirectUrl
  }
}
