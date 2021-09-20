import { TestBed } from '@angular/core/testing';

import { Products.ResolverService } from './products.resolver.service';

describe('Products.ResolverService', () => {
  let service: Products.ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Products.ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
