import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrpComponent } from './orp.component';

describe('OrpComponent', () => {
  let component: OrpComponent;
  let fixture: ComponentFixture<OrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
