import { TestBed } from '@angular/core/testing';

import { HiringFormService } from './hiring-form.service';

describe('HiringFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HiringFormService = TestBed.get(HiringFormService);
    expect(service).toBeTruthy();
  });
});
