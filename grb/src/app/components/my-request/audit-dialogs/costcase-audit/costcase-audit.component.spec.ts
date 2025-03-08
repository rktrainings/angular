import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcaseAuditComponent } from './costcase-audit.component';

describe('CostcaseAuditComponent', () => {
  let component: CostcaseAuditComponent;
  let fixture: ComponentFixture<CostcaseAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostcaseAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcaseAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
