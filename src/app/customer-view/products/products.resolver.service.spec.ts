import { TestBed } from '@angular/core/testing';
import { ProductsResolverService } from '@customer-view/products/products.resolver.service';

describe('Products.ResolverService', () => {
    let service: ProductsResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductsResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
