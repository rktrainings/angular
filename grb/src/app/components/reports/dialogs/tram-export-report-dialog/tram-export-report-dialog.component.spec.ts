import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramExportReportDialogComponent } from './tram-export-report-dialog.component';

describe('TramExportReportDialogComponent', () => {
  let component: TramExportReportDialogComponent;
  let fixture: ComponentFixture<TramExportReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramExportReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramExportReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
