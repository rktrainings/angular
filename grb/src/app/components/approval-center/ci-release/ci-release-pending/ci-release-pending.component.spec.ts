import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReleasePendingComponent } from './ci-release-pending.component';

describe('CiReleasePendingComponent', () => {
  let component: CiReleasePendingComponent;
  let fixture: ComponentFixture<CiReleasePendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReleasePendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReleasePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
