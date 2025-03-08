import { TestBed } from '@angular/core/testing';

import { CreateRequestGrbService } from './create-request-grb.service';

describe('CreateRequestGrbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateRequestGrbService = TestBed.get(CreateRequestGrbService);
    expect(service).toBeTruthy();
  });
});
