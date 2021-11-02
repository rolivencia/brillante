import { TestBed } from '@angular/core/testing';

import { FeaturedProductsResolverService } from './featured-products-resolver.service';

describe('FeaturedProductsResolverService', () => {
    let service: FeaturedProductsResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeaturedProductsResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
