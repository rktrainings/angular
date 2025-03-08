import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormViewComponent } from './hiring-form-view.component';

describe('HiringFormViewComponent', () => {
  let component: HiringFormViewComponent;
  let fixture: ComponentFixture<HiringFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
