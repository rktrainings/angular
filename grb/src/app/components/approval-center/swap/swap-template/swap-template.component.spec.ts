import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapTemplateComponent } from './swap-template.component';

describe('SwapTemplateComponent', () => {
  let component: SwapTemplateComponent;
  let fixture: ComponentFixture<SwapTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwapTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
