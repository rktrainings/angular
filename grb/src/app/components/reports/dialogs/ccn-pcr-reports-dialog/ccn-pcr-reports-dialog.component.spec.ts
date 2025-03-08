import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcnPcrReportsDialogComponent } from './ccn-pcr-reports-dialog.component';

describe('CcnPcrReportsDialogComponent', () => {
  let component: CcnPcrReportsDialogComponent;
  let fixture: ComponentFixture<CcnPcrReportsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcnPcrReportsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcnPcrReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
