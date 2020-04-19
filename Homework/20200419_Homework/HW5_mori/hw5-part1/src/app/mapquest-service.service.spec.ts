import { TestBed } from '@angular/core/testing';

import { MapquestServiceService } from './mapquest-service.service';

describe('MapquestServiceService', () => {
  let service: MapquestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapquestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
