import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackfillPromotionComponent } from './backfill-promotion.component';

describe('BackfillPromotionComponent', () => {
  let component: BackfillPromotionComponent;
  let fixture: ComponentFixture<BackfillPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackfillPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackfillPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
