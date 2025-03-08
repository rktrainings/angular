import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyAttritionComponent } from './early-attrition.component';

describe('EarlyAttritionComponent', () => {
  let component: EarlyAttritionComponent;
  let fixture: ComponentFixture<EarlyAttritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarlyAttritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarlyAttritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
