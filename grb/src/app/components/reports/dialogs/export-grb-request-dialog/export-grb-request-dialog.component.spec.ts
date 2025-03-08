import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportGrbRequestDialogComponent } from './export-grb-request-dialog.component';

describe('ExportGrbRequestDialogComponent', () => {
  let component: ExportGrbRequestDialogComponent;
  let fixture: ComponentFixture<ExportGrbRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportGrbRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGrbRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
