import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbTemplateCommentsComponent } from './grb-template-comments.component';

describe('GrbTemplateCommentsComponent', () => {
  let component: GrbTemplateCommentsComponent;
  let fixture: ComponentFixture<GrbTemplateCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbTemplateCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbTemplateCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
