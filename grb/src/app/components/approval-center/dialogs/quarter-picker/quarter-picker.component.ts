import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms'
import { takeWhile, debounceTime, startWith } from 'rxjs/operators'

@Component({
  selector: 'app-quarter-picker',
  templateUrl: './quarter-picker.component.html',
  styleUrls: ['./quarter-picker.component.scss']
})
export class QuarterPickerComponent implements OnInit, OnDestroy {

  alive: boolean = true;
  control: FormControl = new FormControl()
  year: number;
  yearDefault = new Date().getFullYear()
  quarterDefault = "Q" + (1 + Math.floor(new Date().getMonth() / 3))
  quarter: string;
  showQuarter: boolean = true;
  year10: number;
  @Output() quarterValue: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(NgControl, { read: ElementRef }) controlID: ElementRef
  options: any[] = [
    { value: 'Q1', months: ['Jan', 'Feb', 'Mar'], disabled: true },
    { value: 'Q2', months: ['Apr', 'May', 'Jun'], disabled: true },
    { value: 'Q3', months: ['Jul', 'Aug', 'Sep'], disabled: true },
    { value: 'Q4', months: ['Oct', 'Nov', 'Dec'], disabled: true }
  ];

  selectedQuarter: string;
  @Output() quarterEvent = new EventEmitter<string>();
  disablePreButton: boolean = true;

  constructor() { }

  ngOnInit() {

    const currentQuater = Math.ceil((new Date()).getMonth() + 1) / 3;
    ////console.log('currentQuater', currentQuater);

    this.options.map((data, index) => {
      if (index >= currentQuater - 1) {
        data.disabled = false;
      } else {
        data.disabled = true;
      }
    });


    this.control.valueChanges.pipe(
      takeWhile(() => this.alive),
      startWith(this.quarter + " " + this.year),
      debounceTime(200))
      .subscribe((res: string) => {
        //      ////console.log(this.controlID.nativeElement.selectionStart)
        if (res) {
          res = res.toUpperCase()
          if (res[0] != "Q")
            res = "Q" + res;
          let value = res.replace(/[^Q|0-9]/g, '');
          let quarter;
          let year;
          if (value.length >= 2)
            quarter = value[0] + value[1]
          if (value.length >= 6) {
            year = value.substr(2, 4)
            this.year = +year
            this.quarter = quarter;
            this.control.setValue((this.quarter + " " + this.year), { emitEvent: false })
          }
          else {
            this.year = null;
            this.quarter = null;
          }
        }
      })
  }

  changeOptionOnChangeYear(isCurrentYear, disableMonths) {
    if (isCurrentYear) {
      this.disablePreButton = true;
      const currentQuater = Math.ceil((new Date()).getMonth() + 1) / 3;
      this.options.map((data, index) => {
        if (index >= currentQuater - 1) {
          data.disabled = false;
        } else {
          data.disabled = true;
        }
      });
    } else {
      this.disablePreButton = false;
      this.options.map(data => data.disabled = disableMonths);
    }
  }


  changeYear(year) {
    const currentYear = (new Date()).getFullYear();
    ////console.log('currentYear', currentYear);
    
    if (currentYear !== year) {
      const disableMonths = currentYear > year;
      ////console.log('disableMonths', disableMonths);
      this.changeOptionOnChangeYear(false, disableMonths);
    } else {
      this.changeOptionOnChangeYear(true, false);
    }

    this.year = year || this.yearDefault;
    this.quarter = this.quarter || this.quarterDefault
    this.control.setValue(this.quarter + " " + this.year || this.yearDefault, { emitEvent: false })
  }
  changeShowQuarter() {
    this.showQuarter = !this.showQuarter
    if (!this.showQuarter)
      this.year10 = this.year ? 10 * Math.floor(this.year / 10) : 10 * Math.floor(this.yearDefault / 10)
  }
  click(quarter, drop) {
    this.quarter = quarter;
    this.year = this.year || this.yearDefault
    this.control.setValue(this.quarter + " " + this.year, { emitEvent: false })
    this.selectedQuarter = this.quarter + "-" + this.year;
    ////console.log('selectedQuarter', this.selectedQuarter)
    this.quarterEvent.emit(this.selectedQuarter)
    drop.close()
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
