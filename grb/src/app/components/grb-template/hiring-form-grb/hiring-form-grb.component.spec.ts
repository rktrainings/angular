import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormGrbComponent } from './hiring-form-grb.component';

describe('HiringFormGrbComponent', () => {
  let component: HiringFormGrbComponent;
  let fixture: ComponentFixture<HiringFormGrbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormGrbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormGrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
