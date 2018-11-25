import { TestBed, inject } from '@angular/core/testing';

import { CartitemloaderService } from './cartitemloader.service';

describe('CartitemloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartitemloaderService]
    });
  });

  it('should be created', inject([CartitemloaderService], (service: CartitemloaderService) => {
    expect(service).toBeTruthy();
  }));
});
