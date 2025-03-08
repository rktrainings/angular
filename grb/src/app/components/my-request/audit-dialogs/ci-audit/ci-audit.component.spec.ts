import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAuditComponent } from './ci-audit.component';

describe('CiAuditComponent', () => {
  let component: CiAuditComponent;
  let fixture: ComponentFixture<CiAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
