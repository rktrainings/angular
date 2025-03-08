import { TestBed } from '@angular/core/testing';

import { ApprovalCenterGrbService } from './approval-center-grb.service';

describe('ApprovalCenterGrbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalCenterGrbService = TestBed.get(ApprovalCenterGrbService);
    expect(service).toBeTruthy();
  });
});
