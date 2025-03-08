import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCaseTemplateComponent } from './cost-case-template.component';

describe('CostCaseTemplateComponent', () => {
  let component: CostCaseTemplateComponent;
  let fixture: ComponentFixture<CostCaseTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCaseTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCaseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
