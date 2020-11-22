import { TestBed } from '@angular/core/testing';

import { CashConcepts.HttpService } from './cash-concepts.http.service';

describe('CashConcepts.HttpService', () => {
  let service: CashConcepts.HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashConcepts.HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
