import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UteComponent } from './ute.component';

describe('UteComponent', () => {
  let component: UteComponent;
  let fixture: ComponentFixture<UteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
