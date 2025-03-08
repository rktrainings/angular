import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandChangeAuditLogComponent } from './band-change-audit-log.component';

describe('BandChangeAuditLogComponent', () => {
  let component: BandChangeAuditLogComponent;
  let fixture: ComponentFixture<BandChangeAuditLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandChangeAuditLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandChangeAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
