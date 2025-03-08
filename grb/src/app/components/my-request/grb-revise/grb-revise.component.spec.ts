import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbReviseComponent } from './grb-revise.component';

describe('GrbReviseComponent', () => {
  let component: GrbReviseComponent;
  let fixture: ComponentFixture<GrbReviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbReviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbReviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
