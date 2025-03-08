import { TestBed } from '@angular/core/testing';

import { MySpanService } from './my-span.service';

describe('MySpanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MySpanService = TestBed.get(MySpanService);
    expect(service).toBeTruthy();
  });
});
