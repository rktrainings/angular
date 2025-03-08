import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseSubmittedComponent } from './cost-case-submitted.component';

describe('CostCaseSubmittedComponent', () => {
  let component: CostCaseSubmittedComponent;
  let fixture: ComponentFixture<CostCaseSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
