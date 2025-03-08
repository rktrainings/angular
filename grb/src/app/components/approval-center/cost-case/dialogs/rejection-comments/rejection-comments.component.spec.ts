import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionCommentsComponent } from './rejection-comments.component';

describe('RejectionCommentsComponent', () => {
  let component: RejectionCommentsComponent;
  let fixture: ComponentFixture<RejectionCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
