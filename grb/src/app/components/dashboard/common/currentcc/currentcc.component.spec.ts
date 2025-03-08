import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentccComponent } from './currentcc.component';

describe('CurrentccComponent', () => {
  let component: CurrentccComponent;
  let fixture: ComponentFixture<CurrentccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
