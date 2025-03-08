import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbNumberComponent } from './grb-number.component';

describe('GrbNumberComponent', () => {
  let component: GrbNumberComponent;
  let fixture: ComponentFixture<GrbNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
