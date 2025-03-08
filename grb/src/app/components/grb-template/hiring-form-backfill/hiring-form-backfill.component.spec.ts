import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringFormBackfillComponent } from './hiring-form-backfill.component';

describe('HiringFormBackfillComponent', () => {
  let component: HiringFormBackfillComponent;
  let fixture: ComponentFixture<HiringFormBackfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiringFormBackfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringFormBackfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
