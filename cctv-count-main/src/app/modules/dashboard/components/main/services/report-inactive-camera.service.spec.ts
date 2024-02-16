import { TestBed } from '@angular/core/testing';

import { ReportInactiveCameraService } from './report-inactive-camera.service';

describe('ReportInactiveCameraService', () => {
  let service: ReportInactiveCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportInactiveCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
