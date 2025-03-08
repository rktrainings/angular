import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseApprovalComponent } from './cost-case-approval.component';

describe('CostCaseApprovalComponent', () => {
  let component: CostCaseApprovalComponent;
  let fixture: ComponentFixture<CostCaseApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
