import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseReportComponent } from './cost-case-report.component';

describe('CostCaseReportComponent', () => {
  let component: CostCaseReportComponent;
  let fixture: ComponentFixture<CostCaseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
