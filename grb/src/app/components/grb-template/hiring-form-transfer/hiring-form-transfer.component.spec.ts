import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormTransferComponent } from './hiring-form-transfer.component';

describe('HiringFormTransferComponent', () => {
  let component: HiringFormTransferComponent;
  let fixture: ComponentFixture<HiringFormTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
