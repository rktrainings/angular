import { Directive, Input, ElementRef, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MySpanService } from '../services/my-span.service';
import { MySpan } from '../tsclasses/my-span.model';
import { UserDetailsService } from '../services/user-details.service';

@Directive({
  selector: '[appSearch]'
})
export class SearchDirective {

  @Input() ELEMENT_DATA = []
  @Input() fetchFromApi: boolean = false;
  @Input() selectedFilter: string;
  @Input() textlen: string;
  @Input() PARENT = "";
  requestObj = { empId: null, deptCode: null, supId: null };
  @Input() dataSource: MatTableDataSource<any>;
  @Output() updateData = new EventEmitter();
  @Output() updateDataFromAPI = new EventEmitter();
  @Output() showLoader = new EventEmitter();

  @Input() showSearchFilter: string;
  constructor(private el: ElementRef, private mySpanService: MySpanService, public userDetails: UserDetailsService) {

  }

  getDataBySearch = (requestObj) => {
    
      this.showLoader.emit(true)
      this.updateDataFromAPI.emit([])
      this.mySpanService.getBySearch('/myspanbizops', requestObj).subscribe((data: MySpan[]) => {
        //////////console.log(data)
        this.showLoader.emit(false)

        this.updateDataFromAPI.emit(data)
      })
  }

  // @HostListener('keydown')
  @HostListener('keyup') keypress() {
    if (this.fetchFromApi) {
      let json = {};
      json[this.selectedFilter] = (event.target as HTMLInputElement).value;
      //////////console.log(json[this.selectedFilter].length);
      //////////console.log(this.textlen)
      if (json[this.selectedFilter].length == this.textlen) {
        let role = this.userDetails.getHighestRole();
        this.requestObj['role'] = role
        this.requestObj['key'] = this.selectedFilter
        this.requestObj[this.selectedFilter] = (event.target as HTMLInputElement).value;
        if (this.selectedFilter == 'empId') {
          this.requestObj['deptCode'] = null;
          this.requestObj['supId'] = null;
        }
        else if (this.selectedFilter == 'deptCode') {
          this.requestObj['empId'] = null;
          this.requestObj['supId'] = null;
        }
        else if (this.selectedFilter == 'supId') {
          this.requestObj['empId'] = null;
          this.requestObj['deptCode'] = null;
        }
        this.getDataBySearch(this.requestObj);
      }
      else {
        this.updateData.emit(this.dataSource)

      }
    }
    else {
      //////////console.log(this.ELEMENT_DATA)
      const filterValue = (event.target as HTMLInputElement).value;
      if (filterValue.length > 0) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        this.updateData.emit(this.dataSource)
      } else {
        if (this.PARENT == 'MY_REPORTEES') {
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.updateData.emit(this.dataSource)

        } else {
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA.filter(e => e.isManager == 'Manager'));
          this.updateData.emit(this.dataSource)

        }
      }

    }

  }


}
