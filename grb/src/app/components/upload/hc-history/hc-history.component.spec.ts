import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcHistoryComponent } from './hc-history.component';

describe('HcHistoryComponent', () => {
  let component: HcHistoryComponent;
  let fixture: ComponentFixture<HcHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
