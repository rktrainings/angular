import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  download = false;
  fileNames = [];
  constructor(private reports: ReportsService) {

  }
  ngOnInit() {
    this.reports.reports$.subscribe(data => {
      //////console.log(data)
      if (data.length > 0) {
        this.download = true
        this.fileNames = data;
        ////console.log(this.fileNames)
      } else {
        this.download = false
      }
    })
  }


}
