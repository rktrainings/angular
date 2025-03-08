import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReleaseViewComponent } from './ci-release-view.component';

describe('CiReleaseViewComponent', () => {
  let component: CiReleaseViewComponent;
  let fixture: ComponentFixture<CiReleaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReleaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReleaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
