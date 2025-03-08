import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiReportComponent } from './ci-report.component';

describe('CiReportComponent', () => {
  let component: CiReportComponent;
  let fixture: ComponentFixture<CiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
