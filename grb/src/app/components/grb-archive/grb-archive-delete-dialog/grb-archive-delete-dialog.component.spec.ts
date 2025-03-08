import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbArchiveDeleteDialogComponent } from './grb-archive-delete-dialog.component';

describe('GrbArchiveDeleteDialogComponent', () => {
  let component: GrbArchiveDeleteDialogComponent;
  let fixture: ComponentFixture<GrbArchiveDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbArchiveDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbArchiveDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
