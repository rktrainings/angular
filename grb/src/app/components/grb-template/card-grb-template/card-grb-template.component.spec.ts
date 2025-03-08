import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGrbTemplateComponent } from './card-grb-template.component';

describe('CardGrbTemplateComponent', () => {
  let component: CardGrbTemplateComponent;
  let fixture: ComponentFixture<CardGrbTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGrbTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGrbTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
