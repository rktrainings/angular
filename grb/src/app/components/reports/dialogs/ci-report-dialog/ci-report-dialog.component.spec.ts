import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReportDialogComponent } from './ci-report-dialog.component';

describe('CiReportDialogComponent', () => {
  let component: CiReportDialogComponent;
  let fixture: ComponentFixture<CiReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
