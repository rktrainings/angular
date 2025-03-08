import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalHiringComponent } from './external-hiring.component';

describe('ExternalHiringComponent', () => {
  let component: ExternalHiringComponent;
  let fixture: ComponentFixture<ExternalHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
