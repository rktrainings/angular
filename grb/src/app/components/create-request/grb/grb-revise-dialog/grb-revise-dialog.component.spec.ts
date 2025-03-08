import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbReviseDialogComponent } from './grb-revise-dialog.component';

describe('GrbReviseDialogComponent', () => {
  let component: GrbReviseDialogComponent;
  let fixture: ComponentFixture<GrbReviseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbReviseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbReviseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
