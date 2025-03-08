import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCcnpcrComponent } from './dialog-ccnpcr.component';

describe('DialogCcnpcrComponent', () => {
  let component: DialogCcnpcrComponent;
  let fixture: ComponentFixture<DialogCcnpcrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCcnpcrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCcnpcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
