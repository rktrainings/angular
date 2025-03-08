import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandmixComponent } from './bandmix.component';

describe('BandmixComponent', () => {
  let component: BandmixComponent;
  let fixture: ComponentFixture<BandmixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandmixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandmixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
