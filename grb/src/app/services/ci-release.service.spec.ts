import { TestBed } from '@angular/core/testing';

import { CiReleaseService } from './ci-release.service';

describe('CiReleaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CiReleaseService = TestBed.get(CiReleaseService);
    expect(service).toBeTruthy();
  });
});
