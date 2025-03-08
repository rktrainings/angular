import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBandChangeDialogComponent } from './approval-band-change-dialog.component';

describe('ApprovalBandChangeDialogComponent', () => {
  let component: ApprovalBandChangeDialogComponent;
  let fixture: ComponentFixture<ApprovalBandChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalBandChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalBandChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
