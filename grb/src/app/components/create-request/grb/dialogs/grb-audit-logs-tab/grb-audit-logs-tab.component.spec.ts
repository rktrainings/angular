import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbAuditLogsTabComponent } from './grb-audit-logs-tab.component';

describe('GrbAuditLogsTabComponent', () => {
  let component: GrbAuditLogsTabComponent;
  let fixture: ComponentFixture<GrbAuditLogsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbAuditLogsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbAuditLogsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
