import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizopsComponent } from './bizops.component';

describe('BizopsComponent', () => {
  let component: BizopsComponent;
  let fixture: ComponentFixture<BizopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
