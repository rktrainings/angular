import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubkComponent } from './subk.component';

describe('SubkComponent', () => {
  let component: SubkComponent;
  let fixture: ComponentFixture<SubkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
