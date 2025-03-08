import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubkToRegularComponent } from './subk-to-regular.component';

describe('SubkToRegularComponent', () => {
  let component: SubkToRegularComponent;
  let fixture: ComponentFixture<SubkToRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubkToRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubkToRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
