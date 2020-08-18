/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlimReportService } from './onlimReport.service';

describe('Service: OnlimReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlimReportService]
    });
  });

  it('should ...', inject([OnlimReportService], (service: OnlimReportService) => {
    expect(service).toBeTruthy();
  }));
});
