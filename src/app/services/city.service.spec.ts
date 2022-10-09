import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CityService', () => {
  let service: CityService;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule],
      providers: [CityService]
    });

    service = TestBed.inject(CityService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
