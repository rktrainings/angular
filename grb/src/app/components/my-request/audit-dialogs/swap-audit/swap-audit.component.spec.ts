import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAuditComponent } from './swap-audit.component';

describe('SwapAuditComponent', () => {
  let component: SwapAuditComponent;
  let fixture: ComponentFixture<SwapAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
