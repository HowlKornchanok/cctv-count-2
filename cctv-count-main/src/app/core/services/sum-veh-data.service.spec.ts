import { TestBed } from '@angular/core/testing';

import { SumVehDataService } from './sum-veh-data.service';

describe('SumVehDataService', () => {
  let service: SumVehDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumVehDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
