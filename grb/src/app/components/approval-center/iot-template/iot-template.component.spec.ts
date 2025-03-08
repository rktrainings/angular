import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotTemplateComponent } from './iot-template.component';

describe('IotTemplateComponent', () => {
  let component: IotTemplateComponent;
  let fixture: ComponentFixture<IotTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
