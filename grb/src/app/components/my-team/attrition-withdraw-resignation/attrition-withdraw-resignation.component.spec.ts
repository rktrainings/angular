import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttritionWithdrawResignationComponent } from './attrition-withdraw-resignation.component';

describe('AttritionWithdrawResignationComponent', () => {
  let component: AttritionWithdrawResignationComponent;
  let fixture: ComponentFixture<AttritionWithdrawResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttritionWithdrawResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttritionWithdrawResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
