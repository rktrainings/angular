import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawResignationComponent } from './withdraw-resignation.component';

describe('WithdrawResignationComponent', () => {
  let component: WithdrawResignationComponent;
  let fixture: ComponentFixture<WithdrawResignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawResignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawResignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
