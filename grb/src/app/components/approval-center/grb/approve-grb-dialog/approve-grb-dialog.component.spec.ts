import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGrbDialogComponent } from './approve-grb-dialog.component';

describe('ApproveGrbDialogComponent', () => {
  let component: ApproveGrbDialogComponent;
  let fixture: ComponentFixture<ApproveGrbDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveGrbDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveGrbDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
