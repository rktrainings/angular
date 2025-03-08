import { TestBed } from '@angular/core/testing';

import { SubkService } from './subk.service';

describe('SubkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubkService = TestBed.get(SubkService);
    expect(service).toBeTruthy();
  });
});
