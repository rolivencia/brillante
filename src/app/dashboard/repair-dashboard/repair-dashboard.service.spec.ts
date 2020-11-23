import { TestBed } from '@angular/core/testing';

import { RepairDashboardService } from './repair-dashboard.service';

describe('RepairDashboardService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: RepairDashboardService = TestBed.inject(RepairDashboardService);
        expect(service).toBeTruthy();
    });
});
