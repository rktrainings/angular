import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbBandchangeDialogComponent } from './grb-bandchange-dialog.component';

describe('GrbBandchangeDialogComponent', () => {
  let component: GrbBandchangeDialogComponent;
  let fixture: ComponentFixture<GrbBandchangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbBandchangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbBandchangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
