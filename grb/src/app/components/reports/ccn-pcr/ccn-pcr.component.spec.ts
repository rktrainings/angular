import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcnPcrComponent } from './ccn-pcr.component';

describe('CcnPcrComponent', () => {
  let component: CcnPcrComponent;
  let fixture: ComponentFixture<CcnPcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcnPcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcnPcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
