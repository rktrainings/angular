import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackfillAttritionComponent } from './backfill-attrition.component';

describe('BackfillAttritionComponent', () => {
  let component: BackfillAttritionComponent;
  let fixture: ComponentFixture<BackfillAttritionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackfillAttritionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackfillAttritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
