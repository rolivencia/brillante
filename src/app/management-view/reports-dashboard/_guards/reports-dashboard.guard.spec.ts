import { TestBed } from '@angular/core/testing';

import { ReportsDashboardGuard } from './reports-dashboard.guard';

describe('ReportsDashboardGuard', () => {
    let guard: ReportsDashboardGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(ReportsDashboardGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
