import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logged-out-view',
  templateUrl: './logged-out-view.component.html',
  styleUrls: ['./logged-out-view.component.scss']
})
export class LoggedOutViewComponent implements OnInit {
  browserRefresh: any;

  constructor() { }

  ngOnInit() {
   
  }
  goBack(){
    window.location.href = environment.redirectUrl;
  }
}
