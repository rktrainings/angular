import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcActualComponent } from './hc-actual.component';

describe('HcActualComponent', () => {
  let component: HcActualComponent;
  let fixture: ComponentFixture<HcActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
