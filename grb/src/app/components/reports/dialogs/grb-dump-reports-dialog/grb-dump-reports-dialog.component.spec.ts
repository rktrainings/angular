import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbDumpReportsDialogComponent } from './grb-dump-reports-dialog.component';

describe('GrbDumpReportsDialogComponent', () => {
  let component: GrbDumpReportsDialogComponent;
  let fixture: ComponentFixture<GrbDumpReportsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbDumpReportsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbDumpReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
