import { TestBed } from '@angular/core/testing';
import { GrbArchiveService } from './grb-archive.service';

describe('MySpanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrbArchiveService = TestBed.get(GrbArchiveService);
    expect(service).toBeTruthy();
  });
});
