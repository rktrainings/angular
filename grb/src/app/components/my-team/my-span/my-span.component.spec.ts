import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpanComponent } from './my-span.component';

describe('MySpanComponent', () => {
  let component: MySpanComponent;
  let fixture: ComponentFixture<MySpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
