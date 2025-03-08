import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandMixComponent } from './band-mix.component';

describe('BandMixComponent', () => {
  let component: BandMixComponent;
  let fixture: ComponentFixture<BandMixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandMixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandMixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
