import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (!this.cookieService.get('url')) {
      let url = window.location.href.split('?')[0];
      //////console.log(url)
      this.cookieService.put('url', url);
    }
  }

}
