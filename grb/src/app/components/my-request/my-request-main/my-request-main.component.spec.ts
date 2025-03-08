import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestMainComponent } from './my-request-main.component';

describe('MyRequestMainComponent', () => {
  let component: MyRequestMainComponent;
  let fixture: ComponentFixture<MyRequestMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
