import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewGrowthComponent } from './dialog-new-growth.component';

describe('DialogNewGrowthComponent', () => {
  let component: DialogNewGrowthComponent;
  let fixture: ComponentFixture<DialogNewGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
