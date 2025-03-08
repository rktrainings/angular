import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrpListComponent } from './orp-list.component';

describe('OrpListComponent', () => {
  let component: OrpListComponent;
  let fixture: ComponentFixture<OrpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
