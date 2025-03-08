import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConversionComponent } from './dialog-conversion.component';

describe('DialogConversionComponent', () => {
  let component: DialogConversionComponent;
  let fixture: ComponentFixture<DialogConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
