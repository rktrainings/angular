import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbComponent } from './grb.component';

describe('GrbComponent', () => {
  let component: GrbComponent;
  let fixture: ComponentFixture<GrbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
