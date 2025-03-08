import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredialogComponent } from './hiredialog.component';

describe('HiredialogComponent', () => {
  let component: HiredialogComponent;
  let fixture: ComponentFixture<HiredialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiredialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
