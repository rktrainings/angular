import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportGrbRequestComponent } from './export-grb-request.component';

describe('ExportGrbRequestComponent', () => {
  let component: ExportGrbRequestComponent;
  let fixture: ComponentFixture<ExportGrbRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportGrbRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportGrbRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
