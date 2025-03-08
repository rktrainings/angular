import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentReportsDialogComponent } from './recruitment-reports-dialog.component';

describe('RecruitmentReportsDialogComponent', () => {
  let component: RecruitmentReportsDialogComponent;
  let fixture: ComponentFixture<RecruitmentReportsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentReportsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentReportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
