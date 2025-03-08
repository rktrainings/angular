import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrHiringstatusReportsDialogComponent } from './br-hiringstatus-reports-dialog.component';

describe('BrHiringstatusReportsDialogComponent', () => {
  let component: BrHiringstatusReportsDialogComponent;
  let fixture: ComponentFixture<BrHiringstatusReportsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrHiringstatusReportsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrHiringstatusReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
