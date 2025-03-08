import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHcActualComponent } from './dialog-hc-actual.component';

describe('DialogHcActualComponent', () => {
  let component: DialogHcActualComponent;
  let fixture: ComponentFixture<DialogHcActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHcActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHcActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
