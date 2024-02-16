import { TestBed } from '@angular/core/testing';

import { PCUPhaseDataService } from './pcu-phase-data.service';

describe('PCUPhaseDataService', () => {
  let service: PCUPhaseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PCUPhaseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
