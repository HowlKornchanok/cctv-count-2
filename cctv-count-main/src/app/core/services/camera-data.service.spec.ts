import { TestBed } from '@angular/core/testing';

import { CameraDataService } from './camera-data.service';

describe('CameraDataService', () => {
  let service: CameraDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
