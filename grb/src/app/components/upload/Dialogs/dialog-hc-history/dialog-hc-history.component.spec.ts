import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHcHistoryComponent } from './dialog-hc-history.component';

describe('DialogHcHistoryComponent', () => {
  let component: DialogHcHistoryComponent;
  let fixture: ComponentFixture<DialogHcHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHcHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHcHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
