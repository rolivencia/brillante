import { TestBed } from '@angular/core/testing';

import { ProductsDashboardGuard } from './products-dashboard.guard';

describe('ProductsDashboardGuard', () => {
    let guard: ProductsDashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(ProductsDashboardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
