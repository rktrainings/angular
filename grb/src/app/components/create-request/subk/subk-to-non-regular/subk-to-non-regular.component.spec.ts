import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubkToNonRegularComponent } from './subk-to-non-regular.component';

describe('SubkToNonRegularComponent', () => {
  let component: SubkToNonRegularComponent;
  let fixture: ComponentFixture<SubkToNonRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubkToNonRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubkToNonRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
