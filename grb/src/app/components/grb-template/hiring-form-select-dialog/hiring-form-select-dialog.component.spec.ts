import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormSelectDialogComponent } from './hiring-form-select-dialog.component';

describe('HiringFormSelectDialogComponent', () => {
  let component: HiringFormSelectDialogComponent;
  let fixture: ComponentFixture<HiringFormSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
