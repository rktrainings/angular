import { TestBed } from '@angular/core/testing';

import { ApprovalCenterService } from './approval-center.service';

describe('ApprovalCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalCenterService = TestBed.get(ApprovalCenterService);
    expect(service).toBeTruthy();
  });
});
