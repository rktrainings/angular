import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SundryReportsComponent } from './sundry-reports.component';

describe('SundryReportsComponent', () => {
  let component: SundryReportsComponent;
  let fixture: ComponentFixture<SundryReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SundryReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SundryReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
