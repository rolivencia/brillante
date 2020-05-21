import { TestBed } from '@angular/core/testing';

import { CashDashboardService } from './cash-dashboard.service';

describe('CashDashboardService', () => {
    let service: CashDashboardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CashDashboardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
