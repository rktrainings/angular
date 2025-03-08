import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbreviseAuditComponent } from './grbrevise-audit.component';

describe('GrbreviseAuditComponent', () => {
  let component: GrbreviseAuditComponent;
  let fixture: ComponentFixture<GrbreviseAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbreviseAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbreviseAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
