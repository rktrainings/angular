import { IfStmt } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CostCaseService } from 'src/app/services/cost-case.service';
import { Location } from '@angular/common';
import { elementStyleProp } from '@angular/core/src/render3';
import { parse } from 'querystring';

@Component({
  selector: 'app-cost-case-template',
  templateUrl: './cost-case-template.component.html',
  styleUrls: ['./cost-case-template.component.scss']
})
export class CostCaseTemplateComponent implements OnInit {
  displayedHeaders: string[] = ['COST CASE TYPE', 'BAND 3', 'BAND 4', 'BAND 5', 'BAND 6', 'BAND 7', 'BAND 8', 'BAND 9', 'BAND 10', 'Total']
  displayedColumns: string[] = ['costCaseType', 'band_3', 'band_4', 'band_5', 'band_6', 'band_7', 'band_8', 'band_9', 'band_10', 'total']

  displayedHeadersActual: string[] = ['MONTH', 'BAND 3', 'BAND 4', 'BAND 5', 'BAND 6', 'BAND 7', 'BAND 8', 'BAND 9', 'BAND 10', 'Total']
  displayedColumnsActual: string[] = ['month', 'band_3', 'band_4', 'band_5', 'band_6', 'band_7', 'band_8', 'band_9', 'band_10', 'total']
  dataSource: MatTableDataSource<any>;
  dataSourceActualCostCase: MatTableDataSource<any>;
  @Input() actualCostCase = []
  @Input() costCaseType = ""
  total: any;
  private currentData = []
  data: any[] = [];
  currentItem: any = "";
  @Input() debandValue = "";
  costCaseData = {};
  comments: any = "";
  showUpload = true;
  disableComments = false;
  disabledAllFields = false;
  fileName: any="";
  showInput=true;
  constructor(private costCaseService: CostCaseService, private location: Location) {
  }

  ngOnInit() {
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    this.costCaseData = this.costCaseService.getCostCaseData();
    if (path.includes('approval-center')) {
      this.showInput=false;
      this.showUpload = false;
      this.disableComments = true;
      this.disabledAllFields = true;
      if (this.costCaseData['comments']) {
        this.comments = this.costCaseData['comments'];
      }
      if (this.costCaseData['costCaseType'] == 'DEBAND') {
        this.costCaseType = 'DEBAND';
        let debandValue = Object.keys(this.costCaseData).filter(e => {
          if (this.costCaseData[e] < 0) {
            return e;
          }
        });
        if (this.debandValue[0])
          this.addDeband(debandValue[0]);
      } else if (this.costCaseData['costCaseType']) {
        this.costCaseType = this.costCaseData['costCaseType']
        this.updateCostCaseType(this.costCaseType);
      }
    } else {
      if (this.debandValue)
        this.addDeband(this.debandValue)
    }
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSourceActualCostCase = new MatTableDataSource(this.actualCostCase);
  }

  addDeband(bandValue: any) {
    this.data = [];
    let json = {}
    let path = this.location['_platformStrategy']._platformLocation.location.href;

    if (!path.includes('approval')) {
      json = {
        costCaseType: 'DEBAND-' + (bandValue.split('-')[1] ? bandValue.split('-')[1] : "?"),
        band_3: 0,
        band_4: 0,
        band_5: 0,
        band_6: 0,
        band_7: 0,
        band_8: 0,
        band_9: 0,
        band_10: 0,
        total: 0,
      }
    } else {
      json = this.costCaseData
      if (bandValue.includes('-'))
        json['costCaseType'] = 'DEBAND-' + bandValue.split('-')[1];
      else
        json['costCaseType'] = 'DEBAND-' + bandValue.split('_')[1];
      this.costCaseType = json['costCaseType']
    }
    ////console.log(bandValue);

    this.data.push(json);
    this.dataSource = new MatTableDataSource(this.data);
  }
  updateCostCaseType(value) {
    this.costCaseType = value
    this.data = [];
    let path = this.location['_platformStrategy']._platformLocation.location.href;
    ////console.log(path);
    ////console.log(this.costCaseType);

    if (!path.includes('approval')) {
      this.data = [{
        costCaseType: this.costCaseType,
        band_3: 0,
        band_4: 0,
        band_5: 0,
        band_6: 0,
        band_7: 0,
        band_8: 0,
        band_9: 0,
        band_10: 0,
        total: 0,
      }]
    }
    else {
      // if (this.costCaseType !== 'DEBAND') {
      this.data = [this.costCaseService.getCostCaseData()]
      this.data[0]['costCaseType'] = this.costCaseType;
      // }
    }

    this.dataSource = new MatTableDataSource(this.data);

  }


  updateCostCase(element, event) {



    $('.cost-case-input').on('change, keyup', function () {
      var currentInput = $(this).val();

      var fixedInput: any = currentInput;
      if (fixedInput.length == 0)
        $(this).val(0);
      else {

        $(this).val(parseInt(fixedInput, 10));
      }
    });
    // }
  }

  getTotal(element) {

    let data = element;
    let bandKeys = Object.keys(element).filter(e => e.includes('band') || e.includes('total'))
    let temp = JSON.parse(localStorage.getItem('actualCostCase'));
    let costCaseData = this.costCaseService.getCostCaseData()

    this.actualCostCase.map((actual, i) => {
      bandKeys.forEach(e => {
        actual[e] = temp[i][e] + (isNaN(parseInt(element[e])) ? 0 : parseInt(element[e]))
      })
      actual['deptCode'] = costCaseData['deptCode'];
      actual['deptName'] = costCaseData['deptName'];
      actual['sdl'] = costCaseData['sdl'];
      actual['costCaseType'] = costCaseData['costCaseType'];
      // ////console.log(costCaseData['reqId']);
      
      if(costCaseData['reqId'])
      actual['reqId'] = costCaseData['reqId'];
      if(costCaseData['userName'])
      actual['userName'] = costCaseData['userName'];
      if(costCaseData['submittedBy'])
      actual['submittedBy'] = costCaseData['submittedBy'];
      if(costCaseData['ccnPcr'])
      actual['ccnPcr'] = costCaseData['ccnPcr'];
    })
    setTimeout(() => {
      this.costCaseService.setActualCostCaseData(this.actualCostCase);      
    }, 0);
    let bandValues = Object.keys(data).map(e => {
      if (e.includes('band')) {
        return parseInt(data[e])
      } else {
        return 0
      }
    })
    if (bandValues.length > 0) {
      let sum = bandValues.reduce((a, b) => {
        if (!isNaN(a) && !isNaN(a)) {
          return a + b
        }
      });
      this.costCaseService.setTotalFTE(sum)
      this.costCaseService.setCostCaseData(element)
      element['total'] = sum;
      return sum;
    }
  }

  // getActualValue(id, val, element) {
  //   // let index=this.temp.map(e=>e.month).indexOf(element.month);

  //   if (id.includes('month')) {
  //     return val;
  //   } else {
  //     // this.temp = element ;
  //     let data = this.dataSource.data[0];
  //     if (this.dataSource.data.length > 0) {
  //       data[id] = data[id] ? data[id] : 0;
  //       let sum = (parseInt(val) + parseInt(data[id]))
  //       // if (isNaN(sum)) {
  //       //   return parseInt(val)
  //       // }
  //       // else
  //       // element[id]=sum;
  //       if (this.temp[index]) {
  //         this.temp[index][id] = (parseInt(val) + parseInt(data[id]));
  //         ////console.log(id);
  //         ////console.log(sum);  
  //         ////console.log(this.temp);

  //         let costCaseData = this.costCaseService.getCostCaseData()
  //         this.temp[index]['deptCode'] = costCaseData['deptCode'];
  //         this.temp[index]['deptName'] = costCaseData['deptName'];
  //         this.temp[index]['sdl'] = costCaseData['sdl'];
  //         // this.costCaseService.setActualCostCaseData(this.temp)
  //       }
  //       return sum;
  //     } else {
  //       // element[id]=val;
  //       // this.temp[index][id]=val;
  //       let costCaseData = this.costCaseService.getCostCaseData()
  //       if (this.temp['index']) {
  //         this.temp[index][id] = val;
  //         this.temp[index]['deptCode'] = costCaseData['deptCode'];
  //         this.temp[index]['deptName'] = costCaseData['deptName'];
  //         this.temp[index]['sdl'] = costCaseData['sdl'];
  //         // this.costCaseService.setActualCostCaseData(this.temp)
  //       }
  //       return val;
  //     }
  //   }
  // }

  getMin(element, item, event) {
    if (this.costCaseType == 'DEBAND') {
      let currentVal = parseInt(element.costCaseType.split('-')[1]);
      if (!item.includes(currentVal)) {
        return 0;
      }
    }
  }
  getSubset(bandVal) {
    let arr = [];
    for (let i = 3; i < bandVal; i++) {
      arr.push('band_' + i)
    }
    return arr;
  }
  getMax(element, item) {
    if (this.costCaseType == 'DEBAND') {
      let currentVal = parseInt(element.costCaseType.split('-')[1]);
      if (item.includes(currentVal)) {
        return 0;
      } else {
        if (element.costCaseType) {
          let value = -(element['band_' + currentVal]);
          let band = element['costCaseType'].split('-')[1];
          let subset: any = this.getSubset(band);
          let max = 0, sum = 0;
          subset.forEach((e, b) => {
            sum = sum + element[e]
          });
          if (sum <= value)
            max = element[item] + value;

          return max;
        }
      }

    }
  }
  debandValues(idName, element, item, event) {
    if (this.costCaseType == 'DEBAND') {

      let maxValue = document.getElementById(idName).getAttribute('max')
      if (element[item] > maxValue) {
        element[item] = maxValue
      }
    }
  }
  disableInput(item, element) {
    if(!this.showInput)
    return true;

    if (this.costCaseType.includes('DEBAND')) {
      let costCaseData = this.costCaseService.getCostCaseData();
      // ////console.log(item);
      let val = 3
      if (item.includes('-')) {
        val = parseInt(item.split('-')[1]);
      } else {
        val = parseInt(item.split('_')[1]);

      }
      let currentVal = parseInt(element.costCaseType.split('-')[1]);

      let debandSelection = this.data.map(e => e.costCaseType.split('-')[1]);
      if (val > currentVal || (debandSelection.includes(val.toString()) && val != currentVal)) {
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  uploadFile(file) {
    let costCaseData = this.costCaseService.getCostCaseData();

    costCaseData['file'] = file[0];
    this.fileName=costCaseData['file'].name
    this.costCaseService.setCostCaseData(costCaseData);

  }

  removeFile(){
    this.fileName='';
  }
  saveComments(comments) {
    let costCaseData = this.costCaseService.getCostCaseData();
    costCaseData['comments'] = comments
    this.costCaseService.setCostCaseData(costCaseData);
  }

}
