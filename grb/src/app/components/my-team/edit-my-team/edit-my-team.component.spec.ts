import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyTeamComponent } from './edit-my-team.component';

describe('EditMyTeamComponent', () => {
  let component: EditMyTeamComponent;
  let fixture: ComponentFixture<EditMyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
