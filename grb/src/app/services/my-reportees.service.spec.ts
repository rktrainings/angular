import { TestBed } from '@angular/core/testing';

import { MyReporteesService } from './my-reportees.service';

describe('MyReporteesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyReporteesService = TestBed.get(MyReporteesService);
    expect(service).toBeTruthy();
  });
});
