import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramExportComponent } from './tram-export.component';

describe('TramExportComponent', () => {
  let component: TramExportComponent;
  let fixture: ComponentFixture<TramExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
