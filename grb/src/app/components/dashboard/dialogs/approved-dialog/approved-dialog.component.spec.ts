import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDialogComponent } from './approved-dialog.component';

describe('ApprovedDialogComponent', () => {
  let component: ApprovedDialogComponent;
  let fixture: ComponentFixture<ApprovedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
