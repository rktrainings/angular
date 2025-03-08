import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttritionApproveCommentboxComponent } from './attrition-approve-commentbox.component';

describe('AttritionApproveCommentboxComponent', () => {
  let component: AttritionApproveCommentboxComponent;
  let fixture: ComponentFixture<AttritionApproveCommentboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttritionApproveCommentboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttritionApproveCommentboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
