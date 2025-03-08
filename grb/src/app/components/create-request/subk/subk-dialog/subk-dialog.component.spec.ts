import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubkDialogComponent } from './subk-dialog.component';

describe('SubkDialogComponent', () => {
  let component: SubkDialogComponent;
  let fixture: ComponentFixture<SubkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
