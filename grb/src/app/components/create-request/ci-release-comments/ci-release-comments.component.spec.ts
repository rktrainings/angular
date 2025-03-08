import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReleaseCommentsComponent } from './ci-release-comments.component';

describe('CiReleaseCommentsComponent', () => {
  let component: CiReleaseCommentsComponent;
  let fixture: ComponentFixture<CiReleaseCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReleaseCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReleaseCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
