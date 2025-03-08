import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandChangeComponent } from './band-change.component';

describe('BandChangeComponent', () => {
  let component: BandChangeComponent;
  let fixture: ComponentFixture<BandChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
