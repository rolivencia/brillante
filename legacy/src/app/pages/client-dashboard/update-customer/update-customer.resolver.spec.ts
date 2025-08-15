import { TestBed } from '@angular/core/testing';

import { UpdateCustomerResolver } from './update-customer.resolver';

describe('UpdateCustomerResolver', () => {
    let resolver: UpdateCustomerResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(UpdateCustomerResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
