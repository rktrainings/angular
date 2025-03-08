import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttritionCommentboxComponent } from './attrition-commentbox.component';

describe('AttritionCommentboxComponent', () => {
  let component: AttritionCommentboxComponent;
  let fixture: ComponentFixture<AttritionCommentboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttritionCommentboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttritionCommentboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
