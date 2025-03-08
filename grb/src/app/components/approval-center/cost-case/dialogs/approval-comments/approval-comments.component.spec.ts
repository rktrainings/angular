import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCommentsComponent } from './approval-comments.component';

describe('ApprovalCommentsComponent', () => {
  let component: ApprovalCommentsComponent;
  let fixture: ComponentFixture<ApprovalCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
