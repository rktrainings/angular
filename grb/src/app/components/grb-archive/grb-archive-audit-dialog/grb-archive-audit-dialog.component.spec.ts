import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbArchiveAuditDialogComponent } from './grb-archive-audit-dialog.component';

describe('GrbArchiveAuditDialogComponent', () => {
  let component: GrbArchiveAuditDialogComponent;
  let fixture: ComponentFixture<GrbArchiveAuditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbArchiveAuditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbArchiveAuditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
