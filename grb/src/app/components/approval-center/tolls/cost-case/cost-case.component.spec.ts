import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseComponent } from './cost-case.component';

describe('CostCaseComponent', () => {
  let component: CostCaseComponent;
  let fixture: ComponentFixture<CostCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
