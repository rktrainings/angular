import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiDashboardComponent } from './ci-dashboard.component';

describe('CiDashboardComponent', () => {
  let component: CiDashboardComponent;
  let fixture: ComponentFixture<CiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
