import { TestBed } from '@angular/core/testing';

import { CustomerDashboardGuard } from './customer-dashboard.guard';

describe('CustomerDashboardGuard', () => {
    let guard: CustomerDashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(CustomerDashboardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
