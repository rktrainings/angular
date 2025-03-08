import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReleaseApproverCommentsComponent } from './ci-release-approver-comments.component';

describe('CiReleaseApproverCommentsComponent', () => {
  let component: CiReleaseApproverCommentsComponent;
  let fixture: ComponentFixture<CiReleaseApproverCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReleaseApproverCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReleaseApproverCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
