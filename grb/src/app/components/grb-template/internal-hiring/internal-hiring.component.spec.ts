import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalHiringComponent } from './internal-hiring.component';

describe('InternalHiringComponent', () => {
  let component: InternalHiringComponent;
  let fixture: ComponentFixture<InternalHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
