import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandchangeAuditComponent } from './bandchange-audit.component';

describe('BandchangeAuditComponent', () => {
  let component: BandchangeAuditComponent;
  let fixture: ComponentFixture<BandchangeAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandchangeAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandchangeAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
