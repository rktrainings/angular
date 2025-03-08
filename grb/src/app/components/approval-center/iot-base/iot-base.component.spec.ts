import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IotBaseComponent } from './iot-base.component';

describe('IotBaseComponent', () => {
  let component: IotBaseComponent;
  let fixture: ComponentFixture<IotBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IotBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IotBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
