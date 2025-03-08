import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrHiringstatusComponent } from './br-hiringstatus.component';

describe('BrHiringstatusComponent', () => {
  let component: BrHiringstatusComponent;
  let fixture: ComponentFixture<BrHiringstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrHiringstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrHiringstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
