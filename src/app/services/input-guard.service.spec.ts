import { TestBed } from '@angular/core/testing';

import { InputGuardService } from './input-guard.service';

describe('InputGuardService', () => {
  let service: InputGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
