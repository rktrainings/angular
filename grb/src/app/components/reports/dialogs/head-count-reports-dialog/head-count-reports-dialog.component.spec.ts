import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCountReportsDialogComponent } from './head-count-reports-dialog.component';

describe('HeadCountReportsDialogComponent', () => {
  let component: HeadCountReportsDialogComponent;
  let fixture: ComponentFixture<HeadCountReportsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadCountReportsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCountReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
