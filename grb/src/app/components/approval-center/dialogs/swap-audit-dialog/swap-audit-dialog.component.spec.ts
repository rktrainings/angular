import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapAuditDialogComponent } from './swap-audit-dialog.component';

describe('SwapAuditDialogComponent', () => {
  let component: SwapAuditDialogComponent;
  let fixture: ComponentFixture<SwapAuditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapAuditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapAuditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
