import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGrowthComponent } from './new-growth.component';

describe('NewGrowthComponent', () => {
  let component: NewGrowthComponent;
  let fixture: ComponentFixture<NewGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
