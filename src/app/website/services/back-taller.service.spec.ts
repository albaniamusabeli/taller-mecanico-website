import { TestBed } from '@angular/core/testing';

import { BackTallerService } from './back-taller.service';

describe('BackTallerService', () => {
  let service: BackTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
