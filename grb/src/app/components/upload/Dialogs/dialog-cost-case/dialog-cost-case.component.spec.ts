import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCostCaseComponent } from './dialog-cost-case.component';

describe('DialogCostCaseComponent', () => {
  let component: DialogCostCaseComponent;
  let fixture: ComponentFixture<DialogCostCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCostCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCostCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
