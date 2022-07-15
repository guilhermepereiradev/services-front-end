import { TestBed } from '@angular/core/testing';

import { VericacaoTokenGuard } from './vericacao-token.guard';

describe('VericacaoTokenGuard', () => {
  let guard: VericacaoTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VericacaoTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
