import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckComponent } from './employee-check.component';

describe('EmployeeCheckComponent', () => {
  let component: EmployeeCheckComponent;
  let fixture: ComponentFixture<EmployeeCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
