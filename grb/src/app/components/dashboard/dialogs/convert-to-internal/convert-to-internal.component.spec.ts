import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToInternalComponent } from './convert-to-internal.component';

describe('ConvertToInternalComponent', () => {
  let component: ConvertToInternalComponent;
  let fixture: ComponentFixture<ConvertToInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertToInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertToInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
