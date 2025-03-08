import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccdialogComponent } from './accdialog.component';

describe('AccdialogComponent', () => {
  let component: AccdialogComponent;
  let fixture: ComponentFixture<AccdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
