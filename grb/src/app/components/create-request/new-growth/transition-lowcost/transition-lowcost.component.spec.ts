import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionLowcostComponent } from './transition-lowcost.component';

describe('TransitionLowcostComponent', () => {
  let component: TransitionLowcostComponent;
  let fixture: ComponentFixture<TransitionLowcostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionLowcostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionLowcostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
