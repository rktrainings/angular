import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TollTemplateComponent } from './toll-template.component';

describe('TollTemplateComponent', () => {
  let component: TollTemplateComponent;
  let fixture: ComponentFixture<TollTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TollTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TollTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
