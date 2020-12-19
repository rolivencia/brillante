import { TestBed } from '@angular/core/testing';

import { ProductsListResolverService } from './products-list-resolver.service';

describe('ProductsListResolverService', () => {
    let service: ProductsListResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductsListResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
