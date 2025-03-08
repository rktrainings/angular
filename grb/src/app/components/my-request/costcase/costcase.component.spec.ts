import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostcaseComponent } from './costcase.component';

describe('CostcaseComponent', () => {
  let component: CostcaseComponent;
  let fixture: ComponentFixture<CostcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
