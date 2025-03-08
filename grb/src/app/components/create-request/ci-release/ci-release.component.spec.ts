import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReleaseComponent } from './ci-release.component';

describe('CiReleaseComponent', () => {
  let component: CiReleaseComponent;
  let fixture: ComponentFixture<CiReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
