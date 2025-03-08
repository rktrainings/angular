import { TestBed } from '@angular/core/testing';

import { CostCaseService } from './cost-case.service';

describe('CostCaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostCaseService = TestBed.get(CostCaseService);
    expect(service).toBeTruthy();
  });
});
