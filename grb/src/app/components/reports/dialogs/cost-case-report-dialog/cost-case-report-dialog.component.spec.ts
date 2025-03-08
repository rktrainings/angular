import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseReportDialogComponent } from './cost-case-report-dialog.component';

describe('CostCaseReportDialogComponent', () => {
  let component: CostCaseReportDialogComponent;
  let fixture: ComponentFixture<CostCaseReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
