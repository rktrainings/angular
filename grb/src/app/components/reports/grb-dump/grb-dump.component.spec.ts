import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbDumpComponent } from './grb-dump.component';

describe('GrbDumpComponent', () => {
  let component: GrbDumpComponent;
  let fixture: ComponentFixture<GrbDumpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbDumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
