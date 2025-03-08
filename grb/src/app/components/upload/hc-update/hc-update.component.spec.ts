import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcUpdateComponent } from './hc-update.component';

describe('HcUpdateComponent', () => {
  let component: HcUpdateComponent;
  let fixture: ComponentFixture<HcUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
