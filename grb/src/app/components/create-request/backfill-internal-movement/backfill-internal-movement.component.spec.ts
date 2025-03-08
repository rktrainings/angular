import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackfillInternalMovementComponent } from './backfill-internal-movement.component';

describe('BackfillInternalMovementComponent', () => {
  let component: BackfillInternalMovementComponent;
  let fixture: ComponentFixture<BackfillInternalMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackfillInternalMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackfillInternalMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
