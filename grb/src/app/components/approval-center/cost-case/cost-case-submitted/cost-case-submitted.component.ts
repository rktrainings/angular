import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CostCaseService } from 'src/app/services/cost-case.service';

@Component({
  selector: 'app-cost-case-submitted',
  templateUrl: './cost-case-submitted.component.html',
  styleUrls: ['./cost-case-submitted.component.scss']
})
export class CostCaseSubmittedComponent implements OnInit {
  displayedHeaders: string[] = ['COST CASE TYPE', 'DEPT CODE', 'DEPT NAME', 'FROM MONTH', 'TO MONTH', 'SUBMITTED BY', 'SUBMITTED DATE']
  displayedColumns: string[] = ['costCaseType', 'deptCode', 'deptName', 'fromMonth', 'toMonth', 'submittedBy', 'submittedDate']
  AllColumns: string[] = ['costCaseType', 'deptCode', 'deptName', 'fromMonth', 'toMonth', 'submittedBy', 'submittedDate', 'actions']
  dataSource = new MatTableDataSource([]);
  filteredData = [];
  show = false;
  enabledNoDataMsg: boolean;
  count: number;
  constructor(private costCase: CostCaseService, private router: Router) { }

  ngOnInit() {
    this.costCase.getAllCostCaseRequests().subscribe((data: any[]) => {
      let groupByDept = data.reduce((r, a) => {
        r[a.deptCode] = [...r[a.deptCode] || [], a];
        return r;
      }, {});

      for (let each in groupByDept) {
        groupByDept[each] = groupByDept[each].reduce((r, a) => {
          r[a.costCaseType] = [...r[a.costCaseType] || [], a];
          return r;
        }, {});

        for (var eachCostCaseType in groupByDept[each]) {
          groupByDept[each][eachCostCaseType] = groupByDept[each][eachCostCaseType].reduce((r, a) => {
            r[a.reqId] = [...r[a.reqId] || [], a];
            return r;
          }, {});



          // if(groupByDept[each][eachCostCaseType])



          for (var eachDate in groupByDept[each][eachCostCaseType]) {
            groupByDept[each][eachCostCaseType][eachDate].sort(function (a, b) {
              return parseFloat(a.id) - parseFloat(b.id);
            });
            let json = {}
            for (var i = 0; i < groupByDept[each][eachCostCaseType][eachDate].length; i++) {
              if (i == 0) {
                json = groupByDept[each][eachCostCaseType][eachDate][i];
                if (groupByDept[each][eachCostCaseType][eachDate][i]['month']) {
                  json['fromMonth'] = groupByDept[each][eachCostCaseType][eachDate][i]['month'].toUpperCase()
                  json['toMonth'] = groupByDept[each][eachCostCaseType][eachDate][i]['month'].toUpperCase();
                }
              } else {
                if (groupByDept[each][eachCostCaseType][eachDate][i]['month']) {
                  json['toMonth'] = groupByDept[each][eachCostCaseType][eachDate][i]['month'].toUpperCase();
                }
              }
            }
            if (json['fromMonth'])
              this.filteredData.push(json);
            groupByDept[each][eachCostCaseType][eachDate] = json;
          }
        }
      }

      if (this.filteredData)
      if (this.filteredData.length > 0) {
        this.filteredData.sort((a, b) => {
          return new Date(b['submittedDate']).getTime() - new Date(a['submittedDate']).getTime();
        });
      }
      this.dataSource = new MatTableDataSource(this.filteredData);

      this.count = this.dataSource.data.length

      this.show = true
      ////console.log(groupByDept);
    });

  }

  onActionClick(element) {
    this.costCase.setCostCaseData(element);
    this.router.navigateByUrl('/approval-center/cost-case/view')
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length === 0) {
      this.enabledNoDataMsg = true;
    } else {
      this.enabledNoDataMsg = false;
    }
    this.count = this.dataSource.filteredData.length
  }


}
