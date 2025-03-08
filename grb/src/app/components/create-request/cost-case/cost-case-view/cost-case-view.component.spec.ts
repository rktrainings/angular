import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseViewComponent } from './cost-case-view.component';

describe('CostCaseViewComponent', () => {
  let component: CostCaseViewComponent;
  let fixture: ComponentFixture<CostCaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
