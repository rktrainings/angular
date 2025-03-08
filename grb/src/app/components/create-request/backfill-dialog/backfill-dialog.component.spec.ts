import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackfillDialogComponent } from './backfill-dialog.component';

describe('BackfillDialogComponent', () => {
  let component: BackfillDialogComponent;
  let fixture: ComponentFixture<BackfillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackfillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackfillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
