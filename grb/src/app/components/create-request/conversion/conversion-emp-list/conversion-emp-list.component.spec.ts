import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionEmpListComponent } from './conversion-emp-list.component';

describe('ConversionEmpListComponent', () => {
  let component: ConversionEmpListComponent;
  let fixture: ComponentFixture<ConversionEmpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionEmpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
