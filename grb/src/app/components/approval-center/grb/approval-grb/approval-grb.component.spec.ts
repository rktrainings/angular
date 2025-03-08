import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalGrbComponent } from './grb-template.component';

describe('ApprovalGrbComponent', () => {
  let component: ApprovalGrbComponent;
  let fixture: ComponentFixture<ApprovalGrbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalGrbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalGrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
