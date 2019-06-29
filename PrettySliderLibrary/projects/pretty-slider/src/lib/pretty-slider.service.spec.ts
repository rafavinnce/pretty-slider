import { TestBed } from '@angular/core/testing';

import { PrettySliderService } from './pretty-slider.service';

describe('PrettySliderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrettySliderService = TestBed.get(PrettySliderService);
    expect(service).toBeTruthy();
  });
});
