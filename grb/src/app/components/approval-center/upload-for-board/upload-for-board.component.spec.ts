import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadForBoardComponent } from './upload-for-board.component';

describe('UploadForBoardComponent', () => {
  let component: UploadForBoardComponent;
  let fixture: ComponentFixture<UploadForBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadForBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadForBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
