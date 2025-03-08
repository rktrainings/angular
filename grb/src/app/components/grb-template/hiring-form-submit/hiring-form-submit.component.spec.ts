import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormSubmitComponent } from './hiring-form-submit.component';

describe('HiringFormSubmitComponent', () => {
  let component: HiringFormSubmitComponent;
  let fixture: ComponentFixture<HiringFormSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
