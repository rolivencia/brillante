import { TestBed } from '@angular/core/testing';

import { RepairDashboardGuard } from './repair-dashboard.guard';

describe('RepairDashboardGuard', () => {
    let guard: RepairDashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(RepairDashboardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
