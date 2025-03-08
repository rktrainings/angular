import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrbArchiveMainComponent } from './grb-archive-main.component';

describe('GrbArchiveMainComponent', () => {
  let component: GrbArchiveMainComponent;
  let fixture: ComponentFixture<GrbArchiveMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrbArchiveMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrbArchiveMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
