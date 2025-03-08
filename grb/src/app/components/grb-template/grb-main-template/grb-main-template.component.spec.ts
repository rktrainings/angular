import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbMainTemplateComponent } from './grb-main-template.component';

describe('GrbMainTemplateComponent', () => {
  let component: GrbMainTemplateComponent;
  let fixture: ComponentFixture<GrbMainTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbMainTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbMainTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
