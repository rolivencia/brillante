import { TestBed } from '@angular/core/testing';

import { ProductDetailResolverService } from './product-detail.resolver.service';

describe('ProductDetail.ResolverService', () => {
    let service: ProductDetailResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductDetailResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
