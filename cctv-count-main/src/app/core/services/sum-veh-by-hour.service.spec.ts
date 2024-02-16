import { TestBed } from '@angular/core/testing';

import { SumVehByHourService } from './sum-veh-by-hour.service';

describe('SumVehByHourService', () => {
  let service: SumVehByHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumVehByHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
