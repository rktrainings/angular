import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormTramComponent } from './hiring-form-tram.component';

describe('HiringFormTramComponent', () => {
  let component: HiringFormTramComponent;
  let fixture: ComponentFixture<HiringFormTramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormTramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormTramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
