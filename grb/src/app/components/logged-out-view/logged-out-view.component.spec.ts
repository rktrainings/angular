import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutViewComponent } from './logged-out-view.component';

describe('LoggedOutViewComponent', () => {
  let component: LoggedOutViewComponent;
  let fixture: ComponentFixture<LoggedOutViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
