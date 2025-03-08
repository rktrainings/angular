import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HireRequestORPComponent } from './hire-request-orp.component';

describe('HireRequestORPComponent', () => {
  let component: HireRequestORPComponent;
  let fixture: ComponentFixture<HireRequestORPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HireRequestORPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HireRequestORPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
