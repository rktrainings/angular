import { TestBed } from '@angular/core/testing';

import { TermGuardService } from './term-guard.service';

describe('TermGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermGuardService = TestBed.get(TermGuardService);
    expect(service).toBeTruthy();
  });
});
