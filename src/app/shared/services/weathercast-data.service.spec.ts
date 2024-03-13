import { TestBed } from '@angular/core/testing';

import { WeathercastDataService } from './weathercast-data.service';

describe('WeathercastDataService', () => {
  let service: WeathercastDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeathercastDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
