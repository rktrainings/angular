import { TestBed } from '@angular/core/testing';

import { AttritionService } from './attrition.service';

describe('AttritionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AttritionService = TestBed.get(AttritionService);
    expect(service).toBeTruthy();
  });
});
