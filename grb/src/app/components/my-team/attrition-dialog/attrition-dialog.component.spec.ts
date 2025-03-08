import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttritionDialogComponent } from './attrition-dialog.component';

describe('AttritionDialogComponent', () => {
  let component: AttritionDialogComponent;
  let fixture: ComponentFixture<AttritionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttritionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttritionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
