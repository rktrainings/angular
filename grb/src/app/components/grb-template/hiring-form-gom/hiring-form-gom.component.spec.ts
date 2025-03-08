import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormGomComponent } from './hiring-form-gom.component';

describe('HiringFormGomComponent', () => {
  let component: HiringFormGomComponent;
  let fixture: ComponentFixture<HiringFormGomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormGomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormGomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
