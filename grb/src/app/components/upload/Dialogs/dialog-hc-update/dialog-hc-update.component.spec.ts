import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHcUpdateComponent } from './dialog-hc-update.component';

describe('DialogHcUpdateComponent', () => {
  let component: DialogHcUpdateComponent;
  let fixture: ComponentFixture<DialogHcUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHcUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
