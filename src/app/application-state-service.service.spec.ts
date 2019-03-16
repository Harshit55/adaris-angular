import { TestBed } from '@angular/core/testing';

import { ApplicationStateServiceService } from './application-state-service.service';

describe('ApplicationStateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationStateServiceService = TestBed.get(ApplicationStateServiceService);
    expect(service).toBeTruthy();
  });
});
